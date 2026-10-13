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

Live runs print discovery JSON to stdout. Only an unfiltered --reviewed import writes
scripts/ingest/company_reports.json. problem_sets.py retains its source evidence on existing rows
and appends missing problems as "Website reports".

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
import math
import re
import sys
import tempfile
import time
import urllib.error
import urllib.parse
import urllib.request
import urllib.robotparser
from collections import deque
from dataclasses import dataclass, field
from datetime import date, datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from typing import Callable

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
CONFIG = HERE / "crawl_sources.json"
OUT = HERE / "company_reports.json"
SETS = ROOT / "content" / "sets" / "sets.json"
PROBLEMS = ROOT / "content" / "sets" / "problems.json"
OBSERVATIONS = HERE / "company_report_observations.json"

REPORT_CATEGORY = "Website reports"
COMPANY_ID = re.compile(r"[a-z0-9][a-z0-9-]*")
LC_LINK = re.compile(r"leetcode\.(?:com|cn)/problems/([a-z0-9]+(?:-[a-z0-9]+)*)")
# "LC 200", "LeetCode #200", "力扣 200": a problem cited by number, common in forum posts.
# TitleIndex.find normalizes whitespace before matching number citations.
LC_NUMBER = re.compile(r"(?<![a-z0-9])(?:lc|leetcode|力扣) ?#? ?(\d{1,4})(?!\d)")
MAX_LISTING_PAGES = 100
MAX_FOLLOWED_PAGES = 500
MAX_START_URLS = 20
DIFFICULTY = {"easy": "easy", "medium": "medium", "hard": "hard"}
# Recency buckets of a snapshot source and the weight a listing in each one carries.
SNAPSHOT_BUCKETS = [("thirty-days.csv", 3), ("three-months.csv", 2), ("six-months.csv", 1)]
SNAPSHOT_FILES = [name for name, _ in SNAPSHOT_BUCKETS] + ["more-than-six-months.csv", "all.csv"]


def log(message: str):
    print(message, file=sys.stderr)


# --------------------------------------------------------------------------- fetching


Opener = Callable[[str, dict], "tuple[int, str, dict]"]


class _SameHostRedirects(urllib.request.HTTPRedirectHandler):
    """Follows redirects only within the requested host, over HTTPS."""

    def redirect_request(self, req, fp, code, msg, headers, newurl):
        old, new = urllib.parse.urlsplit(req.full_url), urllib.parse.urlsplit(newurl)
        if new.scheme != "https" or new.netloc != old.netloc:
            raise urllib.error.HTTPError(req.full_url, code, "cross-host redirect refused", headers, fp)
        return super().redirect_request(req, fp, code, msg, headers, newurl)


_OPENER = urllib.request.build_opener(urllib.request.HTTPSHandler(), _SameHostRedirects())


