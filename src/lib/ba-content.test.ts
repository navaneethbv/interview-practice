import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getBaBank, getBaIndex, getBaTips, listBaChapters } from "./ba-content";

/** Content checks for the Business Analyst course, so edits can't break quizzes or locking. */
describe("business analyst content", () => {
  const index = getBaIndex();
  const chapters = listBaChapters();

  it("loads every chapter in the index", () => {
    assert.equal(chapters.length, index.chapters.length);
    assert.equal(new Set(index.chapters.map((c) => c.id)).size, index.chapters.length);
  });

  for (const chapter of chapters) {
    describe(chapter.id, () => {
      const bank = getBaBank(chapter.id);

      it("has short, titled lessons", () => {
        assert.ok(chapter.lessons.length >= 4, "at least four lessons");
        for (const l of chapter.lessons) {
          assert.ok(l.title.length > 0);
          assert.ok(l.minutes <= 3, `lesson "${l.title}" is ${l.minutes} min; split it into smaller lessons`);
        }
      });

      it("has a question bank larger than the quiz", () => {
        assert.ok(bank.length >= index.quizSize * 2, `${bank.length} questions`);
      });

      it("has well-formed questions linked to real lessons", () => {
        for (const q of bank) {
          assert.ok(q.lesson >= 1 && q.lesson <= chapter.lessons.length, `${q.id} points to lesson ${q.lesson}`);
          assert.equal(q.options.length, 4, `${q.id} needs four options`);
          assert.equal(new Set(q.options).size, 4, `${q.id} has duplicate options`);
          assert.ok(q.q.trim() && q.why.trim(), `${q.id} needs a question and an explanation`);
          // Options are shuffled, so positional answers would break.
          assert.ok(q.options.every((o) => !/\b(all|none|both) of the above\b/i.test(o)), `${q.id} uses a positional option`);
        }
      });

      it("tests every lesson", () => {
        const covered = new Set(bank.map((q) => q.lesson));
        for (const l of chapter.lessons) assert.ok(covered.has(l.n), `lesson ${l.n} "${l.title}" has no questions`);
      });
    });
  }

  it("has a final exam no larger than the combined banks", () => {
    const total = chapters.reduce((sum, c) => sum + getBaBank(c.id).length, 0);
    assert.ok(index.final.size <= total);
  });

  it("has tips", () => {
    assert.ok(getBaTips().length >= 10);
  });
});
