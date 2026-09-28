"""
Imports the problem lists (Blind 75, NeetCode 150, company lists, ...) from the interview
prep workbook into content/sets/.

  content/sets/sets.json      ordered sets with their problem slugs and categories
  content/sets/problems.json  metadata per problem (number, difficulty, topics, hint, ...)

Statements, tests and reference solutions are authored separately in content/leetcode/.

Usage: python3 scripts/ingest/problem_sets.py <workbook.xlsx>   (requires: pip install openpyxl)
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "content" / "sets"

# LintCode duplicates that map onto a LeetCode problem.
ALIASES = {659: 271}

SETS = [
    ("blind-75", "🎯 Blind 75", "Blind 75", "curated", "The classic 75 problems that cover every core interview pattern."),
    ("grind-75", "⚡ Grind 75", "Grind 75", "curated", "A modernized, ordered take on Blind 75."),
    ("neetcode-150", "🚀 NeetCode 150", "NeetCode 150", "curated", "Blind 75 plus more practice per pattern, grouped by topic."),
    ("grind-169", "🔥 Grind 169", "Grind 169", "curated", "The full Grind list for a longer study plan."),
    ("meta", "🔷 Meta", "Meta", "company", "Problems frequently asked at Meta in the last six months."),
    ("google", "🔵 Google", "Google", "company", "Problems frequently asked at Google."),
    ("amazon", "📦 Amazon", "Amazon", "company", "Problems frequently asked at Amazon in the last six months."),
    ("apple", "🍎 Apple", "Apple", "company", "Problems frequently asked at Apple in the last six months."),
    ("microsoft", "🪟 Microsoft", "Microsoft", "company", "Problems frequently asked at Microsoft in the last six months."),
    ("uber", "🚗 Uber", "Uber", "company", "Problems frequently asked at Uber in the last six months."),
]

DIFFICULTY = {"Easy": "easy", "Medium": "medium", "Hard": "hard"}


def slug_of(url: str) -> str:
    m = re.search(r"/problems/([a-z0-9-]+)", url or "")
    if not m:
        raise ValueError(f"Unrecognized LeetCode URL: {url!r}")
    return m.group(1)


def text(v) -> str | None:
    if v is None:
        return None
    s = str(v).strip()
    return s or None


def header_rows(ws):
    """Yields (header, row) for data rows below the first '#' header row."""
    header = None
    for row in ws.iter_rows(values_only=True):
        if row[0] == "#":
            header = [text(h) for h in row]
            continue
        if header is None:
            continue
        if isinstance(row[0], str) and "SUMMARY" in row[0]:
            break
        yield header, row


def col(header, row, *names):
    for name in names:
        if name in header:
            return row[header.index(name)]
    return None


def section_title(cell: str) -> str:
    """'  ARRAYS & HASHING  —  9 problems' -> 'Arrays & Hashing'."""
    name = cell.partition("—")[0]
    words = " ".join(w if w in {"&", "/"} else w.capitalize() for w in name.split())
    return words.replace("1d Dp", "1D DP").replace("2d Dp", "2D DP")


def read_problems(wb) -> tuple[dict[str, dict], dict[int, str]]:
    """Reads per-problem metadata from the tracker sheet, keyed by slug."""
    problems: dict[str, dict] = {}
    by_number: dict[int, str] = {}
    for header, row in header_rows(wb["📊 Problem Tracker"]):
        number = col(header, row, "LC #")
        if not isinstance(number, int) or number in ALIASES:
            continue
        slug = slug_of(col(header, row, "🔗 LeetCode URL"))
        topics = [t.strip() for t in (text(col(header, row, "Topics")) or "").split(",") if t.strip()]
        pattern = text(col(header, row, "Key Insight / Pattern"))
        # Four workbook rows carry array/hash tags despite an explicit SQL pattern.
        if pattern and pattern.startswith("SQL "):
            topics = ["SQL"]
        problems[slug] = {
            "number": number,
            "title": text(col(header, row, "Problem Title")),
            "difficulty": DIFFICULTY[text(col(header, row, "Difficulty"))],
            "topics": list(dict.fromkeys("SQL" if t == "Database (SQL)" else t for t in topics)),
            "pattern": pattern,
            "hint": text(col(header, row, "How to Solve")),
            "time": text(col(header, row, "Time Complexity")),
            "space": text(col(header, row, "Space Complexity")),
        }
        by_number[number] = slug
    return problems, by_number


def add_list_metadata(meta: dict, header, row):
    """Copies acceptance and premium flags that only the list sheets carry."""
    acceptance = text(col(header, row, "Acceptance"))
    if acceptance and "acceptance" not in meta:
        meta["acceptance"] = float(acceptance.rstrip("%"))
    if col(header, row, "Premium?"):
        meta["premium"] = True


def read_set(wb, sheet: str, problems: dict[str, dict], by_number: dict[int, str]) -> list[dict]:
    """Reads one list sheet in order, tagging each problem with its section or category."""
    items, seen, section = [], set(), None
    for header, row in header_rows(wb[sheet]):
        first = row[0]
        if isinstance(first, str) and first.strip() and row[1] is None:
            section = section_title(first)
            continue
        if not isinstance(first, int):
            continue
        number = col(header, row, "LC #")
        slug = by_number.get(ALIASES.get(number, number))
        if slug is None:
            raise ValueError(f"{sheet}: LC {number} is not in the Problem Tracker")
        if slug in seen:
            continue
        seen.add(slug)
        add_list_metadata(problems[slug], header, row)
        category = text(col(header, row, "Category")) or section or text(col(header, row, "Primary Pattern"))
        items.append({"slug": slug, "category": category} if category else {"slug": slug})
    return items


def merge_custom_catalog(sets: list[dict], problems: dict[str, dict]):
    """Merge authored lists without depending on a previous generated catalog."""
    source = Path(__file__).with_name("custom_problem_sets.json")
    custom = json.loads(source.read_text(encoding="utf8"))
    existing_ids = {item["id"] for item in sets}
    for item in custom["sets"]:
        if item["id"] in existing_ids:
            raise ValueError(f"Duplicate custom list: {item['id']}")
        existing_ids.add(item["id"])
    overlap = problems.keys() & custom["problems"].keys()
    if overlap:
        raise ValueError(f"Duplicate custom problems: {sorted(overlap)}")
    problems.update(custom["problems"])
    for item in custom["sets"]:
        for entry in item["items"]:
            if entry["slug"] not in problems:
                raise ValueError(f"Missing metadata for {entry['slug']}")
    sets[:0] = custom["sets"]


def main(workbook: str):
    import openpyxl

    wb = openpyxl.load_workbook(workbook, data_only=True, read_only=True)
    problems, by_number = read_problems(wb)
    sets = [
        {"id": set_id, "title": title, "kind": kind, "description": description,
         "items": read_set(wb, sheet, problems, by_number)}
        for set_id, sheet, title, kind, description in SETS
    ]

    merge_custom_catalog(sets, problems)
    OUT.mkdir(parents=True, exist_ok=True)
    ordered = dict(sorted(problems.items(), key=lambda kv: kv[1]["number"]))
    (OUT / "problems.json").write_text(json.dumps(ordered, indent=1, ensure_ascii=False) + "\n")
    (OUT / "sets.json").write_text(json.dumps(sets, indent=1, ensure_ascii=False) + "\n")
    for s in sets:
        print(f"{s['title']}: {len(s['items'])} problems")
    print(f"{len(problems)} unique problems")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
