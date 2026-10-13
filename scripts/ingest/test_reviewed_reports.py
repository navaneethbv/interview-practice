"""Reviewed observations must remain reproducible and cannot invent attribution."""
import unittest
import company_crawler as cc


class ReviewedReportTests(unittest.TestCase):
    config = {'sources': {'hello': {'label': 'Hello', 'home': 'https://hello.test/'}}}
    sets = [{'id': 'acme', 'kind': 'company', 'items': []}]
    known = {'lru-cache': {'number': 146, 'title': 'LRU Cache', 'difficulty': 'medium'}}

    def observation(self, **changes):
        return dict({'slug': 'lru-cache', 'companies': ['acme'], 'source': 'hello',
                     'url': 'https://hello.test/question/lru', 'observedAt': '2026-10-12',
                     'lastAsked': 'Late September, 2026', 'dateScope': 'question across listed companies'}, **changes)

    def report(self, entries):
        return cc.reviewed_report(entries, self.config, self.sets, self.known, 25)

    def test_deduplicates_observations_and_keeps_exact_evidence(self):
        observation = self.observation()
        report = self.report([observation, observation])
        row = report['companies']['acme'][0]
        self.assertEqual(row['sources'], {'hello': 1})
        self.assertEqual(row['evidence'], [observation])

    def test_keeps_evidence_for_existing_list_entries(self):
        sets = [{'id': 'acme', 'kind': 'company', 'items': [{'slug': 'lru-cache'}]}]
        report = cc.reviewed_report([self.observation()], self.config, sets, self.known, 25)
        self.assertEqual(report['companies']['acme'][0]['evidence'], [self.observation()])

    def test_rejects_unknown_problem_company_and_source(self):
        for changes in [{'slug': 'invented'}, {'companies': ['invented']}, {'source': 'invented'}]:
            observation = self.observation(**changes)
            with self.subTest(changes=changes), self.assertRaises(ValueError):
                self.report([observation])

    def test_rejects_non_source_and_credential_urls(self):
        for url in ['http://hello.test/x', 'https://evil.test/x', 'https://user:secret@hello.test/x']:
            observation = self.observation(url=url)
            with self.subTest(url=url), self.assertRaises(ValueError):
                self.report([observation])

    def test_rejects_invalid_and_future_observation_dates(self):
        for value in ['yesterday', '9999-01-01']:
            observation = self.observation(observedAt=value)
            with self.subTest(value=value), self.assertRaises(ValueError):
                self.report([observation])

    def test_does_not_invent_last_asked_date(self):
        observation = self.observation()
        del observation['lastAsked']
        del observation['dateScope']
        row = self.report([observation])['companies']['acme'][0]
        self.assertNotIn('lastAsked', row['evidence'][0])

    def test_generation_date_is_latest_observation_not_rebuild_date(self):
        report = self.report([self.observation(observedAt='2025-01-01')])
        self.assertEqual(report['generatedAt'], '2025-01-01')
