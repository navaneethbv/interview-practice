"""Collects which coding problems candidates report at each company, from public pages.

Sources are configured in crawl_sources.json:
  - "snapshot" sources read recency-bucketed LeetCode company-tag CSVs (the layout company_lists.py reads);
  - "pages" sources fetch listing pages per company, optionally follow links to question pages, and
    record every problem a page names, either by a LeetCode problem link or by an exact title match
    against the catalog.

Only facts are kept: which problem, at which company, how many pages or recency buckets mention it.
Statements and write-ups are never stored. The crawler sends no cookies or credentials, honours
robots.txt, waits between requests to the same host, backs off on 429/503 and stops a host after
repeated failures. Pages behind a login or paywall are skipped, not worked around.

Writes scripts/ingest/company_reports.json, which problem_sets.py merges into every company list
as "Recent reports" items the list does not already have.

Usage:
  python3 scripts/ingest/company_crawler.py [--sources leetcode,hellointerview] [--companies meta,google]
      [--cache .crawl-cache] [--offline] [--snapshot-out DIR] [--max-new 25] [--dry-run]
Then rerun problem_sets.py (and company_lists.py on --snapshot-out for snapshot-backed lists).
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import io
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import urllib.robotparser
from dataclasses import dataclass, field
from datetime import date
from html.parser import HTMLParser
from pathlib import Path
from typing import Callable

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
CONFIG = HERE / "crawl_sources.json"
OUT = HERE / "company_reports.json"
SETS = ROOT / "content" / "sets" / "sets.json"
PROBLEMS = ROOT / "content" / "sets" / "problems.json"

REPORT_CATEGORY = "Recent reports"
LC_LINK = re.compile(r"leetcode\.(?:com|cn)/problems/([a-z0-9]+(?:-[a-z0-9]+)*)")
# "LC 200", "LeetCode #200", "力扣 200": a problem cited by number, common in forum posts.
LC_NUMBER = re.compile(r"(?<![a-z0-9])(?:lc|leetcode|力扣)\s*#?\s*(\d{1,4})(?!\d)")
DIFFICULTY = {"easy": "easy", "medium": "medium", "hard": "hard"}
# Recency buckets of a snapshot source and the weight a listing in each one carries.
SNAPSHOT_BUCKETS = [("thirty-days.csv", 3), ("three-months.csv", 2), ("six-months.csv", 1)]
SNAPSHOT_FILES = [name for name, _ in SNAPSHOT_BUCKETS] + ["more-than-six-months.csv", "all.csv"]


def log(message: str):
    print(message, file=sys.stderr)


# --------------------------------------------------------------------------- fetching


Opener = Callable[[str, dict], "tuple[int, str, dict]"]


def urllib_opener(url: str, headers: dict) -> tuple[int, str, dict]:
    request = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            charset = response.headers.get_content_charset() or "utf-8"
            return response.status, response.read().decode(charset, "replace"), dict(response.headers)
    except urllib.error.HTTPError as error:
        return error.code, "", dict(error.headers or {})
    except (urllib.error.URLError, TimeoutError, OSError) as error:
        log(f"  network error for {url}: {error}")
        return 0, "", {}


@dataclass
class Fetcher:
    """Polite GET: robots.txt, a per-host delay, an optional on-disk cache, and no cookies or credentials."""

    user_agent: str
    delay: float = 3.0
    cache: Path | None = None
    offline: bool = False
    opener: Opener = urllib_opener
    sleep: Callable[[float], None] = time.sleep
    clock: Callable[[], float] = time.monotonic
    max_failures: int = 3
    _robots: dict = field(default_factory=dict)
    _last: dict = field(default_factory=dict)
    _failures: dict = field(default_factory=dict)

    def _cache_path(self, url: str) -> Path | None:
        return self.cache / hashlib.sha256(url.encode()).hexdigest()[:32] if self.cache else None

    def _request(self, url: str) -> tuple[int, str, dict]:
        host = urllib.parse.urlsplit(url).netloc
        wait = self._last.get(host, -1e9) + self.delay - self.clock()
        if wait > 0:
            self.sleep(wait)
        result = self.opener(url, {"User-Agent": self.user_agent, "Accept": "text/html,application/json,text/csv;q=0.9,*/*;q=0.5"})
        self._last[host] = self.clock()
        return result

    def allowed(self, url: str) -> bool:
        parts = urllib.parse.urlsplit(url)
        origin = f"{parts.scheme}://{parts.netloc}"
        if origin not in self._robots:
            robots_url = f"{origin}/robots.txt"
            status, text = self._cached(robots_url)
            parser = urllib.robotparser.RobotFileParser()
            if status == 200:
                parser.parse(text.splitlines())
            elif 400 <= status < 500:
                parser.allow_all = True  # No robots.txt: everything is allowed.
            else:
                parser.disallow_all = True  # Unreachable or erroring: crawl nothing.
            self._robots[origin] = parser
        return self._robots[origin].can_fetch(self.user_agent, url)

    def _cached(self, url: str) -> tuple[int, str]:
        path = self._cache_path(url)
        if path and path.is_file():
            entry = json.loads(path.read_text(encoding="utf8"))
            return entry["status"], entry["text"]
        if self.offline:
            return 0, ""
        host = urllib.parse.urlsplit(url).netloc
        if self._failures.get(host, 0) >= self.max_failures:
            return 0, ""
        status, text, headers = self._request(url)
        if status in (429, 503):
            retry = headers.get("Retry-After", "")
            self.sleep(min(int(retry), 120) if retry.isdigit() else 30)
            status, text, headers = self._request(url)
        if status == 200 or 400 <= status < 500:
            self._failures[host] = 0
            if path:
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text(json.dumps({"url": url, "status": status, "text": text}), encoding="utf8")
        else:
            self._failures[host] = self._failures.get(host, 0) + 1
            if self._failures[host] == self.max_failures:
                log(f"  giving up on {host} after {self.max_failures} failures")
        return status, text

    def get(self, url: str) -> str | None:
        """Returns the page text, or None when robots.txt forbids it or it is not a public 200 response."""
        if not self.allowed(url):
            log(f"  robots.txt disallows {url}")
            return None
        status, text = self._cached(url)
        if status in (401, 402, 403):
            log(f"  {url} needs a login or subscription ({status}); skipped")
        return text if status == 200 else None


# --------------------------------------------------------------------------- extraction


class _PageText(HTMLParser):
    SKIP = {"script", "style", "noscript", "template", "svg"}

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts: list[str] = []
        self.links: list[str] = []
        self._skip = 0

    def handle_starttag(self, tag, attrs):
        if tag in self.SKIP:
            self._skip += 1
        if tag == "a":
            href = dict(attrs).get("href")
            if href:
                self.links.append(href)

    def handle_endtag(self, tag):
        if tag in self.SKIP and self._skip:
            self._skip -= 1

    def handle_data(self, data):
        if not self._skip:
            self.parts.append(data)


def page_text(document: str) -> tuple[str, list[str]]:
    """Visible text and link targets of an HTML page; JSON and plain text pass through unchanged."""
    if not document.lstrip().startswith("<"):
        return document, []
    parser = _PageText()
    parser.feed(document)
    return " ".join(parser.parts), parser.links


def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"[‐-―]", "-", text.lower())).strip()


class TitleIndex:
    """Finds catalog problems named in free text, by LeetCode link or by exact (case-insensitive) title.

    Only distinctive titles are matched: at least two words and eight characters, so single words
    such as "Candy" never count as a mention. Problems cited as "LC 200" are found by number.
    """

    def __init__(self, titles: dict[str, str], numbers: dict[int, str] | None = None):
        self.by_number = numbers or {}
        self.by_title: dict[str, str] = {}
        for slug, title in titles.items():
            key = normalize(title)
            if len(key) >= 8 and " " in key:
                self.by_title.setdefault(key, slug)
        names = sorted(self.by_title, key=len, reverse=True)
        self.pattern = re.compile(r"(?<![a-z0-9])(" + "|".join(map(re.escape, names)) + r")(?![a-z0-9])") if names else None

    def find(self, text: str, links: list[str] = ()) -> set[str]:
        found = {m.group(1) for m in LC_LINK.finditer(text)}
        found.update(m.group(1) for href in links for m in LC_LINK.finditer(href))
        plain = normalize(text)
        if self.pattern:
            found.update(self.by_title[m.group(1)] for m in self.pattern.finditer(plain))
        found.update(self.by_number[int(m.group(1))] for m in LC_NUMBER.finditer(plain) if int(m.group(1)) in self.by_number)
        return found


# --------------------------------------------------------------------------- sources


@dataclass
class Tally:
    """Per company and problem: weighted mentions per source. Also the metadata snapshot rows carry."""

    counts: dict[str, dict[str, dict[str, int]]] = field(default_factory=dict)
    meta: dict[str, dict] = field(default_factory=dict)

    def add(self, company: str, slug: str, source: str, weight: int = 1):
        per = self.counts.setdefault(company, {}).setdefault(slug, {})
        per[source] = per.get(source, 0) + weight


def company_key(source: dict, company: str) -> str | None:
    """The company's name in a source's URLs, or None when the source does not cover it."""
    names = source.get("companies", {})
    if company in names:
        return names[company]
    return None if source.get("listed_only") else company


def crawl_snapshot(name: str, source: dict, company: str, fetcher: Fetcher, tally: Tally, snapshot_out: Path | None):
    key = company_key(source, company)
    if key is None:
        return
    weights = dict(SNAPSHOT_BUCKETS)
    seen: set[str] = set()
    for filename in SNAPSHOT_FILES:
        text = fetcher.get(f"{source['base'].rstrip('/')}/{urllib.parse.quote(key)}/{filename}")
        if text is None:
            continue
        if snapshot_out:
            folder = snapshot_out / company
            folder.mkdir(parents=True, exist_ok=True)
            (folder / filename).write_text(text, encoding="utf8")
        for row in csv.DictReader(io.StringIO(text)):
            match = LC_LINK.search(row.get("URL") or "")
            difficulty = DIFFICULTY.get((row.get("Difficulty") or "").strip().lower())
            if not match or not difficulty or not (row.get("ID") or "").strip().isdigit():
                continue
            slug = match.group(1)
            tally.meta.setdefault(slug, {
                "number": int(row["ID"]),
                "title": row["Title"].strip(),
                "difficulty": difficulty,
                "topics": [],
                "acceptance": _percent(row.get("Acceptance %")),
            })
            if filename in weights and slug not in seen:
                seen.add(slug)
                tally.add(company, slug, name, weights[filename])


def _percent(value: str | None) -> float:
    try:
        return float((value or "").strip().rstrip("%"))
    except ValueError:
        return 0.0


def crawl_pages(name: str, source: dict, company: str, fetcher: Fetcher, tally: Tally, index: TitleIndex):
    key = company_key(source, company)
    if key is None:
        return
    follow = re.compile(source["follow"]) if source.get("follow") else None
    max_follow = int(source.get("max_follow", 30))
    visited: set[str] = set()
    queue: list[str] = []
    for template in source["start"]:
        for page in range(1, int(source.get("pages", 1)) + 1):
            queue.append(template.format(company=urllib.parse.quote(key), page=page))
    followed = 0
    while queue:
        url = queue.pop(0)
        if url in visited:
            continue
        visited.add(url)
        document = fetcher.get(url)
        if document is None:
            continue
        text, links = page_text(document)
        for slug in index.find(text, links):
            tally.add(company, slug, name)
        if not follow:
            continue
        for href in links:
            target = urllib.parse.urljoin(url, href).split("#")[0]
            if followed < max_follow and target not in visited and follow.search(target):
                queue.append(target)
                followed += 1


# --------------------------------------------------------------------------- report


def base_lists(sets: list[dict]) -> dict[str, set[str]]:
    """Problems each company list has before reports are merged in."""
    return {
        s["id"]: {i["slug"] for i in s["items"] if i.get("category") != REPORT_CATEGORY}
        for s in sets if s["kind"] == "company"
    }


def build_report(tally: Tally, sources: dict, lists: dict[str, set[str]], known: dict[str, dict], max_new: int) -> dict:
    """Ranks each company's reported problems that its list lacks: most sources first, then most mentions."""
    companies: dict[str, list[dict]] = {}
    needed: dict[str, dict] = {}
    for company, problems in sorted(tally.counts.items()):
        listed = lists.get(company, set())
        ranked = sorted(
            ((slug, per) for slug, per in problems.items() if slug not in listed and (slug in known or slug in tally.meta)),
            key=lambda kv: (-len(kv[1]), -sum(kv[1].values()), kv[0]),
        )[:max_new]
        if not ranked:
            continue
        companies[company] = [{"slug": slug, "sources": dict(sorted(per.items()))} for slug, per in ranked]
        for slug, _ in ranked:
            if slug not in known:
                needed[slug] = tally.meta[slug]
    used = sorted({s for items in companies.values() for item in items for s in item["sources"]})
    return {
        "_comment": "Generated by company_crawler.py. Facts only: which problems public pages report per company. Merged by problem_sets.py.",
        "generatedAt": date.today().isoformat(),
        "sources": {name: {"label": sources[name]["label"], "url": sources[name]["home"]} for name in used},
        "companies": companies,
        "problems": dict(sorted(needed.items())),
    }


