import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

test("renders system design chapters with anchors, safe links and only importer HTML", async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "design-content-"));
  const originalCwd = process.cwd();
  const book = path.join(directory, "content", "system-design", "grokking");
  fs.mkdirSync(book, { recursive: true }); // nosemgrep -- fixed fixture names inside this test's fresh temporary directory
  const index = {
    id: "grokking",
    title: "Book",
    short: "Book",
    description: "A book.",
    source: "book.pdf",
    parts: [
      { title: "Part one", chapters: [{ id: "first", title: "First" }] },
      { title: "Part two", chapters: [{ id: "second", title: "Second", difficulty: "easy" }] },
    ],
  };
  fs.writeFileSync(path.join(book, "index.json"), JSON.stringify(index)); // nosemgrep -- fixed fixture names inside this test's fresh temporary directory
  fs.writeFileSync( // nosemgrep -- fixed fixture names inside this test's fresh temporary directory
    path.join(book, "first.md"),
    [
      "## Caching",
      "Read [the paper](https://example.com/paper.pdf) or [this](javascript:alert(1)).",
      "## Caching",
      "### Cache & eviction",
      '<figure><img src="/course-assets/system-design/grokking/a.webp" width="10" height="10" alt="A"></figure>',
      "<script>alert(1)</script>",
      "![remote](http://example.com/x.png) ![local](/course-assets/x.webp)",
    ].join("\n\n"),
  );
  fs.writeFileSync(path.join(book, "second.md"), "Second chapter."); // nosemgrep -- fixed fixture names inside this test's fresh temporary directory
  fs.writeFileSync(path.join(directory, "content", "system-design", "stray.md"), "Not in any index."); // nosemgrep -- fixed fixture names inside this test's fresh temporary directory
  try {
    process.chdir(directory);
    const { getDesignChapter, listDesignBooks } = await import("./content");
    process.chdir(originalCwd);

    assert.deepEqual(listDesignBooks().map((b) => b.id), ["grokking"]);
    const page = getDesignChapter("grokking", "first")!;
    assert.deepEqual(page.headings, [
      { id: "caching", text: "Caching", depth: 2 },
      { id: "caching-2", text: "Caching", depth: 2 },
      { id: "cache-eviction", text: "Cache & eviction", depth: 3 },
    ]);
    assert.match(page.html, /<h2 id="caching-2">Caching<\/h2>/);
    assert.match(page.html, /<a href="https:\/\/example.com\/paper.pdf" target="_blank" rel="noreferrer">the paper<\/a>/);
    assert.doesNotMatch(page.html, /javascript:/);
    assert.match(page.html, /<figure><img src="\/course-assets\/system-design\/grokking\/a.webp"/);
    assert.doesNotMatch(page.html, /<script>/);
    assert.match(page.html, /&lt;script&gt;/);
    assert.doesNotMatch(page.html, /http:\/\/example.com\/x.png/);
    assert.match(page.html, /<img src="\/course-assets\/x.webp" alt="local"/);
    assert.equal(page.chapter.part, "Part one");
    assert.equal(page.prev, null);
    assert.equal(page.next?.id, "second");
    assert.equal(getDesignChapter("grokking", "second")!.prev?.id, "first");

    for (const [bookId, chapterId] of [["grokking", "../grokking/first"], ["grokking", "stray"], ["missing", "first"], ["grokking", "First"]]) {
      assert.equal(getDesignChapter(bookId, chapterId), null);
    }
  } finally {
    process.chdir(originalCwd);
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
