import test from "node:test";
import assert from "node:assert/strict";
import {
  BUDGETS,
  dailyTasks,
  demonstratedTasks,
  EMPTY_PLAN,
  isBookmarks,
  isMistakes,
  isPlanState,
  parseLearning,
  readinessEvidence,
  validDate,
  validHref,
  type LearningTask,
} from "./learning-data";
import { EMPTY_BA } from "./ba-data";
const tasks: LearningTask[] = [
  {
    id: "c1",
    title: "Coding one",
    href: "/problems/one",
    track: "coding",
    minutes: 30,
    kind: "solve",
    evidenceId: "one",
  },
  {
    id: "c2",
    title: "Coding two",
    href: "/problems/two",
    track: "coding",
    minutes: 45,
    kind: "solve",
    evidenceId: "two",
  },
  {
    id: "b1",
    title: "BA read",
    href: "/business-analyst/foundations",
    track: "ba",
    minutes: 15,
    kind: "read",
    evidenceId: "foundations",
  },
  {
    id: "b2",
    title: "BA quiz",
    href: "/business-analyst/foundations",
    track: "ba",
    minutes: 15,
    kind: "quiz",
    evidenceId: "foundations",
  },
  {
    id: "b3",
    title: "Locked chapter",
    href: "/business-analyst/next",
    track: "ba",
    minutes: 15,
    kind: "read",
    evidenceId: "next",
    prerequisite: "b2",
  },
];
const progress = { solved: {}, attempted: {}, read: {}, log: {}, resets: {} };
test("daily budgets stay bounded after missed months and completed tasks remain visible for their day", () => {
  for (const minutes of BUDGETS) {
    const p = {
      ...EMPTY_PLAN,
      minutes,
      startDate: "2026-01-01",
      completed: { c1: "2026-01-02" },
    };
    const today = dailyTasks(tasks, p, "2026-10-26");
    assert.ok(today.reduce((n, t) => n + t.minutes, 0) <= minutes);
    assert.ok(!today.some((t) => t.id === "c1"));
  }
  assert.ok(
    dailyTasks(
      tasks,
      { ...EMPTY_PLAN, goal: "coding", completed: { c1: "2026-10-26" } },
      "2026-10-26",
    ).some((t) => t.id === "c1"),
  );
});
test("local calendar gates start/end inclusively, including leap days", () => {
  assert.equal(validDate("2028-02-29"), true);
  assert.equal(validDate("2026-02-29"), false);
  const p = {
    ...EMPTY_PLAN,
    startDate: "2026-10-26",
    targetDate: "2026-10-27",
  };
  assert.equal(dailyTasks(tasks, p, "2026-10-25").length, 0);
  assert.ok(dailyTasks(tasks, p, "2026-10-26").length);
  assert.ok(dailyTasks(tasks, p, "2026-10-27").length);
  assert.equal(dailyTasks(tasks, p, "2026-10-28").length, 0);
});
test("mixed small budgets alternate, estimates fit, prerequisites and goals are respected", () => {
  assert.equal(
    dailyTasks(tasks, { ...EMPTY_PLAN, minutes: 30 }, "2026-10-26")[0].track,
    "ba",
  );
  assert.equal(
    dailyTasks(tasks, { ...EMPTY_PLAN, minutes: 30 }, "2026-10-27")[0].track,
    "coding",
  );
  assert.ok(
    dailyTasks(tasks, { ...EMPTY_PLAN, goal: "ba" }, "2026-10-26").every(
      (t) => t.track === "ba" && t.id !== "b3",
    ),
  );
  assert.ok(
    dailyTasks(
      tasks,
      { ...EMPTY_PLAN, goal: "ba" },
      "2026-10-26",
      new Set(["b2"]),
    ).some((t) => t.id === "b3"),
  );
  assert.equal(
    dailyTasks(
      tasks,
      { ...EMPTY_PLAN, goal: "coding", minutes: 30, estimates: { c1: 60 } },
      "2026-10-26",
    ).length,
    0,
  );
});
test("validators reject executable links, impossible dates, malformed backups and duplicate IDs", () => {
  assert.equal(validHref("javascript:alert(1)"), false);
  assert.equal(validHref("//example.com"), false);
  assert.equal(validHref("/problems/one"), true);
  assert.equal(
    isPlanState({
      ...EMPTY_PLAN,
      startDate: "2026-10-27",
      targetDate: "2026-10-26",
    }),
    false,
  );
  assert.equal(isPlanState({ ...EMPTY_PLAN, minutes: Infinity }), false);
  assert.equal(isPlanState({ ...EMPTY_PLAN, estimates: { x: 0 } }), false);
  assert.equal(parseLearning("{", isPlanState, EMPTY_PLAN), EMPTY_PLAN);
  const bookmark = { href: "/learn/one", title: "One", section: "Coding" };
  assert.equal(isBookmarks([bookmark, bookmark]), false);
  const mistake = {
    id: "1",
    question: "Why?",
    href: "",
    mistaken: "",
    corrected: "",
    dueDate: "2026-10-26",
    resolved: false,
  };
  assert.equal(isMistakes([mistake]), true);
  assert.equal(isMistakes([{ ...mistake, dueDate: "2026-02-30" }]), false);
});
test("read or plan completion never produces demonstration, mocks require completed records", () => {
  const p = { ...progress, read: { one: 1 }, attempted: { one: 1 } };
  assert.equal(demonstratedTasks(tasks, p, EMPTY_BA).size, 0);
  const e = readinessEvidence(
    p,
    { ...EMPTY_BA, read: { "foundations:1": 1 } },
    {
      active: null,
      history: [
        {
          startedAt: 1,
          minutes: 30,
          source: "course",
          problems: ["one"],
          endedAt: 3,
          solved: ["one"],
        },
      ],
    },
    ["one", "two"],
  );
  assert.equal(e.read, 2);
  assert.equal(e.accepted, 0);
  assert.equal(e.attempted, 1);
  assert.equal(e.completedMocks, 1);
  assert.equal(e.mockSolves, 1);
  assert.ok(
    demonstratedTasks(tasks, { ...p, solved: { one: 2 } }, EMPTY_BA).has("c1"),
  );
});
test("guarded stores retain edits and safely parse while browser storage is unavailable", async () => {
  const { bookmarks, mistakes, learningPlan } = await import(
    "./learning-store"
  );
  const b = { href: "/problems/one", title: "One", section: "Coding" };
  assert.doesNotThrow(() => bookmarks.read());
  assert.equal(bookmarks.write([b]), false);
  assert.deepEqual(bookmarks.read(), [b]);
  assert.equal(
    mistakes.write([
      {
        id: "offline",
        question: "Question",
        href: "",
        mistaken: "Initial idea",
        corrected: "Correction",
        dueDate: "2026-10-26",
        resolved: false,
      },
    ]),
    false,
  );
  assert.equal(mistakes.read()[0].id, "offline");
  assert.equal(learningPlan.write({ ...EMPTY_PLAN, minutes: 120 }), false);
  assert.equal(learningPlan.read().minutes, 120);
});
test("independence is never inferred, assistance stays sticky until an explicit fresh attempt", async () => {
  const {
    beginIndependentAttempt,
    isLearningEvidence,
    learningEvidenceSummary,
    withLearningAcceptance,
    withLearningAssistance,
  } = await import("./learning-data");
  let state = withLearningAcceptance({}, "one", 10);
  assert.equal(learningEvidenceSummary(state, ["one"]).unknown, 1);
  state = beginIndependentAttempt(state, "one", 20);
  assert.equal(
    learningEvidenceSummary(state, ["one"]).independent,
    0,
    "declaration does not upgrade earlier acceptance",
  );
  state = withLearningAssistance(state, "one", "hint", 21);
  state = withLearningAcceptance(state, "one", 22);
  state = withLearningAcceptance(state, "one", 23);
  assert.equal(learningEvidenceSummary(state, ["one"]).hints, 1);
  assert.equal(learningEvidenceSummary(state, ["one"]).independent, 0);
  state = withLearningAssistance(state, "one", "solution", 24);
  assert.equal(
    learningEvidenceSummary(state, ["one"]).hints,
    1,
    "later assistance must not reclassify an accepted result",
  );
  assert.equal(learningEvidenceSummary(state, ["one"]).solutions, 0);
  state = withLearningAcceptance(state, "one", 25);
  assert.equal(learningEvidenceSummary(state, ["one"]).solutions, 1);
  state = beginIndependentAttempt(state, "one", 30);
  state = withLearningAcceptance(state, "one", 31);
  assert.equal(learningEvidenceSummary(state, ["one"]).independent, 1);
  assert.equal(isLearningEvidence(state), true);
  assert.equal(
    isLearningEvidence({
      one: [
        {
          startedAt: 20,
          declaredIndependent: true,
          hints: 0,
          solutions: 0,
          acceptedAt: 10,
        },
      ],
    }),
    false,
  );
  assert.equal(
    isLearningEvidence({
      one: [
        { startedAt: 0, declaredIndependent: false, hints: -1, solutions: 0 },
      ],
    }),
    false,
  );
});
test("accepted work completed today reserves its full budget after evidence changes and refresh", async () => {
  const { taskCompletionDates, localDate } = await import("./learning-data");
  const acceptedAt = new Date(2026, 9, 26, 15, 30).valueOf();
  const today = localDate(new Date(acceptedAt));
  const codingTasks = [tasks[0], { ...tasks[1], minutes: 30 }];
  const plan = {
    ...EMPTY_PLAN,
    goal: "coding" as const,
    minutes: 30 as const,
    completed: { c1: today },
  };
  const acceptedProgress = {
    ...progress,
    solved: { one: acceptedAt },
    attempted: { one: acceptedAt },
  };
  const evidence = demonstratedTasks(codingTasks, acceptedProgress, EMPTY_BA);
  const dates = taskCompletionDates(codingTasks, acceptedProgress, EMPTY_BA);
  assert.deepEqual(
    dailyTasks(codingTasks, plan, today, evidence).map((task) => task.id),
    ["c1"],
  );
  assert.deepEqual(
    dailyTasks(
      codingTasks,
      JSON.parse(JSON.stringify(plan)),
      today,
      evidence,
      dates,
    ).map((task) => task.id),
    ["c1"],
  );
  // An accepted submission also reserves its time when no manual checkbox was clicked.
  assert.deepEqual(
    dailyTasks(
      codingTasks,
      { ...plan, completed: {} },
      today,
      evidence,
      dates,
    ).map((task) => task.id),
    ["c1"],
  );
});
test("passing a chapter quiz does not replace today’s allocation with newly unlocked work", async () => {
  const { taskCompletionDates, localDate } = await import("./learning-data");
  const passedAt = new Date(2026, 9, 26, 16).valueOf();
  const today = localDate(new Date(passedAt));
  const ba = {
    ...EMPTY_BA,
    quizzes: {
      foundations: [
        { at: passedAt, score: 10, total: 10, passed: true, ids: [] },
      ],
    },
  };
  const plan = {
    ...EMPTY_PLAN,
    goal: "ba" as const,
    minutes: 30 as const,
    completed: { b1: today, b2: today },
  };
  const evidence = demonstratedTasks(tasks, progress, ba);
  const dates = taskCompletionDates(tasks, progress, ba);
  const assigned = dailyTasks(tasks, plan, today, evidence, dates);
  assert.deepEqual(
    assigned.map((task) => task.id),
    ["b1", "b2"],
  );
  assert.equal(
    assigned.reduce((sum, task) => sum + task.minutes, 0),
    30,
  );
  assert.ok(!assigned.some((task) => task.id === "b3"));
  assert.deepEqual(
    dailyTasks(
      tasks,
      { ...plan, completed: { b1: today } },
      today,
      evidence,
      dates,
    ).map((task) => task.id),
    ["b1", "b2"],
  );
  assert.ok(
    dailyTasks(tasks, plan, "2026-10-27", evidence, dates).some(
      (task) => task.id === "b3",
    ),
  );
});
test("today’s allocation remains spent after changing goals, even if new tasks sort first", () => {
  const plan = {
    ...EMPTY_PLAN,
    goal: "ba" as const,
    minutes: 30 as const,
    completed: { c1: "2026-10-26" },
  };
  assert.deepEqual(
    dailyTasks(tasks, plan, "2026-10-26").map((task) => task.id),
    ["c1"],
  );
});

