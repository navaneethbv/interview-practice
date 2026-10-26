import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  chapterStatuses,
  drawBalanced,
  drawChapterQuiz,
  drawFinalExam,
  EMPTY_BA,
  finalUnlocked,
  isBaState,
  parseBa,
  passMark,
  present,
  scoreAnswers,
  withAttempt,
  withNote,
  withRead,
  type BaQuestion,
} from "./ba-data";

/** Deterministic pseudo-random numbers for repeatable tests. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

const bank: BaQuestion[] = Array.from({ length: 30 }, (_, i) => ({
  id: `c-${i + 1}`,
  lesson: (i % 6) + 1,
  q: `Question ${i + 1}`,
  options: [`right ${i}`, `wrong a ${i}`, `wrong b ${i}`, `wrong c ${i}`],
  why: "because",
}));

const pass = (id: string) => ({ at: 1, score: 9, total: 10, passed: true, ids: [id] });
const fail = { at: 1, score: 5, total: 10, passed: false, ids: [] };

describe("present", () => {
  it("keeps track of the correct answer after shuffling", () => {
    for (let seed = 1; seed < 50; seed++) {
      const p = present(bank[0], seeded(seed));
      assert.equal(p.choices[p.correct], "right 0");
      assert.deepEqual([...p.choices].sort((a, b) => a.localeCompare(b)), [...bank[0].options].sort((a, b) => a.localeCompare(b)));
    }
  });

  it("varies the position of the correct answer", () => {
    const positions = new Set(Array.from({ length: 40 }, (_, seed) => present(bank[0], seeded(seed + 1)).correct));
    assert.ok(positions.size >= 3);
  });
});

describe("drawChapterQuiz", () => {
  it("draws distinct questions covering every lesson", () => {
    const quiz = drawChapterQuiz(bank, 10, new Set(), seeded(7));
    assert.equal(quiz.length, 10);
    assert.equal(new Set(quiz.map((q) => q.id)).size, 10);
    assert.deepEqual([...new Set(quiz.map((q) => q.lesson))].sort((a, b) => a - b), [1, 2, 3, 4, 5, 6]);
  });

  it("prefers questions not shown in the previous attempt", () => {
    const first = drawChapterQuiz(bank, 10, new Set(), seeded(3));
    const second = drawChapterQuiz(bank, 10, new Set(first.map((q) => q.id)), seeded(4));
    const overlap = second.filter((q) => first.some((f) => f.id === q.id));
    assert.equal(overlap.length, 0);
  });

  it("returns the whole bank when it is smaller than the quiz", () => {
    assert.equal(drawChapterQuiz(bank.slice(0, 4), 10, new Set(), seeded(1)).length, 4);
  });
});

describe("drawBalanced", () => {
  it("spreads picks evenly across groups", () => {
    const groups = [0, 1, 2].map((g) => Array.from({ length: 10 }, (_, i) => ({ id: `${g}-${i}`, g })));
    const picked = drawBalanced(groups, 9, new Set(), seeded(11));
    for (const g of [0, 1, 2]) assert.equal(picked.filter((p) => p.g === g).length, 3);
  });
});

describe("drawFinalExam", () => {
  it("tags each question with its chapter and covers every chapter", () => {
    const banks = ["a", "b", "c"].map((chapter) => ({ chapter, questions: bank.map((q) => ({ ...q, id: `${chapter}-${q.id}` })) }));
    const exam = drawFinalExam(banks, 30, new Set(), seeded(5));
    assert.equal(exam.length, 30);
    assert.deepEqual([...new Set(exam.map((q) => q.chapter ?? ""))].sort((a, b) => a.localeCompare(b)), ["a", "b", "c"]);
  });
});

describe("scoring", () => {
  it("counts correct answers and unanswered questions as wrong", () => {
    const quiz = drawChapterQuiz(bank, 4, new Set(), seeded(2));
    const answers = [quiz[0].correct, quiz[1].correct, (quiz[2].correct + 1) % 4, null];
    assert.deepEqual(scoreAnswers(quiz, answers), { correct: 2, total: 4, percent: 50 });
  });

  it("rounds the pass mark up to whole questions", () => {
    assert.equal(passMark(10, 80), 8);
    assert.equal(passMark(30, 80), 24);
    assert.equal(passMark(7, 80), 6);
  });
});

describe("chapter progression", () => {
  const ids = ["one", "two", "three"];

  it("opens every chapter from the start", () => {
    assert.deepEqual(chapterStatuses(EMPTY_BA, ids), ["open", "open", "open"]);
  });

  it("marks a failed quiz as taken and a passing attempt as passed", () => {
    let state = withAttempt(EMPTY_BA, "one", fail);
    assert.deepEqual(chapterStatuses(state, ids), ["taken", "open", "open"]);
    state = withAttempt(state, "one", pass("one"));
    assert.deepEqual(chapterStatuses(state, ids), ["passed", "open", "open"]);
  });

  it("unlocks the final exam once every chapter quiz is taken, even if failed", () => {
    let state = withAttempt(EMPTY_BA, "one", pass("one"));
    state = withAttempt(state, "two", fail);
    assert.equal(finalUnlocked(state, ids), false);
    state = withAttempt(state, "three", fail);
    assert.equal(finalUnlocked(state, ids), true);
  });
});

describe("state validation", () => {
  it("accepts well-formed state and round-trips through parse", () => {
    const state = withNote(withAttempt(withRead(EMPTY_BA, "one", 2, true, 5), "one", pass("one")), "one", "my note");
    assert.ok(isBaState(state));
    assert.deepEqual(parseBa(JSON.stringify(state)), state);
  });

  it("rejects malformed state in backups", () => {
    assert.equal(isBaState({ ...EMPTY_BA, read: { "bad key": 1 } }), false);
    assert.equal(isBaState({ ...EMPTY_BA, quizzes: { one: [{ ...fail, score: 11 }] } }), false);
    assert.equal(isBaState({ ...EMPTY_BA, extra: true }), false);
  });

  it("keeps the valid parts of damaged storage", () => {
    const parsed = parseBa(JSON.stringify({ read: { "one:1": 3 }, quizzes: "broken", notes: {}, position: {} }));
    assert.deepEqual(parsed.read, { "one:1": 3 });
    assert.deepEqual(parsed.quizzes, {});
    assert.deepEqual(parseBa("not json"), EMPTY_BA);
  });
});
