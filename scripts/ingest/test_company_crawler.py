import json
import tempfile
import unittest
from pathlib import Path

import company_crawler as cc

HEADER = "ID,URL,Title,Difficulty,Acceptance %,Frequency %\n"
KNOWN = {
    "two-sum": {"number": 1, "title": "Two Sum", "difficulty": "easy"},
    "lru-cache": {"number": 146, "title": "LRU Cache", "difficulty": "medium"},
    "number-of-islands": {"number": 200, "title": "Number of Islands", "difficulty": "medium"},
}


def fake_web(pages: dict, log: list):
    def opener(url, headers):
        log.append(url)
        if url in pages:
            return 200, pages[url], {}
        return 404, "", {}
    return opener


def make_fetcher(pages, log, **kw):
    clock = [0.0]
    return cc.Fetcher("test-agent", delay=3.0, opener=fake_web(pages, log), sleep=lambda s: clock.__setitem__(0, clock[0] + s),
                      clock=lambda: clock[0], **kw)


class FetcherTests(unittest.TestCase):
    def test_robots_disallow_blocks_fetch(self):
        log = []
        fetcher = make_fetcher({"https://x.test/robots.txt": "User-agent: *\nDisallow: /private\n", "https://x.test/private/a": "secret",
                                "https://x.test/open": "ok"}, log)
        self.assertIsNone(fetcher.get("https://x.test/private/a"))
        self.assertEqual(fetcher.get("https://x.test/open"), "ok")
        self.assertNotIn("https://x.test/private/a", log)

    def test_missing_robots_allows_but_server_error_blocks(self):
        self.assertEqual(make_fetcher({"https://a.test/p": "ok"}, []).get("https://a.test/p"), "ok")
        status = {"https://b.test/robots.txt": (500, "")}

        def opener(url, headers):
            code, text = status.get(url, (200, "ok"))
            return code, text, {}
        fetcher = cc.Fetcher("t", delay=0, opener=opener, sleep=lambda s: None)
        self.assertIsNone(fetcher.get("https://b.test/p"))

    def test_waits_between_requests_to_one_host(self):
        sleeps = []
        clock = [0.0]
        fetcher = cc.Fetcher("t", delay=3.0, opener=fake_web({"https://h.test/a": "1", "https://h.test/b": "2"}, []),
                             sleep=lambda s: (sleeps.append(s), clock.__setitem__(0, clock[0] + s)), clock=lambda: clock[0])
        fetcher.get("https://h.test/a")
        fetcher.get("https://h.test/b")
        self.assertTrue(sleeps and max(sleeps) <= 3.0 and sum(sleeps) >= 3.0)

    def test_login_walls_are_skipped_and_hosts_back_off(self):
        log = []

        def opener(url, headers):
            log.append(url)
            return (403, "", {}) if "paywalled" in url else (200, "", {})
        fetcher = cc.Fetcher("t", delay=0, opener=lambda u, h: (503, "", {}) if "flaky" in u and "robots" not in u else opener(u, h),
                             sleep=lambda s: None)
        self.assertIsNone(fetcher.get("https://p.test/paywalled"))
        for i in range(6):
            fetcher.get(f"https://flaky.test/{i}")
        self.assertLess(len([u for u in log if "flaky" in u and "robots" not in u]), 12)
        self.assertEqual(fetcher._failures["flaky.test"], 3)

    def test_cache_serves_second_read_and_offline_uses_only_cache(self):
        with tempfile.TemporaryDirectory() as directory:
            log = []
            first = make_fetcher({"https://c.test/a": "hello"}, log, cache=Path(directory))
            self.assertEqual(first.get("https://c.test/a"), "hello")
            log.clear()
            offline = make_fetcher({}, log, cache=Path(directory), offline=True)
            self.assertEqual(offline.get("https://c.test/a"), "hello")
            self.assertIsNone(offline.get("https://c.test/other"))
            self.assertEqual(log, [])


class OpenerTests(unittest.TestCase):
    def test_non_https_urls_are_refused_without_network(self):
        for url in ("file:///etc/passwd", "http://example.com/", "ftp://example.com/x"):
            self.assertEqual(cc.urllib_opener(url, {}), (0, "", {}))


class ExtractionTests(unittest.TestCase):
    index = cc.TitleIndex({s: m["title"] for s, m in KNOWN.items()}, {m["number"]: s for s, m in KNOWN.items()})

    def test_finds_links_titles_and_numbers_but_not_common_words(self):
        html = ('<html><script>var lru cache = 1</script><body><a href="https://leetcode.com/problems/two-sum/">x</a>'
                "<p>They asked the number of islands problem and also LC 146. I paid for Two plus Sum.</p></body></html>")
        text, links = cc.page_text(html)
        self.assertEqual(self.index.find(text, links), {"two-sum", "number-of-islands", "lru-cache"})

    def test_title_must_be_whole_words(self):
        self.assertEqual(self.index.find("subnumber of islandsx"), set())