def urllib_opener(url: str, headers: dict) -> tuple[int, str, dict]:
    """HTTPS-only GET. Other schemes (file:, ftp:, http:) are refused, so a bad config entry cannot read local files."""
    if urllib.parse.urlsplit(url).scheme != "https":
        log(f"  refusing non-HTTPS URL {url}")
        return 0, "", {}
    request = urllib.request.Request(url, headers=headers)
    try:
        # Operator-configured HTTPS URLs; redirects cannot change hosts or schemes.
        with _OPENER.open(request, timeout=30) as response:  # NOSONAR(S5144)
            charset = response.headers.get_content_charset() or "utf-8"
            return response.status, response.read().decode(charset, "replace"), dict(response.headers)
    except urllib.error.HTTPError as error:
        return error.code, "", dict(error.headers or {})
    except OSError as error:
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
    wall_clock: Callable[[], float] = time.time
    cache_max_age: float = 86400
    max_failures: int = 3
    _robots: dict = field(default_factory=dict)
    _last: dict = field(default_factory=dict)
    _failures: dict = field(default_factory=dict)
    fetched_at: dict[str, float | None] = field(default_factory=dict)

    def _cache_path(self, url: str) -> Path | None:
        if self.cache is None:
            return None
        root = self.cache.resolve()
        path = (root / hashlib.sha256(url.encode()).hexdigest()[:32]).resolve()
        if not path.is_relative_to(root):
            raise ValueError("Cache file must stay inside the cache directory")
        return path

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
            elif status in (404, 410):
                parser.allow_all = True  # No robots.txt: everything is allowed.
            else:
                parser.disallow_all = True  # Unreachable or erroring: crawl nothing.
            self._robots[origin] = parser
        return self._robots[origin].can_fetch(self.user_agent, url)

    def _read_cached(self, url: str, path: Path | None) -> tuple[int, str] | None:
        if path is None or not path.is_file():
            return None
        # _cache_path validates the digest filename and resolved path containment.
        try:
            entry = json.loads(path.read_text(encoding="utf8"))  # NOSONAR(S2083)
            valid = (entry.get("url") == url and isinstance(entry.get("status"), int)
                     and isinstance(entry.get("text"), str))
            fetched = entry.get("fetchedAt")
            has_timestamp = isinstance(fetched, (float, int)) and math.isfinite(fetched) and fetched >= 0
            fresh = has_timestamp and 0 <= self.wall_clock() - fetched < self.cache_max_age
            if valid and (self.offline or fresh):
                self.fetched_at[url] = fetched if has_timestamp else None
                return entry["status"], entry["text"]
        except (ValueError, AttributeError, OSError):
            pass  # Corrupt or old caches are misses, never evidence of an empty source.
        return None

    def _request_with_retry(self, url: str) -> tuple[int, str]:
        status, text, headers = self._request(url)
        if status in (429, 503):
            retry = headers.get("Retry-After", "")
            self.sleep(min(int(retry), 120) if retry.isdigit() else 30)
            status, text, _ = self._request(url)
        return status, text

    def _write_cache(self, url: str, status: int, text: str):
        path = self._cache_path(url)
        if path is None:
            return
        path.parent.mkdir(parents=True, exist_ok=True)
        # Keep the securely created file handle for the write, then atomically
        # replace the entry. A concurrent symlink is replaced, never followed.
        pending = tempfile.NamedTemporaryFile(mode="w", encoding="utf8", prefix=".pending-",
                                              dir=path.parent, delete=False)
        try:
            with pending:
                json.dump({"url": url, "status": status, "text": text,
                           "fetchedAt": self.fetched_at[url]}, pending)
            Path(pending.name).replace(path)
        finally:
            Path(pending.name).unlink(missing_ok=True)

    def _cached(self, url: str) -> tuple[int, str]:
        path = self._cache_path(url)
        cached = self._read_cached(url, path)
        if cached is not None:
            return cached
        host = urllib.parse.urlsplit(url).netloc
        if self.offline or self._failures.get(host, 0) >= self.max_failures:
            return 0, ""
        status, text = self._request_with_retry(url)
        if status in (200, 404, 410):
            self.fetched_at[url] = self.wall_clock()
            self._failures[host] = 0
            self._write_cache(url, status, text)
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
        if tag == "a" and not self._skip:
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
        self.exact_titles: dict[str, list[str]] = {}
        self.by_title: dict[str, str] = {}
        for slug, title in titles.items():
            key = normalize(title)
            self.exact_titles.setdefault(key, []).append(slug)
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


class _QuestionLinks(_PageText):
    """Only visible anchor text; templates and embedded application state are excluded."""

    def __init__(self):
        super().__init__()
        self.anchors: list[tuple[str, str]] = []
        self._href: str | None = None
        self._label: list[str] = []

    def handle_starttag(self, tag, attrs):
        super().handle_starttag(tag, attrs)
        if tag == "a" and not self._skip:
            self._href = dict(attrs).get("href")
            self._label = []

    def handle_data(self, data):
        if self._href and not self._skip:
            self._label.append(data)

    def handle_endtag(self, tag):
        if tag == "a":
            if self._href:
                self.anchors.append((self._href, "".join(self._label).strip()))
            self._href = None
        super().handle_endtag(tag)


def coding_list_observations(document: str, url: str, company: str, source: str, index: TitleIndex) -> list[dict]:
    """1point3acres public coding-list links with unambiguous whole catalog titles."""
    parser = _QuestionLinks()
    parser.feed(document)
    origin = urllib.parse.urlsplit(url).netloc
    entries = {}
    for href, title in parser.anchors:
        target = urllib.parse.urljoin(url, href)
        parts = urllib.parse.urlsplit(target)
        if (parts.scheme != "https" or parts.netloc != origin or parts.username or parts.password
                or not re.fullmatch(r"/interview/problems/[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}", parts.path)):
            continue
        candidates = index.exact_titles.get(normalize(title), [])
        if len(candidates) != 1:
            continue
        slug = candidates[0]
        entries[(slug, target)] = {
            "slug": slug, "companies": [company], "source": source, "url": url, "questionUrl": target,
            "sourceTitle": title, "observedAt": date.today().isoformat(),
            "mapping": "Exact public coding-list title; no question-specific interview date exposed.",
        }
    return list(entries.values())