def run(config: dict, source_names: list[str], companies: list[str], fetcher: Fetcher, sets: list[dict],
        known: dict[str, dict], snapshot_out: Path | None, max_new: int) -> dict:
    tally = Tally()
    index = TitleIndex({slug: meta["title"] for slug, meta in known.items()},
                       {meta["number"]: slug for slug, meta in known.items() if meta["number"] < 5000})
    sources = config["sources"]
    for name in source_names:
        source = sources[name]
        if not source.get("verified", False):
            log(f"{source['label']}: URL patterns are unverified; check crawl_sources.json against the live site")
        for company in companies:
            log(f"{source['label']}: {company}")
            if source["kind"] == "snapshot":
                crawl_snapshot(name, source, company, fetcher, tally, snapshot_out)
            else:
                crawl_pages(name, source, company, fetcher, tally, index)
    return build_report(tally, sources, base_lists(sets), known, max_new)


def main(argv: list[str]):
    config = json.loads(CONFIG.read_text(encoding="utf8"))
    sets = json.loads(SETS.read_text(encoding="utf8"))
    known = json.loads(PROBLEMS.read_text(encoding="utf8"))
    all_companies = [s["id"] for s in sets if s["kind"] == "company"]
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--sources", default=",".join(config["sources"]), help="comma-separated source names")
    parser.add_argument("--companies", default=",".join(all_companies), help="comma-separated company list ids")
    parser.add_argument("--cache", type=Path, help="directory caching fetched pages between runs")
    parser.add_argument("--offline", action="store_true", help="use only cached pages")
    parser.add_argument("--delay", type=float, default=config.get("delay_seconds", 3.0))
    parser.add_argument("--snapshot-out", type=Path, help="also save snapshot CSVs here for company_lists.py")
    parser.add_argument("--max-new", type=int, default=25, help="reported problems added per company")
    parser.add_argument("--dry-run", action="store_true", help="print the report instead of writing it")
    args = parser.parse_args(argv)

    names = [n for n in args.sources.split(",") if n]
    unknown = [n for n in names if n not in config["sources"]]
    if unknown:
        parser.error(f"unknown sources: {', '.join(unknown)}")
    companies = [c for c in args.companies.split(",") if c]
    fetcher = Fetcher(config["user_agent"], delay=args.delay, cache=args.cache, offline=args.offline)
    report = run(config, names, companies, fetcher, sets, known, args.snapshot_out, args.max_new)
    text = json.dumps(report, indent=1, ensure_ascii=False) + "\n"
    if args.dry_run:
        print(text)
        return
    OUT.write_text(text, encoding="utf8")
    for company, items in report["companies"].items():
        print(f"{company}: {len(items)} reported problems not yet listed")


if __name__ == "__main__":
    main(sys.argv[1:])
