import copy
import json
import unittest
from pathlib import Path

from problem_sets import reconcile_neetcode


class CuratedCatalogTests(unittest.TestCase):
    def test_reconciliation_restores_entries_and_preserves_other_lists(self):
        root = Path(__file__).resolve().parents[2]
        metadata = json.loads((root / "content/sets/problems.json").read_text())
        other = {"id": "custom", "items": [{"slug": "two-sum"}]}
        sets = [copy.deepcopy(other), {"id": "neetcode-150", "items": []}]
        reconcile_neetcode(sets, metadata)
        self.assertEqual(sets[0], other)
        slugs = {item["slug"] for item in sets[1]["items"]}
        self.assertEqual(len(slugs), 150)
        self.assertLessEqual({"add-two-numbers", "happy-number", "powx-n",
                             "redundant-connection", "partition-equal-subset-sum"}, slugs)
        self.assertIn("add-and-search-word-data-structure-design", slugs)
        self.assertNotIn("design-add-and-search-words-data-structure", slugs)
        previous = copy.deepcopy(sets)
        reconcile_neetcode(sets, metadata)
        self.assertEqual(sets, previous)

    def test_missing_metadata_does_not_modify_the_list(self):
        sets = [{"id": "neetcode-150", "items": []}]
        previous = copy.deepcopy(sets)
        with self.assertRaisesRegex(ValueError, "Missing NeetCode metadata"):
            reconcile_neetcode(sets, {})
        self.assertEqual(sets, previous)