# --------------------------------------------------------------------------- sources


@dataclass
class Tally:
    """Per company and problem: weighted mentions per source. Also the metadata snapshot rows carry."""

    counts: dict[str, dict[str, dict[str, int]]] = field(default_factory=dict)
    meta: dict[str, dict] = field(default_factory=dict)
    evidence: dict[tuple[str, str], list[dict]] = field(default_factory=dict)

    def add(self, company: str, slug: str, source: str, weight: int = 1):
        per = self.counts.setdefault(company, {}).setdefault(slug, {})
        per[source] = per.get(source, 0) + weight


def company_key(source: dict, company: str) -> str | None:
    """The company's name in a source's URLs, or None when the source does not cover it."""
    names = source.get("companies", {})
    if company in names:
        return names[company]
    return None if source.get("listed_only") else company


def save_snapshot(root: Path, company: str, filename: str, text: str):
    if not COMPANY_ID.fullmatch(company) or filename not in SNAPSHOT_FILES:
        raise ValueError("Invalid snapshot company or filename")
    root = root.resolve()
    folder = (root / company).resolve()
    path = (folder / filename).resolve()
    if not folder.is_relative_to(root) or not path.is_relative_to(folder):
        raise ValueError("Snapshot file must stay inside the output directory")
    # Company and filename are validated above, including symlink containment.
    folder.mkdir(parents=True, exist_ok=True)  # NOSONAR(S2083)
    path.write_text(text, encoding="utf8")  # NOSONAR(S2083)


def record_snapshot(text: str, name: str, company: str, weight: int, tally: Tally, seen: set[str]):
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
        if weight and slug not in seen:
            seen.add(slug)
            tally.add(company, slug, name, weight)


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
            save_snapshot(snapshot_out, company, filename, text)
        record_snapshot(text, name, company, weights.get(filename, 0), tally, seen)


def _percent(value: str | None) -> float:
    try:
        return float((value or "").strip().rstrip("%"))
    except ValueError:
        return 0.0


def bounded_count(value: int, minimum: int, maximum: int, label: str) -> int:
    if not isinstance(value, int) or isinstance(value, bool) or not minimum <= value <= maximum:
        raise ValueError(f"{label} must be an integer between {minimum} and {maximum}")
    return value


def follow_matcher(template: str | None) -> Callable[[str], bool] | None:
    """Match a literal HTTPS URL with one {slug} or {number}; no configurable regex."""
    if not template:
        return None
    placeholders = [placeholder for placeholder in ("{slug}", "{number}") if placeholder in template]
    if len(placeholders) != 1 or template.count(placeholders[0]) != 1:
        raise ValueError("Follow URL must contain one {slug} or {number} placeholder")
    parts = urllib.parse.urlsplit(template)
    if parts.scheme != "https" or not parts.netloc or "{" in parts.netloc:
        raise ValueError("Follow URL must have a literal HTTPS host")
    placeholder = placeholders[0]
    prefix, suffix = template.split(placeholder)

    def matches(target: str) -> bool:
        if len(target) > 8192 or not target.startswith(prefix) or not target.endswith(suffix):
            return False
        end = len(target) - len(suffix) if suffix else len(target)
        identifier = target[len(prefix):end]
        if placeholder == "{number}":
            return identifier.isascii() and identifier.isdecimal()
        return COMPANY_ID.fullmatch(identifier) is not None

    return matches


def start_urls(source: dict, key: str) -> list[str]:
    pages = bounded_count(source.get("pages", 1), 1, MAX_LISTING_PAGES, "pages")
    templates = source["start"]
    if not 1 <= len(templates) <= MAX_START_URLS:
        raise ValueError(f"start must contain between 1 and {MAX_START_URLS} URL templates")
    urls = []
    for template in templates:
        for page in range(1, MAX_LISTING_PAGES + 1):
            if page > pages:
                break
            urls.append(template.format(company=urllib.parse.quote(key), page=page))
    return urls


