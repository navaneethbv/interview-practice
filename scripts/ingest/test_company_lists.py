import json
import tempfile
import unittest
from pathlib import Path

import company_lists


HEADER = "ID,URL,Title,Difficulty,Acceptance %,Frequency %\n"


class CompanyListTests(unittest.TestCase):
    def test_orders_by_recency_then_frequency_and_keeps_facts_only(self):
        with tempfile.TemporaryDirectory() as directory:
            folder = Path(directory) / "acme"
            folder.mkdir()
            (folder / "three-months.csv").write_text(HEADER + "1,https://leetcode.com/problems/two-sum,Two Sum,Easy,50%,40%\n")
            (folder / "six-months.csv").write_text(HEADER +
                "1,https://leetcode.com/problems/two-sum,Two Sum,Easy,50%,90%\n"
                "146,https://leetcode.com/problems/lru-cache,LRU Cache,Medium,40%,80%\n"
                "200,https://leetcode.com/problems/number-of-islands,Number of Islands,Medium,60%,95%\n")
            (folder / "all.csv").write_text(HEADER + "42,https://leetcode.com/problems/trapping-rain-water/,Trapping Rain Water,Hard,60%,10%\n")
            original = company_lists.OUT
            company_lists.OUT = Path(directory) / "out.json"
            try:
                data = company_lists.build(Path(directory), [("acme", "Acme")], "test snapshot")
            finally:
                company_lists.OUT = original
        items = data["sets"][0]["items"]
        self.assertEqual([i["slug"] for i in items], ["two-sum", "number-of-islands", "lru-cache", "trapping-rain-water"])
        self.assertEqual(items[0]["category"], "Last 3 months")
        self.assertEqual(items[-1]["category"], "Older than 6 months")
        self.assertEqual(data["problems"]["lru-cache"], {"number": 146, "title": "LRU Cache", "difficulty": "medium", "topics": [], "acceptance": 40.0})
        self.assertNotIn("frequency", json.dumps(data["problems"]))

    def test_committed_company_lists_reference_known_problems(self):
        root = Path(__file__).resolve().parents[2]
        sets = json.loads((root / "content/sets/sets.json").read_text())
        problems = json.loads((root / "content/sets/problems.json").read_text())
        for company in ("nvidia", "openai", "anthropic"):
            entry = next(s for s in sets if s["id"] == company)
            self.assertEqual(entry["kind"], "company")
            for item in entry["items"]:
                self.assertIn(item["slug"], problems)
                self.assertTrue((root / "content/leetcode" / f"{item['slug']}.md").is_file(), item["slug"])


if __name__ == "__main__":
    unittest.main()
