"""Builds company problem lists from a LeetCode company-frequency snapshot.

The snapshot is a directory with one folder per company holding recency-bucketed CSVs
(thirty-days.csv, three-months.csv, six-months.csv, more-than-six-months.csv, all.csv), each with the
columns ID, URL, Title, Difficulty, Acceptance %, Frequency %. That is the layout of
https://github.com/snehasishroy/leetcode-companywise-interview-questions and of the crawler's output.
Only facts are imported (which problem, how often, how recently); statements stay original.

Writes scripts/ingest/company_lists.json, which problem_sets.py merges into content/sets/.

Usage: python3 scripts/ingest/company_lists.py <snapshot-dir> <company-id>[=<Title>] ...
"""

import argparse
import csv
import json
import re
import sys
from datetime import date
from pathlib import Path

OUT = Path(__file__).with_name("company_lists.json")

# Most recent first; a problem is listed under the most recent bucket it appears in.
BUCKETS = [
    ("thirty-days.csv", "Last 30 days"),
    ("three-months.csv", "Last 3 months"),
    ("six-months.csv", "Last 6 months"),
    ("more-than-six-months.csv", "Older than 6 months"),
    ("all.csv", "Recency unavailable"),
]
DIFFICULTY = {"Easy": "easy", "Medium": "medium", "Hard": "hard"}
SLUG = re.compile(r"/problems/([a-z0-9-]+)")


def percent(value: str) -> float:
    try:
        return float((value or "").strip().rstrip("%"))
    except ValueError:
        return 0.0


def read_company(folder: Path, recent_only: bool = False):
    """Returns ordered items and per-problem metadata for one company folder."""
    seen: dict[str, dict] = {}
    for filename, label in BUCKETS:
        if recent_only and filename in ("more-than-six-months.csv", "all.csv"):
            continue
        path = folder / filename
        if not path.is_file():
            continue
        with path.open(newline="", encoding="utf8") as handle:
            for row in csv.DictReader(handle):
                match = SLUG.search(row.get("URL") or "")
                if not match or match.group(1) in seen:
                    continue
                seen[match.group(1)] = {
                    "bucket": label,
                    "frequency": percent(row.get("Frequency %")),
                    "meta": {
                        "number": int(row["ID"]),
                        "title": row["Title"].strip(),
                        "difficulty": DIFFICULTY[row["Difficulty"].strip()],
                        "topics": [],
                        "acceptance": percent(row.get("Acceptance %")),
                    },
                }
    order = {label: i for i, (_, label) in enumerate(BUCKETS)}
    slugs = sorted(seen, key=lambda s: (order[seen[s]["bucket"]], -seen[s]["frequency"], seen[s]["meta"]["number"]))
    items = [{"slug": s, "category": seen[s]["bucket"]} for s in slugs]
    return items, {s: seen[s]["meta"] for s in slugs}


def build(snapshot: Path, companies: list[tuple[str, str]], snapshot_label: str, *,
          recent_only: bool = False, snapshot_date: str | None = None, revision: str | None = None) -> dict:
    snapshot = snapshot.resolve(strict=True)
    if snapshot_date:
        date.fromisoformat(snapshot_date)
    if revision and not re.fullmatch(r"[a-f0-9]{40}", revision):
        raise ValueError("Snapshot revision must be a full commit SHA")
    data = json.loads(OUT.read_text(encoding="utf8")) if OUT.is_file() else {"sets": [], "problems": {}}
    for company_id, title in companies:
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", company_id):
            raise ValueError("Company ID must be a lowercase slug")
        folder = (snapshot / company_id).resolve()
        if not folder.is_relative_to(snapshot):
            raise ValueError("Company folder must stay inside the snapshot")
        if not folder.is_dir():
            raise SystemExit(f"No folder for {company_id} in {snapshot}")
        items, problems = read_company(folder, recent_only)
        if not items:
            raise SystemExit(f"No problems found for {company_id}")
        entry = {
            "id": company_id,
            "title": title,
            "kind": "company",
            "description": (f"Community LeetCode tags for {title} ({snapshot_label}). "
                            "Recency buckets are relative to the snapshot date, not today."),
            "sourceUrl": "https://github.com/snehasishroy/leetcode-companywise-interview-questions" + (f"/tree/{revision}/{company_id}" if revision else ""),
            "sourceLabel": f"LeetCode tag snapshot · {snapshot_date or snapshot_label}",
            "items": items,
        }
        if snapshot_date:
            entry["snapshotDate"] = snapshot_date
        if revision:
            entry["sourceRevision"] = revision
        data["sets"] = [s for s in data["sets"] if s["id"] != company_id] + [entry]
        for slug, meta in problems.items():
            data["problems"].setdefault(slug, meta)
    data["problems"] = dict(sorted(data["problems"].items()))
    return data


def write_company_lists(data: dict):
    """Persist imported facts to the fixed module-owned output file."""
    # The destination is defined from __file__, never from snapshot or company arguments.
    OUT.write_text(json.dumps(data, indent=1, ensure_ascii=False) + "\n", encoding="utf8")  # NOSONAR(S2083)


def main(argv: list[str]):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("snapshot", type=Path)
    parser.add_argument("companies", nargs="+")
    parser.add_argument("--recent-only", action="store_true", help="import only the snapshot's 30-day, 3-month and 6-month buckets")
    parser.add_argument("--snapshot-date", help="source snapshot date in ISO format; not the retrieval date")
    parser.add_argument("--revision", help="full upstream commit SHA for reproducible source links")
    args = parser.parse_args(argv)
    snapshot = args.snapshot.resolve(strict=True)
    companies = []
    for arg in args.companies:
        company_id, _, title = arg.partition("=")
        companies.append((company_id, title or company_id.replace("-", " ").title()))
    readme = (snapshot / "README.md").resolve()
    if not readme.is_relative_to(snapshot):
        raise ValueError("Snapshot README must stay inside the snapshot")
    when = re.search(r"snapshot as of \*\*([^*]+)\*\*", readme.read_text(encoding="utf8")) if readme.is_file() else None
    label = args.snapshot_date or (when.group(1) if when else "date unavailable")
    data = build(snapshot, companies, label, recent_only=args.recent_only,
                 snapshot_date=args.snapshot_date, revision=args.revision)
    write_company_lists(data)
    for s in data["sets"]:
        print(f"{s['title']}: {len(s['items'])} problems")


if __name__ == "__main__":
    main(sys.argv[1:])
