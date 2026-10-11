"""Builds content/study-plan.json from Interview_Prep_Plan_ENRICHED.xlsx.

The workbook names problems informally ("Reverse LL", "House Robber I/II"), so each name is
resolved through NAMES first and then by exact title; unknown names fail the build.

Usage: python3 scripts/ingest/study_plan.py [workbook] (needs `pip install openpyxl`)
"""

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "content" / "study-plan.json"

# Informal names used in the workbook, mapped to LeetCode slugs.
NAMES = {
    "top k frequent": ["top-k-frequent-elements"],
    "product except self": ["product-of-array-except-self"],
    "best time buy/sell": ["best-time-to-buy-and-sell-stock"],
    "longest substring no repeat": ["longest-substring-without-repeating-characters"],
    "min window substring": ["minimum-window-substring"],
    "largest rectangle histogram": ["largest-rectangle-in-histogram"],
    "sliding window max": ["sliding-window-maximum"],
    "reverse ll": ["reverse-linked-list"],
    "merge two sorted": ["merge-two-sorted-lists"],
    "remove nth node": ["remove-nth-node-from-end-of-list"],
    "search rotated array": ["search-in-rotated-sorted-array"],
    "find min rotated": ["find-minimum-in-rotated-sorted-array"],
    "search 2d matrix": ["search-a-2d-matrix"],
    "median two arrays": ["median-of-two-sorted-arrays"],
    "invert tree": ["invert-binary-tree"],
    "max depth": ["maximum-depth-of-binary-tree"],
    "diameter": ["diameter-of-binary-tree"],
    "level order": ["binary-tree-level-order-traversal"],
    "right side view": ["binary-tree-right-side-view"],
    "balanced tree": ["balanced-binary-tree"],
    "subtree": ["subtree-of-another-tree"],
    "lca bst": ["lowest-common-ancestor-of-a-binary-search-tree"],
    "validate bst": ["validate-binary-search-tree"],
    "kth smallest": ["kth-smallest-element-in-a-bst"],
    "implement trie": ["implement-trie-prefix-tree"],
    "add/search words": ["add-and-search-word-data-structure-design"],
    "course schedule i/ii": ["course-schedule", "course-schedule-ii"],
    "pacific atlantic": ["pacific-atlantic-water-flow"],
    "house robber i/ii": ["house-robber", "house-robber-ii"],
    "lis": ["longest-increasing-subsequence"],
    "max product subarray": ["maximum-product-subarray"],
    "combination sum i/ii": ["combination-sum", "combination-sum-ii"],
    "jump game i/ii": ["jump-game", "jump-game-ii"],
    "lcs": ["longest-common-subsequence"],
    "best time buy/sell iii/iv": ["best-time-to-buy-and-sell-stock-iii", "best-time-to-buy-and-sell-stock-iv"],
    "k closest points": ["k-closest-points-to-origin"],
    "find median stream": ["find-median-from-data-stream"],
    "merge k sorted": ["merge-k-sorted-lists"],
    "dijkstra problems": ["path-with-minimum-effort"],
    "union-find": ["redundant-connection", "number-of-connected-components-in-an-undirected-graph"],
    "min cost connect points": ["min-cost-to-connect-all-points"],
    "cheapest flights k stops": ["cheapest-flights-within-k-stops"],
    "regular expr matching": ["regular-expression-matching"],
    "single number i/ii/iii": ["single-number", "single-number-ii"],
    "sum two integers": ["sum-of-two-integers"],
    "hard dp revisit": [],
}


def rows(sheet):
    return [list(r) for r in sheet.iter_rows(values_only=True) if any(c is not None for c in r)]


def text(value):
    return "" if value is None else str(value).strip()


def resolve(name, titles, known):
    key = name.lower()
    if key in NAMES:
        slugs = NAMES[key]
    elif key in titles:
        slugs = [titles[key]]
    else:
        raise SystemExit(f"Unknown problem name in workbook: {name!r}; add it to NAMES")
    missing = [s for s in slugs if s not in known]
    if missing:
        raise SystemExit(f"{name!r} maps to unknown slugs {missing}")
    return slugs


def table(sheet_rows, header_index):
    header = [text(c) for c in sheet_rows[header_index]]
    out = []
    for r in sheet_rows[header_index + 1:]:
        cells = [text(c) for c in r]
        if len([c for c in cells if c]) < 2:
            break
        out.append({h: cells[i] if i < len(cells) else "" for i, h in enumerate(header) if h})
    return out


def main():
    import openpyxl

    source = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "Interview_Prep_Plan_ENRICHED.xlsx"
    meta = json.loads((ROOT / "content" / "sets" / "problems.json").read_text())
    titles = {v["title"].lower(): k for k, v in meta.items()}
    book = openpyxl.load_workbook(source, read_only=True)
    sheets = {ws.title.split(" ", 1)[-1].strip(): rows(ws) for ws in book}

    weeks = []
    for r in sheets["16-Week Schedule"][2:]:
        if not isinstance(r[0], int):
            continue
        names = [n.strip() for n in text(r[3]).split(",") if n.strip()]
        explicit = all(";" not in n and ":" not in n and "—" not in n for n in names)
        slugs = [s for n in names for s in resolve(n, titles, meta)] if explicit else []
        weeks.append({
            "week": r[0],
            "phase": text(r[1]),
            "dsaTopic": text(r[2]),
            "problemsText": "" if explicit else text(r[3]),
            "problems": list(dict.fromkeys(slugs)),
            "target": text(r[4]),
            "systemDesign": text(r[5]),
            "deepDive": text(r[6]),
            "goal": text(r[7]),
            "checkpoint": text(r[8]),
        })

    master = sheets["Master Plan"]
    phase_header = next(i for i, r in enumerate(master) if text(r[0]) == "Phase")
    daily_header = next(i for i, r in enumerate(master) if text(r[0]) == "Time Block")
    cheat = sheets["Pattern Cheatsheet"]
    cheat_header = next(i for i, r in enumerate(cheat) if text(r[0]) == "Pattern")

    plan = {
        "title": "16-Week Interview Plan",
        "summary": text(master[1][0]),
        "phases": table(master, phase_header),
        "daily": table(master, daily_header),
        "weeks": weeks,
        "patterns": table(cheat, cheat_header),
    }
    OUT.write_text(json.dumps(plan, indent=2, ensure_ascii=False) + "\n")
    print(f"Wrote {OUT.relative_to(ROOT)}: {len(weeks)} weeks, {sum(len(w['problems']) for w in weeks)} linked problems")


if __name__ == "__main__":
    main()
