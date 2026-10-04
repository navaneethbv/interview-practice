import json
import unittest
from pathlib import Path

from problem_sets import merge_custom_catalog


class CustomCatalogTests(unittest.TestCase):
    def test_bctci_online_chapters_are_complete_and_judgeable(self):
        root = Path(__file__).resolve().parents[2]
        catalog = json.loads((root / "scripts/ingest/custom_problem_sets.json").read_text())
        bctci = next(item for item in catalog["sets"] if item["id"] == "bctci")
        expected = {f"{chapter}.{index}" for chapter, count in
                    [("S", 6), ("M", 8), ("U", 7), ("B", 1), ("P", 15)]
                    for index in range(1, count + 1)}
        online = [item for item in bctci["items"] if item["label"][0].isalpha()]
        self.assertEqual(len(online), 37)
        self.assertEqual({item["label"] for item in online}, expected)
        self.assertEqual(len({item["slug"] for item in online}), 37)
        for item in online:
            with self.subTest(label=item["label"]):
                base = root / "content/leetcode" / item["slug"]
                for extension in [".md", ".json", ".py", ".java"]:
                    self.assertTrue(base.with_suffix(extension).is_file())
                spec = json.loads(base.with_suffix(".json").read_text())
                self.assertEqual(spec["id"], item["slug"])
                self.assertGreaterEqual(sum(bool(test.get("sample")) for test in spec["tests"]), 2)
                self.assertGreaterEqual(sum(not test.get("sample") for test in spec["tests"]), 8)
                self.assertTrue(all("expected" in test for test in spec["tests"]))

    def test_rebuild_retains_authored_lists_and_metadata(self):
        root = Path(__file__).resolve().parents[2]
        sets = json.loads((root / "content/sets/sets.json").read_text())
        problems = json.loads((root / "content/sets/problems.json").read_text())
        workbook_sets = [item for item in sets if item["id"] not in ("ctci", "bctci")]
        workbook_problems = {slug: meta for slug, meta in problems.items() if not slug.startswith(("ctci-", "bctci-"))}
        merge_custom_catalog(workbook_sets, workbook_problems)
        self.assertEqual(workbook_sets, sets)
        self.assertEqual(workbook_problems, problems)

    def test_neetcode_reconciliation_preserves_workbook_and_authored_content(self):
        root = Path(__file__).resolve().parents[2]
        sets = json.loads((root / "content/sets/sets.json").read_text())
        items = next(item["items"] for item in sets if item["id"] == "neetcode-150")
        slugs = {item["slug"] for item in items}
        self.assertEqual(len(items), 150)
        self.assertEqual(len(slugs), 150)
        additions = {"add-two-numbers", "graph-valid-tree", "happy-number",
                     "multiply-strings", "number-of-connected-components-in-an-undirected-graph",
                     "partition-equal-subset-sum", "plus-one", "powx-n", "redundant-connection"}
        self.assertLessEqual(additions, slugs)
        self.assertIn("add-and-search-word-data-structure-design", slugs)
        for slug in slugs:
            for extension in (".md", ".json", ".py", ".java"):
                self.assertTrue((root / "content/leetcode" / (slug + extension)).is_file())

    def test_rejects_collisions_and_missing_metadata(self):
        with self.assertRaisesRegex(ValueError, "Duplicate custom list"):
            merge_custom_catalog([{"id": "ctci"}], {})
        with self.assertRaisesRegex(ValueError, "Duplicate custom problems"):
            merge_custom_catalog([], {"ctci-is-unique": {}})
        with self.assertRaisesRegex(ValueError, "Missing metadata"):
            merge_custom_catalog([], {})
