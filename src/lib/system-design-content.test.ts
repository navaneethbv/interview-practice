import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { designChapters, getDesignChapter, listDesignBooks } from "./content";

test("every imported system design chapter renders cleanly", () => {
  const books = listDesignBooks();
  assert.deepEqual(books.map((b) => b.id), ["grokking", "advanced", "notes"]);
  for (const book of books) {
    if (book.download) assert.ok(fs.existsSync(path.join("public", book.download)), `${book.id}: missing ${book.download}`);
    for (const chapter of designChapters(book)) {
      const page = getDesignChapter(book.id, chapter.id);
      const where = `${book.id}/${chapter.id}`;
      assert.ok(page && page.html.length > 200, `${where} is empty`);
      // PDF extraction leftovers: undecoded glyphs and dropped ligatures.
      assert.doesNotMatch(page.html, /\(cid:\d+\)|\u0000|\uFFFD/, where);
      // Course boilerplate and the "(https://www.educative.io/...)" link dumps the old importer left inline.
      assert.doesNotMatch(page.html, /We'll cover the following|\(https?:\/\/www\.educative\.io/, where);
      assert.doesNotMatch(chapter.title, /\s#$|\b(Con icting|Work ow|Re nements)\b/, where);
      for (const [, src] of page.html.matchAll(/<img src="([^"]+)"/g)) {
        if (src.startsWith("/")) assert.ok(fs.existsSync(path.join("public", src)), `${where}: missing ${src}`);
      }
    }
  }
});
