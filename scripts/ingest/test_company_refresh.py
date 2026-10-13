"""Regression coverage for safe refreshes and source provenance."""
import contextlib
import io
import json
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import company_crawler as cc
import problem_sets as ps


class FreshFetchTests(unittest.TestCase):
    def test_online_cache_expires_but_offline_can_replay_it(self):
        with tempfile.TemporaryDirectory() as directory:
            calls = []
            fetcher = cc.Fetcher('test', cache=Path(directory), delay=0, wall_clock=lambda: 1000,
                                 cache_max_age=100, opener=lambda u, h: (calls.append(u) or 200, 'fresh', {}))
            path = fetcher._cache_path('https://test.test/page')
            path.write_text(json.dumps({'url': 'https://test.test/page', 'status': 200, 'text': 'old', 'fetchedAt': 800}))
            fetcher.offline = True
            self.assertEqual(fetcher._cached('https://test.test/page'), (200, 'old'))
            self.assertEqual(calls, [])
            fetcher.offline = False
            self.assertEqual(fetcher._cached('https://test.test/page'), (200, 'fresh'))
            self.assertEqual(fetcher._cached('https://test.test/page'), (200, 'fresh'))
            self.assertEqual(len(calls), 1)

    def test_legacy_corrupt_and_wrong_url_cache_entries_are_refetched(self):
        with tempfile.TemporaryDirectory() as directory:
            fetcher = cc.Fetcher('test', cache=Path(directory), delay=0, opener=lambda u, h: (200, 'fresh', {}))
            path = fetcher._cache_path('https://test.test/page')
            for entry in ['broken JSON', json.dumps({'status': 200, 'text': 'old'}),
                          json.dumps({'url': 'https://wrong.test/', 'status': 200, 'text': 'old', 'fetchedAt': 99999999999})]:
                path.write_text(entry)
                self.assertEqual(fetcher._cached('https://test.test/page'), (200, 'fresh'))

    def test_denied_or_rate_limited_robots_never_allow_crawling(self):
        for status in [401, 403, 429]:
            with self.subTest(status=status):
                calls = []
                fetcher = cc.Fetcher('test', delay=0, sleep=lambda n: None,
                                     opener=lambda u, h: (calls.append(u) or status, '', {}))
                self.assertIsNone(fetcher.get('https://test.test/page'))
                self.assertTrue(all(u.endswith('/robots.txt') for u in calls))

    def test_links_inside_hidden_templates_are_ignored(self):
        _, links = cc.page_text('<template><a href="https://leetcode.com/problems/two-sum">Two Sum</a></template>')
        self.assertEqual(links, [])

    def test_cache_destination_is_revalidated_after_the_network_request(self):
        url = 'https://test.test/page'
        with tempfile.TemporaryDirectory() as directory, tempfile.TemporaryDirectory() as outside:
            target = Path(outside) / 'protected.json'
            target.write_text('unchanged')
            fetcher = cc.Fetcher('test', cache=Path(directory), delay=0)
            path = fetcher._cache_path(url)

            def replace_destination(_request_url, _headers):
                path.symlink_to(target)
                return 200, 'page', {}

            fetcher.opener = replace_destination
            with self.assertRaises(ValueError):
                fetcher._cached(url)
            self.assertEqual(target.read_text(), 'unchanged')

    def test_symlink_inserted_after_validation_cannot_redirect_cache_write(self):
        url = 'https://test.test/page'
        with tempfile.TemporaryDirectory() as directory, tempfile.TemporaryDirectory() as outside:
            target = Path(outside) / 'protected.json'
            target.write_text('unchanged')
            fetcher = cc.Fetcher('test', cache=Path(directory), delay=0,
                                 opener=lambda u, h: (200, 'fresh', {}))
            path = fetcher._cache_path(url)
            mkdir = Path.mkdir

            def insert_symlink_after_directory_check(parent, *args, **kwargs):
                mkdir(parent, *args, **kwargs)
                if parent == Path(directory):
                    path.symlink_to(target)

            with patch.object(Path, 'mkdir', insert_symlink_after_directory_check):
                self.assertEqual(fetcher._cached(url), (200, 'fresh'))
            self.assertEqual(target.read_text(), 'unchanged')
            self.assertFalse(path.is_symlink())
            self.assertEqual(json.loads(path.read_text())['text'], 'fresh')