def page_mentions(url: str, name: str, company: str, fetcher: Fetcher, tally: Tally, index: TitleIndex,
                  extractor: str | None = None) -> list[str]:
    document = fetcher.get(url)
    if document is None:
        return []
    text, links = page_text(document)
    if extractor == "coding-list-links":
        for entry in coding_list_observations(document, url, company, name, index):
            fetched = fetcher.fetched_at.get(url)
            if fetched is None:
                entry.pop("observedAt")  # Legacy offline caches have no trustworthy retrieval date.
            else:
                entry["observedAt"] = datetime.fromtimestamp(fetched, timezone.utc).date().isoformat()
            tally.add(company, entry["slug"], name)
            tally.evidence.setdefault((company, entry["slug"]), []).append(entry)
        return links
    for slug in index.find(text, links):
        tally.add(company, slug, name)
    return links


def follow_targets(url: str, links: list[str], matches: Callable | None, visited: set[str], remaining: int) -> list[str]:
    if matches is None or remaining <= 0:
        return []
    targets = []
    for href in links:
        target = urllib.parse.urljoin(url, href).split("#")[0]
        if target not in visited and matches(target):
            targets.append(target)
            if len(targets) >= remaining:
                break
    return targets


def crawl_pages(name: str, source: dict, company: str, fetcher: Fetcher, tally: Tally, index: TitleIndex):
    key = company_key(source, company)
    if key is None:
        return
    matches = follow_matcher(source.get("follow"))
    remaining = bounded_count(source.get("max_follow", 30), 0, MAX_FOLLOWED_PAGES, "max_follow")
    queue = deque(start_urls(source, key))
    visited: set[str] = set()
    while queue:
        url = queue.popleft()
        if url in visited:
            continue
        visited.add(url)
        links = page_mentions(url, name, company, fetcher, tally, index, source.get("extractor"))
        targets = follow_targets(url, links, matches, visited, remaining)
        queue.extend(targets)
        remaining -= len(targets)


# --------------------------------------------------------------------------- report


def base_lists(sets: list[dict]) -> dict[str, set[str]]:
    """Problems each company list has before reports are merged in."""
    return {
        s["id"]: {i["slug"] for i in s["items"] if i.get("category") not in (REPORT_CATEGORY, "Recent reports")}
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
        for row in companies[company]:
            evidence = tally.evidence.get((company, row["slug"]))
            if evidence:
                row["evidence"] = evidence
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


def validate_observation(entry: dict, sources: dict, known: dict, companies: dict):
    """Validate source attribution before an observation contributes to the report."""
    if entry["source"] not in sources or entry["slug"] not in known:
        raise ValueError("Reviewed observation has an unknown source or problem")
    home = urllib.parse.urlsplit(sources[entry["source"]]["home"])
    for value in (entry["url"], entry.get("questionUrl", entry["url"])):
        url = urllib.parse.urlsplit(value)
        if url.scheme != "https" or url.netloc != home.netloc or url.username or url.password:
            raise ValueError("Reviewed observation URL must be on its public source host")
    observed = date.fromisoformat(entry["observedAt"])
    if observed > date.today():
        raise ValueError("Reviewed observation cannot have a future retrieval date")
    if not entry["companies"] or any(company not in companies for company in entry["companies"]):
        raise ValueError("Reviewed observation has an unknown or empty company list")


def reviewed_report(entries: list[dict], config: dict, sets: list[dict], known: dict, max_new: int) -> dict:
    """Rebuild from human-reviewed public cards, without treating page-wide matches as evidence.

    This is an offline import, not a claim that the HTTP crawler rendered the cards.
    Observation dates describe retrieval; lastAsked, when present, retains the source's wording.
    """
    tally = Tally()
    lists = base_lists(sets)
    evidence: dict[tuple[str, str], list[dict]] = {}
    seen = set()
    for entry in entries:
        validate_observation(entry, config["sources"], known, lists)
        source, slug = entry["source"], entry["slug"]
        for company in entry["companies"]:
            key = (company, slug, source, entry.get("questionUrl", entry["url"]))
            if key in seen:
                continue
            seen.add(key)
            tally.add(company, slug, source)
            evidence.setdefault((company, slug), []).append(entry)
    # Keep evidence even when a snapshot already contains the same problem.
    report = build_report(tally, config["sources"], {}, known, max_new)
    report["generatedAt"] = max((entry["observedAt"] for entry in entries), default=date.today().isoformat())
    report["_comment"] = "Generated by company_crawler.py --reviewed from reviewed public observations. Dates are source-reported, not independently verified interview dates."
    for company, rows in report["companies"].items():
        for row in rows:
            row["evidence"] = evidence[(company, row["slug"])]
    return report


def argument_parser(config: dict, all_companies: list[str]) -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0], allow_abbrev=False)
    verified = [name for name, source in config["sources"].items() if source.get("verified", False)]
    parser.add_argument("--sources", default=",".join(verified),
                        help="comma-separated source names (default: only sources marked verified in crawl_sources.json)")
    parser.add_argument("--companies", default=",".join(all_companies), help="comma-separated company list ids")
    parser.add_argument("--cache", type=Path, help="directory caching fetched pages between runs")
    parser.add_argument("--cache-max-age", type=float, default=86400,
                        help="cache lifetime in seconds (default: 86400; 0 always refreshes; offline ignores age)")
    parser.add_argument("--offline", action="store_true", help="use only cached pages")
    parser.add_argument("--reviewed", action="store_true",
                        help="rebuild offline from company_report_observations.json; no live crawling")
    parser.add_argument("--delay", type=float, default=config.get("delay_seconds", 3.0))
    parser.add_argument("--snapshot-out", type=Path, help="also save snapshot CSVs here for company_lists.py")
    parser.add_argument("--max-new", type=int, default=25, help="reported problems added per company")
    parser.add_argument("--dry-run", action="store_true", help="print the report instead of writing it")
    return parser


