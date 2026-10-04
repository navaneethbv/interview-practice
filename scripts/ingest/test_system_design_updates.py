import tempfile
import unittest
from pathlib import Path

from system_design import Block, Chapter, apply_editorial_updates, process_notes


class SystemDesignUpdatesTests(unittest.TestCase):
    def test_code_comparisons_survive_import_while_prose_html_is_escaped(self):
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "example.md"
            source.write_text(
                "# Example\n<script>bad()</script>\n"
                "```python\nwhile low < high:\n    low += 1\n```\n"
                "~~~text\nx < y\n~~~\n<script>still bad()</script>\n"
            )
            chapters = process_notes(source)
        body = chapters[0].blocks[0].text
        self.assertIn("while low < high:", body)
        self.assertIn("x < y", body)
        self.assertNotIn("<script>", body)
        self.assertIn("&lt;script>", body)

    def test_kafka_reimport_applies_replacements_and_versions_historical_chapters(self):
        titles = ["Role of ZooKeeper", "Controller Broker", "Kafka Delivery Semantics", "Kafka Workflow"]
        chapters = [Chapter(title=title, part="Kafka", blocks=[Block(kind="p", text="Old body")]) for title in titles]
        untouched = Chapter(title="Other topic", part="Other", blocks=[Block(kind="raw", text="Unchanged")])
        chapters.append(untouched)
        apply_editorial_updates("advanced", chapters)
        self.assertEqual([chapter.title for chapter in chapters[:4]], titles)
        self.assertIn("KRaft", chapters[0].blocks[0].text)
        self.assertIn("min.insync.replicas", chapters[2].blocks[0].text)
        self.assertIn("Historical architecture", chapters[3].blocks[0].text)
        self.assertEqual(untouched.blocks[0].text, "Unchanged")

    def test_missing_source_chapter_fails_instead_of_silently_dropping_an_update(self):
        with self.assertRaisesRegex(ValueError, "Kafka update titles not found"):
            apply_editorial_updates("advanced", [])