class RunTests(unittest.TestCase):
    config = {
        "sources": {
            "snap": {"label": "Snap", "home": "https://s.test/", "kind": "snapshot", "verified": True, "base": "https://s.test/data"},
            "forum": {"label": "Forum", "home": "https://f.test/", "kind": "pages", "verified": True, "start": ["https://f.test/{company}?p={page}"],
                      "pages": 1, "follow": r"^https://f\.test/post/\d+$", "max_follow": 5},
        }
    }
    sets = [{"id": "acme", "kind": "company", "items": [{"slug": "two-sum", "category": "Last 30 days"}]}]

    def test_snapshot_and_pages_rank_unlisted_problems_by_source_count(self):
        pages = {
            "https://s.test/data/acme/thirty-days.csv": HEADER + "1,https://leetcode.com/problems/two-sum,Two Sum,Easy,50%,99%\n",
            "https://s.test/data/acme/three-months.csv": HEADER + "146,https://leetcode.com/problems/lru-cache,LRU Cache,Medium,40%,80%\n",
            "https://f.test/acme?p=1": '<a href="/post/1">p</a><a href="/post/2">p</a><a href="/login">l</a>',
            "https://f.test/post/1": "Onsite: LRU Cache then number of islands",
            "https://f.test/post/2": "number of islands again",
        }
        report = cc.run(self.config, ["snap", "forum"], ["acme"], make_fetcher(pages, []), self.sets, KNOWN, None, 25)
        items = report["companies"]["acme"]
        self.assertEqual([i["slug"] for i in items], ["lru-cache", "number-of-islands"])
        self.assertEqual(items[0]["sources"], {"forum": 1, "snap": 2})
        self.assertEqual(items[1]["sources"], {"forum": 2})
        self.assertEqual(sorted(report["sources"]), ["forum", "snap"])
        self.assertEqual(report["problems"], {})

    def test_snapshot_metadata_is_kept_for_problems_missing_from_the_catalog(self):
        pages = {"https://s.test/data/acme/three-months.csv": HEADER + "3,https://leetcode.com/problems/new-thing,New Thing,Hard,10%,5%\n"}
        report = cc.run(self.config, ["snap"], ["acme"], make_fetcher(pages, []), self.sets, KNOWN, None, 25)
        self.assertEqual(report["problems"]["new-thing"]["number"], 3)
        self.assertEqual(report["companies"]["acme"][0]["slug"], "new-thing")

    def test_snapshot_csvs_can_be_saved_for_company_lists(self):
        with tempfile.TemporaryDirectory() as directory:
            pages = {"https://s.test/data/acme/all.csv": HEADER + "1,https://leetcode.com/problems/two-sum,Two Sum,Easy,50%,9%\n"}
            cc.run(self.config, ["snap"], ["acme"], make_fetcher(pages, []), self.sets, KNOWN, Path(directory), 25)
            self.assertTrue((Path(directory) / "acme" / "all.csv").is_file())

    def test_listed_only_sources_skip_other_companies(self):
        source = {"listed_only": True, "companies": {"acme": "Acme"}}
        self.assertEqual(cc.company_key(source, "acme"), "Acme")
        self.assertIsNone(cc.company_key(source, "other"))


class ConfigTests(unittest.TestCase):
    def test_shipped_config_is_well_formed(self):
        config = json.loads(cc.CONFIG.read_text(encoding="utf8"))
        for name, source in config["sources"].items():
            self.assertIn(source["kind"], ("snapshot", "pages"), name)
            self.assertTrue(source["home"].startswith("https://"), name)
            if source["kind"] == "pages":
                for template in source["start"]:
                    self.assertTrue(template.startswith("https://"), name)
                    self.assertIn("{company}", template, name)
                self.assertIn("follow", source, name)


class MergeTests(unittest.TestCase):
    def test_reports_append_unlisted_problems_once_and_describe_sources(self):
        import problem_sets

        report = {"generatedAt": "2026-10-11", "sources": {"forum": {"label": "Forum", "url": "https://f.test/"}},
                  "companies": {"acme": [{"slug": "lru-cache", "sources": {"forum": 2}}, {"slug": "two-sum", "sources": {"forum": 1}}]},
                  "problems": {}}
        sets = [{"id": "acme", "kind": "company", "description": "Acme.", "items": [{"slug": "two-sum", "category": "Last 30 days"}]},
                {"id": "blind", "kind": "curated", "description": "x", "items": []}]
        problems = {"two-sum": KNOWN["two-sum"], "lru-cache": KNOWN["lru-cache"]}
        with tempfile.TemporaryDirectory() as directory:
            original = problem_sets.__file__
            problem_sets.__file__ = str(Path(directory) / "problem_sets.py")
            (Path(directory) / "company_reports.json").write_text(json.dumps(report))
            try:
                problem_sets.merge_company_reports(sets, problems)
            finally:
                problem_sets.__file__ = original
        self.assertEqual([i["slug"] for i in sets[0]["items"]], ["two-sum", "lru-cache"])
        self.assertEqual(sets[0]["items"][1]["category"], "Recent reports")
        self.assertIn("Forum", sets[0]["description"])
        self.assertEqual(sets[1]["items"], [])


if __name__ == "__main__":
    unittest.main()
