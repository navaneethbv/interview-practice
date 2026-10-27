import test from "node:test";
import assert from "node:assert/strict";
import {
  PREP_TOPICS,
  prepQuestions,
  prepChapters,
  questionsFor,
  chaptersFor,
} from "./technical-prep";
import { filterPrepQuestions } from "./prep-filter";

test("course links, instructional depth and question coverage stay complete", () => {
  assert.equal(PREP_TOPICS.length, 5);
  assert.equal(prepQuestions.length, 100);
  assert.equal(prepChapters.length, 25);
  assert.equal(new Set(prepQuestions.map((q) => q.id)).size, 100);
  assert.equal(new Set(prepChapters.map((c) => c.topic + "/" + c.id)).size, 25);
  for (const topic of PREP_TOPICS) {
    const questions = questionsFor(topic.id);
    assert.equal(questions.length, 20);
    assert.equal(chaptersFor(topic.id).length, 5);
    for (const level of ["Beginner", "Intermediate", "Advanced"])
      assert.ok(questions.some((q) => q.level === level));
    for (const source of topic.sources)
      assert.equal(new URL(source.url).protocol, "https:");
    for (const q of questions) {
      assert.ok(
        q.answer.length > 100 &&
          q.example.length > 30 &&
          q.pitfall.length > 30 &&
          q.followUp.length > 20,
      );
      if (topic.id === "algorithms" || topic.id === "data-structures")
        assert.ok(
          q.complexity?.time && q.complexity.space && q.complexity.notes,
        );
    }
  }
  for (const ch of prepChapters) {
    assert.ok(PREP_TOPICS.some((t) => t.id === ch.topic));
    assert.match(ch.id, /^[a-z][a-z-]+$/);
    assert.equal(ch.sections.length, 3);
    for (const section of ch.sections)
      assert.ok(section.body.split(/\s+/).length >= 40);
    assert.ok(
      ch.code &&
        ch.walkthrough &&
        ch.exercise &&
        ch.solution &&
        ch.complexity.notes,
    );
  }
});
test("question filters combine terms and level without mutating content", () => {
  const all = questionsFor("java");
  assert.equal(filterPrepQuestions(all, "", "All").length, 20);
  const hits = filterPrepQuestions(all, "volatile atomic", "Advanced");
  assert.ok(hits.some((q) => q.id === "java-volatile"));
  assert.equal(filterPrepQuestions(all, "no-such-term", "All").length, 0);
  assert.equal(all.length, 20);
});
test("new chapters keep each track's sessions grouped and every question has a known level", () => {
  const order = ["Beginner", "Intermediate", "Advanced"];
  for (const topic of PREP_TOPICS) {
    const indexes = prepChapters.flatMap((c, i) => (c.topic === topic.id ? [i] : []));
    assert.equal(indexes.at(-1)! - indexes[0], indexes.length - 1);
    const levels = questionsFor(topic.id).map((q) => order.indexOf(q.level));
    assert.ok(levels.every((l) => l >= 0));
    assert.ok(levels.includes(0) && levels.includes(2));
  }
  for (const id of ["range-structures", "strings-and-bits", "modern-java", "events-and-messaging", "notification-service"])
    assert.ok(prepChapters.some((c) => c.id === id && c.code.length > 200));
});
