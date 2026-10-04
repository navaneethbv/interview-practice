import assert from "node:assert/strict";
import { test } from "node:test";
import { isPracticeVisit, parsePracticeVisits, practiceHref } from "./practice-resume";

const problem = { kind: "problem", title: "Two Sum", context: "Blind 75", href: "/problems/lc/two-sum?set=blind-75", at: 123 };
const chapter = { kind: "chapter", title: "Caching", context: "System design", href: "/system-design/grokking/caching", at: 456 };

test("last problem and chapter survive a storage round trip independently", () => {
  assert.deepEqual(parsePracticeVisits(JSON.stringify({ problem, chapter })), { problem, chapter });
  const previous = parsePracticeVisits(JSON.stringify({ problem, chapter }));
  const nextProblem = { ...problem, title: "Three Sum", href: "/problems/lc/3sum", at: 789 };
  assert.deepEqual(parsePracticeVisits(JSON.stringify({ ...previous, problem: nextProblem })), { problem: nextProblem, chapter });
});

test("malformed stored data and unsafe or mismatched routes cannot become resume links", () => {
  for (const raw of [null, "not JSON", "null", "[]", "123"]) assert.deepEqual(parsePracticeVisits(raw), {});
  for (const href of ["https://example.com", "//example.com", "javascript:alert(1)", "/problems/../settings", "/problems/lc/two-sum?set=//example.com", "/system-design/grokking/caching"]) {
    assert.equal(isPracticeVisit({ ...problem, href }), false);
  }
  for (const at of [0, -1, Infinity, "123"]) assert.equal(isPracticeVisit({ ...problem, at }), false);
  assert.equal(isPracticeVisit({ ...problem, title: " " }), false);
  assert.deepEqual(parsePracticeVisits(JSON.stringify({ problem: chapter, chapter })), { chapter });
});

test("resume retains workbook context and discards unrelated query parameters", () => {
  assert.equal(practiceHref("/problems/lc/two-sum", "?set=blind-75&tab=solution"), problem.href);
  assert.equal(practiceHref("/problems/grokking-two-sum", "?set=blind-75"), "/problems/grokking-two-sum");
  assert.equal(practiceHref("/problems/lc/two-sum", "?set=../bad"), "/problems/lc/two-sum");
  assert.equal(practiceHref("/system-design/grokking/caching", "?set=blind-75"), chapter.href);
});