def validate_limits(args: argparse.Namespace, argv: list[str], parser: argparse.ArgumentParser):
    for label, value in [("delay", args.delay), ("cache-max-age", args.cache_max_age)]:
        if not math.isfinite(value) or value < 0:
            parser.error(f"--{label} must be a finite non-negative number")
    if args.max_new < 1:
        parser.error("--max-new must be positive")
    filters = ("--sources", "--companies", "--max-new")
    if args.reviewed and not args.dry_run and any(arg.split("=", 1)[0] in filters for arg in argv):
        parser.error("filtered --reviewed runs require --dry-run; rebuild the complete manifest to update the report")


def parse_args(argv: list[str], config: dict, all_companies: list[str]):
    parser = argument_parser(config, all_companies)
    args = parser.parse_args(argv)
    validate_limits(args, argv, parser)
    names = [n for n in args.sources.split(",") if n]
    unknown = [n for n in names if n not in config["sources"]]
    if unknown:
        parser.error(f"unknown sources: {', '.join(unknown)}")
    companies = [c for c in args.companies.split(",") if c]
    bad = [c for c in companies if not COMPANY_ID.fullmatch(c) or c not in all_companies]
    if bad:
        parser.error(f"invalid company ids: {', '.join(bad)}")
    return args, names, companies


def main(argv: list[str]):
    config = json.loads(CONFIG.read_text(encoding="utf8"))
    sets = json.loads(SETS.read_text(encoding="utf8"))
    known = json.loads(PROBLEMS.read_text(encoding="utf8"))
    all_companies = [s["id"] for s in sets if s["kind"] == "company"]
    args, names, companies = parse_args(argv, config, all_companies)
    fetcher = Fetcher(config["user_agent"], delay=args.delay, cache=args.cache, offline=args.offline,
                      cache_max_age=args.cache_max_age)
    if args.reviewed:
        entries = json.loads(OBSERVATIONS.read_text(encoding="utf8"))["observations"]
        explicit_sources = any(arg == "--sources" or arg.startswith("--sources=") for arg in argv)
        entries = [entry for entry in entries if entry["source"] in names] if explicit_sources else entries
        entries = [{**entry, "companies": [c for c in entry["companies"] if c in companies]} for entry in entries]
        limit = args.max_new if args.dry_run else max(len(entries), args.max_new)
        report = reviewed_report([entry for entry in entries if entry["companies"]], config, sets, known, limit)
    else:
        report = run(config, names, companies, fetcher, sets, known, args.snapshot_out, args.max_new)
    text = json.dumps(report, indent=1, ensure_ascii=False) + "\n"
    if args.dry_run or not args.reviewed:
        print(text)
        return
    # OUT is the fixed module-owned report path, never a CLI argument.
    OUT.write_text(text, encoding="utf8")  # NOSONAR(S2083)
    for company, items in report["companies"].items():
        print(f"{company}: {len(items)} problems with reviewed source evidence")


if __name__ == "__main__":
    main(sys.argv[1:])