class SafeRefreshTests(unittest.TestCase):
    def test_live_discovery_never_overwrites_reviewed_report(self):
        with tempfile.TemporaryDirectory() as directory:
            out = Path(directory) / 'report.json'
            out.write_text('reviewed data')
            with patch.object(cc, 'OUT', out), patch.object(cc, 'run', return_value={'companies': {}}), contextlib.redirect_stdout(io.StringIO()):
                cc.main([])
            self.assertEqual(out.read_text(), 'reviewed data')

    def test_filtered_reviewed_write_is_rejected_before_touching_output(self):
        for args in [['--companies', 'meta'], ['--sources=hellointerview'], ['--max-new', '1'], ['--comp', 'meta']]:
            with self.subTest(args=args), contextlib.redirect_stderr(io.StringIO()), self.assertRaises(SystemExit):
                cc.main(['--reviewed', *args])

    def test_limits_rejected_before_network(self):
        for args in [['--delay', '-1'], ['--delay', 'nan'], ['--max-new', '0'], ['--cache-max-age', '-1']]:
            with self.subTest(args=args), patch.object(cc, 'run') as run, contextlib.redirect_stderr(io.StringIO()), self.assertRaises(SystemExit):
                cc.main(args)
            run.assert_not_called()


class ScopedExtractionTests(unittest.TestCase):
    def test_only_exact_visible_question_links_count(self):
        index = cc.TitleIndex({'meeting-rooms': 'Meeting Rooms', 'meeting-rooms-ii': 'Meeting Rooms II', 'candy': 'Candy'})
        path = '/interview/problems/12345678-1234-1234-1234-123456789abc'
        document = (f'<p>Meeting Rooms II</p><a href="/guide">Meeting Rooms</a>'
                    f'<a href="{path}">Minimum Meeting Rooms</a>'
                    f'<template><a href="{path}">Candy</a></template>'
                    f'<a href="https://other.test{path}">Candy</a>'
                    f'<a href="{path}"><span>Meeting Rooms II</span></a>')
        entries = cc.coding_list_observations(document, 'https://test.test/company/acme', 'acme', 'forum', index)
        self.assertEqual([e['slug'] for e in entries], ['meeting-rooms-ii'])
        self.assertEqual(entries[0]['questionUrl'], 'https://test.test' + path)

    def test_ambiguous_catalog_titles_do_not_map(self):
        index = cc.TitleIndex({'one': 'Same Title', 'two': 'Same Title'})
        entries = cc.coding_list_observations('<a href="/interview/problems/12345678-1234-1234-1234-123456789abc">Same Title</a>',
                                              'https://test.test/company/acme', 'acme', 'forum', index)
        self.assertEqual(entries, [])

    def test_offline_replay_does_not_redate_cached_evidence(self):
        url = 'https://test.test/company/acme'
        with tempfile.TemporaryDirectory() as directory:
            fetcher = cc.Fetcher('test', cache=Path(directory), offline=True)
            for target, text in [('https://test.test/robots.txt', 'User-agent: *\nAllow: /'),
                                 (url, '<a href="/interview/problems/12345678-1234-1234-1234-123456789abc">Candy</a>')]:
                fetcher._cache_path(target).write_text(json.dumps({'url': target, 'status': 200, 'text': text, 'fetchedAt': 1735689600}))
            tally = cc.Tally()
            cc.page_mentions(url, 'forum', 'acme', fetcher, tally, cc.TitleIndex({'candy': 'Candy'}), 'coding-list-links')
            self.assertEqual(tally.evidence[('acme', 'candy')][0]['observedAt'], '2025-01-01')