test("assistance after acceptance starts a new unaccepted attempt and preserves chronological evidence", async () => {
  const {
    beginIndependentAttempt,
    isLearningEvidence,
    withLearningAcceptance,
    withLearningAssistance,
  } = await import("./learning-data");
  let state = beginIndependentAttempt({}, "one", 10);
  state = withLearningAcceptance(state, "one", 20);
  const accepted = { ...state.one[0] };
  state = withLearningAssistance(state, "one", "solution", 30);
  assert.equal(state.one.length, 2);
  assert.deepEqual(state.one[0], accepted);
  assert.deepEqual(state.one[1], {
    startedAt: 30,
    declaredIndependent: false,
    hints: 0,
    solutions: 1,
  });
  state = withLearningAssistance(state, "one", "hint", 31);
  state = withLearningAcceptance(state, "one", 40);
  assert.deepEqual(state.one[0], accepted);
  assert.equal(state.one[1].acceptedAt, 40);
  assert.equal(state.one[1].declaredIndependent, false);
  assert.equal(state.one[1].solutions, 1);
  assert.equal(state.one[1].hints, 1);
  const prior = state;
  assert.equal(
    withLearningAcceptance(state, "one", 50),
    prior,
    "duplicate accepts preserve original accepted timestamp",
  );
  assert.equal(isLearningEvidence(state), true);
});
test("lesson exposure completes reading without demonstrating a skill and unlocks a lesson-gated quiz", async () => {
  const { exposureTasks, readingMinutes, taskCompletionDates, localDate } =
    await import("./learning-data");
  const at = new Date(2026, 9, 26, 10).valueOf();
  const today = localDate(new Date(at));
  const reading: LearningTask = {
    id: "ba:read:foundations:1",
    evidenceId: "foundations:1",
    title: "Lesson one",
    href: "/business-analyst/foundations#lesson-1",
    track: "ba",
    kind: "read",
    minutes: readingMinutes(3),
  };
  const quiz = { ...tasks[3], prerequisites: [reading.id] };
  const lessonTasks = [reading, quiz];
  assert.equal(readingMinutes(3), 10);
  assert.equal(readingMinutes(0), 5);
  assert.equal(readingMinutes(1000), 120);
  assert.ok(
    !dailyTasks(lessonTasks, { ...EMPTY_PLAN, goal: "ba" }, today).some(
      (task) => task.kind === "quiz",
    ),
  );
  const ba = { ...EMPTY_BA, read: { "foundations:1": at } };
  const exposure = exposureTasks(lessonTasks, progress, ba);
  assert.equal(demonstratedTasks(lessonTasks, progress, ba).size, 0);
  const dates = taskCompletionDates(lessonTasks, progress, ba);
  const assigned = dailyTasks(
    lessonTasks,
    { ...EMPTY_PLAN, goal: "ba", minutes: 30 },
    today,
    new Set(),
    dates,
    exposure,
  );
  assert.deepEqual(
    assigned.map((task) => task.id),
    [reading.id, quiz.id],
  );
  assert.equal(
    assigned.reduce((n, task) => n + task.minutes, 0),
    25,
  );
  assert.equal(
    dailyTasks(
      lessonTasks,
      { ...EMPTY_PLAN, goal: "ba" },
      "2026-10-27",
      new Set(),
      dates,
      exposure,
    )[0].id,
    quiz.id,
  );
});
test("due revision reserves budget after queue advancement and never counts a historical solve as a new review", async () => {
  const { afterAccepted } = await import("./practice-data");
  const { learningReviewTasks, taskCompletionDates, localDate } = await import(
    "./learning-data"
  );
  const now = new Date(2026, 9, 26, 12).valueOf();
  const today = localDate(new Date(now));
  const problem = { ...tasks[0], minutes: 30 };
  const plan = { ...EMPTY_PLAN, goal: "coding" as const, minutes: 30 as const };
  const initialQueue = {
    one: { step: 0, due: now - 1000, last: now - 86400000 },
  };
  const initial = [
    problem,
    { ...tasks[1], minutes: 30 },
    ...learningReviewTasks([problem], initialQueue),
  ];
  const oldProgress = { ...progress, solved: { one: now - 86400000 } };
  const priorDates = taskCompletionDates(initial, oldProgress, EMPTY_BA);
  assert.equal(priorDates["review:one"], undefined);
  const before = dailyTasks(
    initial,
    plan,
    today,
    demonstratedTasks(initial, oldProgress, EMPTY_BA),
    priorDates,
  );
  assert.deepEqual(
    before.map((task) => task.id),
    ["review:one"],
  );
  const nextQueue = afterAccepted(initialQueue, "one", now);
  assert.ok(nextQueue.one.due > now);
  const refreshed = [
    problem,
    { ...tasks[1], minutes: 30 },
    ...learningReviewTasks([problem], JSON.parse(JSON.stringify(nextQueue))),
  ];
  const nextProgress = { ...progress, solved: { one: now } };
  const nextDates = taskCompletionDates(refreshed, nextProgress, EMPTY_BA);
  assert.equal(nextDates["review:one"], today);
  assert.equal(
    nextDates.c1,
    undefined,
    "the accepted re-solve must not allocate both original solve and revision",
  );
  const after = dailyTasks(
    refreshed,
    plan,
    today,
    demonstratedTasks(refreshed, nextProgress, EMPTY_BA),
    nextDates,
  );
  assert.deepEqual(
    after.map((task) => task.id),
    ["review:one"],
  );
  assert.equal(
    after.reduce((n, task) => n + task.minutes, 0),
    30,
  );
  assert.ok(
    !dailyTasks(
      refreshed,
      plan,
      "2026-10-27",
      demonstratedTasks(refreshed, nextProgress, EMPTY_BA),
      nextDates,
    ).some((task) => task.kind === "review"),
  );
  const dueAgain = localDate(new Date(nextQueue.one.due));
  assert.ok(
    dailyTasks(
      refreshed,
      { ...plan, completed: { "review:one": today } },
      dueAgain,
      demonstratedTasks(refreshed, nextProgress, EMPTY_BA),
      nextDates,
    ).some((task) => task.kind === "review"),
  );
});
test("catalog reading tasks point to real individual lessons with source-based time estimates", async () => {
  const { learningCatalog } = await import("./learning-catalog");
  const { listBaChapters } = await import("./ba-content");
  const { getCourse } = await import("./content");
  const { readingMinutes } = await import("./learning-data");
  const catalog = learningCatalog();
  const baLessons = listBaChapters().flatMap((chapter) =>
    chapter.lessons.map((lesson) => ({ chapter, lesson })),
  );
  assert.equal(
    catalog.filter((task) => task.track === "ba" && task.kind === "read")
      .length,
    baLessons.length,
  );
  for (const { chapter, lesson } of baLessons) {
    const task = catalog.find(
      (task) => task.id === `ba:read:${chapter.id}:${lesson.n}`,
    );
    assert.ok(task);
    assert.equal(
      task.href,
      `/business-analyst/${chapter.id}#lesson-${lesson.n}`,
    );
    assert.equal(task.evidenceId, `${chapter.id}:${lesson.n}`);
    assert.equal(task.minutes, readingMinutes(lesson.minutes));
  }
  const patternLessons = getCourse().chapters.flatMap((chapter) =>
    chapter.items.filter((item) => item.type === "lesson"),
  );
  assert.equal(
    catalog.filter((task) => task.track === "coding" && task.kind === "read")
      .length,
    patternLessons.length,
  );
  assert.ok(
    catalog.some(
      (task) =>
        task.kind === "read" &&
        task.href.startsWith("/learn/") &&
        task.minutes >= 5,
    ),
  );
});
