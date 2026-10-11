import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  afterAccepted,
  DAY_MS,
  dueReviews,
  EMPTY_MOCK,
  endSession,
  isMockState,
  isReviewState,
  markHard,
  normalizeComplexity,
  parseMock,
  parseReview,
  pickProblems,
  REVIEW_INTERVALS_DAYS,
  solvedDuring,
  type MockState,
  type ReviewState,
} from "./practice-data";
import { parseBackup } from "./practice-backup";

describe("review queue", () => {
  const t0 = Date.UTC(2026, 0, 1);

  it("schedules a first solve for tomorrow and advances only when due", () => {
    let state = afterAccepted({}, "lc:two-sum", t0);
    assert.deepEqual(state["lc:two-sum"], { step: 0, due: t0 + DAY_MS, last: t0 });
    // Solving again before it is due does not count as a review.
    assert.equal(afterAccepted(state, "lc:two-sum", t0 + 1000), state);
    state = afterAccepted(state, "lc:two-sum", t0 + DAY_MS);
    assert.equal(state["lc:two-sum"].step, 1);
    assert.equal(state["lc:two-sum"].due, t0 + DAY_MS + REVIEW_INTERVALS_DAYS[1] * DAY_MS);
  });

  it("stays on the longest interval and restarts when marked hard", () => {
    let state: ReviewState = { a: { step: REVIEW_INTERVALS_DAYS.length - 1, due: t0, last: 0 } };
    state = afterAccepted(state, "a", t0);
    assert.equal(state.a.step, REVIEW_INTERVALS_DAYS.length - 1);
    state = markHard(state, "a", t0);
    assert.deepEqual(state.a, { step: 0, due: t0 + DAY_MS, last: t0 });
  });

  it("lists due problems oldest first and drops invalid stored entries", () => {
    const state = { a: { step: 0, due: t0 - 5, last: 0 }, b: { step: 1, due: t0 - 10, last: 0 }, c: { step: 0, due: t0 + 10, last: 0 } };
    assert.deepEqual(dueReviews(state, t0).map(([id]) => id), ["b", "a"]);
    assert.deepEqual(Object.keys(parseReview(JSON.stringify({ ...state, bad: { step: 99, due: 1, last: 1 } }))), ["a", "b", "c"]);
    assert.deepEqual(parseReview("not json"), {});
    assert.equal(isReviewState({ a: { step: 0, due: 1, last: 1, extra: 1 } }), false);
  });
});

describe("mock interviews", () => {
  it("prefers unsolved problems and falls back to solved ones", () => {
    const candidates = ["a", "b", "c"].map((id) => ({ id, difficulty: "medium" as const }));
    const solved = (id: string) => id !== "b";
    const picked = pickProblems(candidates, solved, 2, () => 0);
    assert.equal(picked[0], "b");
    assert.equal(new Set(picked).size, 2);
    assert.equal(pickProblems(candidates, solved, 5, Math.random).length, 3);
  });

  it("counts only accepted submissions made during the session", () => {
    const session = { startedAt: 1000, minutes: 1, source: "blind-75", problems: ["x", "y", "z"] };
    const log: Record<string, [number, 0 | 1][]> = { x: [[500, 1]], y: [[2000, 0], [3000, 1]], z: [[70_000, 1]] };
    assert.deepEqual(solvedDuring(session, log), ["y"]);
    const ended = endSession({ active: session, history: [] }, log, 5000);
    assert.equal(ended.active, null);
    assert.deepEqual(ended.history[0].solved, ["y"]);
    assert.equal(ended.history[0].endedAt, 5000);
  });

  it("validates stored state", () => {
    const state: MockState = { active: null, history: [{ startedAt: 1, minutes: 45, source: "s", problems: ["a"], ratings: { Coding: 3 } }] };
    assert.equal(isMockState(state), true);
    assert.equal(isMockState({ ...state, history: [{ ...state.history[0], ratings: { Coding: 9 } }] }), false);
    assert.deepEqual(parseMock("{\"active\": 3}"), EMPTY_MOCK);
  });
});

describe("practice backups", () => {
  it("round-trips review and mock state and code in new languages", () => {
    const entries = {
      "ip:review:v1": JSON.stringify({ "lc:two-sum": { step: 1, due: 10, last: 5 } }),
      "ip:mock:v1": JSON.stringify({ active: null, history: [] }),
      "ip:code:lc:two-sum:cpp": "class Solution {};",
      "ip:code:lc:two-sum:go": "func twoSum() {}",
    };
    const backup = parseBackup(JSON.stringify({ format: "interview-practice", version: 1, exportedAt: new Date(0).toISOString(), entries }));
    assert.deepEqual(backup.entries, entries);
    assert.throws(() => parseBackup(JSON.stringify({
      format: "interview-practice", version: 1, exportedAt: new Date(0).toISOString(), entries: { "ip:review:v1": "{\"a\": 1}" },
    })));
  });
});

describe("complexity answers", () => {
  it("ignores spacing, case and multiplication signs", () => {
    assert.equal(normalizeComplexity("O(N log N)"), normalizeComplexity("o(n*log n)"));
    assert.equal(normalizeComplexity("O(m × n)"), normalizeComplexity("O(mn)"));
    assert.equal(normalizeComplexity("O(n²)"), normalizeComplexity("O(n^2)"));
    assert.notEqual(normalizeComplexity("O(n)"), normalizeComplexity("O(n log n)"));
  });
});