class ProvenanceTests(unittest.TestCase):
    def test_reviewed_sources_retain_distinct_question_links(self):
        entry = {'slug': 'two-sum', 'companies': ['acme'], 'source': 'hello',
                 'url': 'https://hello.test/list', 'questionUrl': 'https://hello.test/first', 'observedAt': '2026-10-12'}
        report = cc.reviewed_report([entry, {**entry, 'questionUrl': 'https://hello.test/second'}],
                                    {'sources': {'hello': {'label': 'Hello', 'home': 'https://hello.test/'}}},
                                    [{'id': 'acme', 'kind': 'company', 'items': []}], {'two-sum': {}}, 25)
        self.assertEqual(len(report['companies']['acme'][0]['evidence']), 2)

    def test_snapshot_refresh_preserves_workbook_rows_and_metadata(self):
        sets = [{'id': 'acme', 'title': 'Acme', 'kind': 'company', 'description': 'Old',
                 'items': [{'slug': 'two-sum'}, {'slug': 'lru-cache'}]}]
        meta = {'two-sum': {'title': 'Two Sum', 'topics': ['Array']}, 'lru-cache': {'title': 'LRU Cache'}}
        snapshot = {'sets': [{'id': 'acme', 'kind': 'company', 'description': 'Snapshot dated July',
                             'snapshotDate': '2026-07-12', 'sourceUrl': 'https://github.com/example/snapshot/tree/abc',
                             'items': [{'slug': 'two-sum', 'category': 'Last 30 days'}, {'slug': 'new-item'}]}],
                    'problems': {'two-sum': {'topics': []}, 'new-item': {'title': 'New Item'}}}
        with tempfile.TemporaryDirectory() as directory:
            (Path(directory) / 'company_lists.json').write_text(json.dumps(snapshot))
            with patch.object(ps, '__file__', str(Path(directory) / 'problem_sets.py')):
                ps.merge_company_lists(sets, meta)
        self.assertEqual(len(sets), 1)
        self.assertEqual([i['slug'] for i in sets[0]['items']], ['two-sum', 'new-item', 'lru-cache'])
        self.assertEqual(sets[0]['items'][-1]['category'], 'Workbook · date unavailable')
        self.assertEqual(meta['two-sum']['topics'], ['Array'])
        self.assertEqual(sets[0]['sourceUrl'], snapshot['sets'][0]['sourceUrl'])

    def test_report_evidence_reaches_existing_and_new_rows(self):
        evidence = {'source': 'hello', 'url': 'https://hello.test/q', 'observedAt': '2026-10-12',
                    'lastAsked': 'Early October, 2026', 'dateScope': 'question across listed companies'}
        report = {'generatedAt': '2026-10-12', 'sources': {'hello': {'label': 'Hello Interview', 'url': 'https://hello.test/'}},
                  'companies': {'acme': [{'slug': s, 'sources': {'hello': 1}, 'evidence': [evidence]} for s in ['two-sum', 'lru-cache']]}, 'problems': {}}
        sets = [{'id': 'acme', 'kind': 'company', 'description': '', 'items': [{'slug': 'two-sum', 'category': 'Array'}]}]
        with tempfile.TemporaryDirectory() as directory:
            (Path(directory) / 'company_reports.json').write_text(json.dumps(report))
            with patch.object(ps, '__file__', str(Path(directory) / 'problem_sets.py')):
                ps.merge_company_reports(sets, {'two-sum': {}, 'lru-cache': {'title': 'LRU Cache'}})
        for item in sets[0]['items']:
            self.assertEqual(item['reports'][0]['observedAt'], '2026-10-12')
            self.assertEqual(item['reports'][0]['dateScope'], 'question across listed companies')
        self.assertEqual(sets[0]['items'][0]['category'], 'Array')
        self.assertEqual(sets[0]['items'][1]['category'], 'Website reports')

    def test_optional_question_link_is_validated_too(self):
        entry = {'slug': 'two-sum', 'source': 'hello', 'companies': ['acme'], 'url': 'https://hello.test/q',
                 'questionUrl': 'javascript:alert(1)', 'observedAt': '2026-10-12'}
        with self.assertRaises(ValueError):
            cc.reviewed_report([entry], {'sources': {'hello': {'home': 'https://hello.test/'}}},
                               [{'id': 'acme', 'kind': 'company', 'items': []}], {'two-sum': {}}, 25)


if __name__ == '__main__':
    unittest.main()
