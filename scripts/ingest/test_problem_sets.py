import json
import unittest
from pathlib import Path

from problem_sets import merge_custom_catalog


class CustomCatalogTests(unittest.TestCase):
    def test_rebuild_retains_authored_lists_and_metadata(self):
        root = Path(__file__).resolve().parents[2]
        sets = json.loads((root / "content/sets/sets.json").read_text())
        problems = json.loads((root / "content/sets/problems.json").read_text())
        workbook_sets = [item for item in sets if item["id"] != "ctci"]
        workbook_problems = {slug: meta for slug, meta in problems.items() if not slug.startswith("ctci-")}
        merge_custom_catalog(workbook_sets, workbook_problems)
        self.assertEqual(workbook_sets, sets)
        self.assertEqual(workbook_problems, problems)

    def test_rejects_collisions_and_missing_metadata(self):
        with self.assertRaisesRegex(ValueError, "Duplicate custom list"):
            merge_custom_catalog([{"id": "ctci"}], {})
        with self.assertRaisesRegex(ValueError, "Duplicate custom problems"):
            merge_custom_catalog([], {"ctci-is-unique": {}})
        with self.assertRaisesRegex(ValueError, "Missing metadata"):
            merge_custom_catalog([], {})
