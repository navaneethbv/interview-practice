import type { BaState } from "./ba-data";
import type { ProgressState } from "./progress";
import type { MockState, ReviewState } from "./practice-data";

export const PLAN_KEY = "ip:learning-plan:v1";
export const BOOKMARKS_KEY = "ip:bookmarks:v1";
export const MISTAKES_KEY = "ip:mistakes:v1";
export const BUDGETS = [30, 60, 120] as const;
export type Goal = "coding" | "ba" | "mixed";

export interface PlanState {
  goal: Goal;
  minutes: 30 | 60 | 120;
  startDate: string;
  targetDate: string;
  completed: Record<string, string>;
  estimates: Record<string, number>;
}
export interface Bookmark {
  href: string;
  title: string;
  section: string;
}
export interface Mistake {
  id: string;
  question: string;
  href: string;
  mistaken: string;
  corrected: string;
  dueDate: string;
  resolved: boolean;
}
export const EMPTY_PLAN: PlanState = {
  goal: "mixed",
  minutes: 60,
  startDate: "",
  targetDate: "",
  completed: {},
  estimates: {},
};
const obj = (value: unknown): value is Record<string, unknown> =>
  !!value && typeof value === "object" && !Array.isArray(value);
const text = (value: unknown, max = 5000): value is string =>
  typeof value === "string" && value.length <= max;

export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function validDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return false;
  const date = new Date(`${value}T12:00:00`);
  return !Number.isNaN(date.valueOf()) && localDate(date) === value;
}
export function validHref(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^\/[a-zA-Z0-9/_#?=&.%-]*$/.test(value) &&
    !value.startsWith("//") &&
    value.length <= 1000
  );
}
export function isPlanState(value: unknown): value is PlanState {
  if (!obj(value)) return false;
  const validDates =
    (value.startDate === "" || validDate(value.startDate)) &&
    (value.targetDate === "" || validDate(value.targetDate)) &&
    !(
      value.startDate &&
      value.targetDate &&
      String(value.startDate) > String(value.targetDate)
    );
  const validCompletions =
    obj(value.completed) &&
    Object.keys(value.completed).length <= 10000 &&
    Object.entries(value.completed).every(
      ([key, date]) => text(key, 200) && validDate(date),
    );
  const validEstimates =
    obj(value.estimates) &&
    Object.keys(value.estimates).length <= 10000 &&
    Object.entries(value.estimates).every(
      ([key, minutes]) =>
        text(key, 200) &&
        typeof minutes === "number" &&
        Number.isInteger(minutes) &&
        minutes >= 5 &&
        minutes <= 120,
    );
  return (
    ["coding", "ba", "mixed"].includes(String(value.goal)) &&
    BUDGETS.includes(value.minutes as 30) &&
    validDates &&
    validCompletions &&
    validEstimates
  );
}
export function isBookmark(value: unknown): value is Bookmark {
  return (
    obj(value) &&
    validHref(value.href) &&
    text(value.title, 300) &&
    value.title.trim().length > 0 &&
    text(value.section, 100)
  );
}
export function isBookmarks(value: unknown): value is Bookmark[] {
  return (
    Array.isArray(value) &&
    value.length <= 2000 &&
    value.every(isBookmark) &&
    new Set(value.map((bookmark) => bookmark.href)).size === value.length
  );
}
export function isMistake(value: unknown): value is Mistake {
  return (
    obj(value) &&
    text(value.id, 100) &&
    value.id.length > 0 &&
    text(value.question, 1000) &&
    value.question.trim().length > 0 &&
    (value.href === "" || validHref(value.href)) &&
    text(value.mistaken) &&
    text(value.corrected) &&
    validDate(value.dueDate) &&
    typeof value.resolved === "boolean"
  );
}
export function isMistakes(value: unknown): value is Mistake[] {
  return (
    Array.isArray(value) &&
    value.length <= 2000 &&
    value.every(isMistake) &&
    new Set(value.map((mistake) => mistake.id)).size === value.length
  );
}
export function parseLearning<T>(
  raw: string | null,
  validate: (value: unknown) => value is T,
  fallback: T,
): T {
  try {
    const value: unknown = JSON.parse(raw ?? "null");
    return validate(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export interface LearningTask {
  id: string;
  title: string;
  href: string;
  track: "coding" | "ba";
  minutes: number;
  kind: "solve" | "read" | "quiz" | "review";
  evidenceId: string;
  prerequisite?: string;
  prerequisites?: string[];
  availableDate?: string;
  lastReviewedAt?: number;
}
/** Reserve today's completed work before assigning more tasks, including after evidence changes. */
export function dailyTasks(
  tasks: LearningTask[],
  plan: PlanState,
  today: string,
  demonstrated: ReadonlySet<string> = new Set(),
  evidenceDates: Readonly<Record<string, string>> = {},
  exposure: ReadonlySet<string> = new Set(),
): LearningTask[] {
  if (
    (plan.startDate && today < plan.startDate) ||
    (plan.targetDate && today > plan.targetDate)
  )
    return [];
  const withEstimate = (task: LearningTask) => ({
    ...task,
    minutes: plan.estimates[task.id] ?? task.minutes,
  });
  const completedToday = tasks
    .filter(
      (task) =>
        plan.completed[task.id] === today || evidenceDates[task.id] === today,
    )
    .map(withEstimate);
  const completedIds = new Set(completedToday.map((task) => task.id));
  const finished = new Set([...demonstrated, ...exposure]);
  const eligible = tasks.filter(
    (task) =>
      !completedIds.has(task.id) &&
      (plan.goal === "mixed" || task.track === plan.goal) &&
      (!task.prerequisite || finished.has(task.prerequisite)) &&
      (!task.prerequisites ||
        task.prerequisites.every((id) => finished.has(id))) &&
      (!task.availableDate || task.availableDate <= today) &&
      (task.kind === "review" || !plan.completed[task.id]) &&
      (task.kind === "review" || !finished.has(task.id)),
  );
  const reviews = eligible
    .filter((task) => task.kind === "review")
    .sort((a, b) =>
      (a.availableDate ?? "").localeCompare(b.availableDate ?? ""),
    );
  const coding = eligible.filter(
    (task) => task.track === "coding" && task.kind !== "review",
  );
  const ba = eligible.filter(
    (task) => task.track === "ba" && task.kind !== "review",
  );
  // Alternate the first track on small budgets so mixed plans do not starve BA work.
  const baFirst =
    Math.floor(Date.parse(`${today}T00:00:00Z`) / 86400000) % 2 === 0;
  const sorted = [
    ...reviews,
    ...(plan.goal === "mixed"
      ? interleave(baFirst ? ba : coding, baFirst ? coding : ba)
      : eligible.filter((task) => task.kind !== "review")),
  ];
  // A user may reduce the budget or do extra work outside this plan. Preserve that
  // history honestly, and assign no more work when it already fills the budget.
  let remaining = Math.max(
    0,
    plan.minutes - completedToday.reduce((sum, task) => sum + task.minutes, 0),
  );
  const remainingTasks = sorted.flatMap((task) => {
    const estimated = withEstimate(task);
    if (estimated.minutes > remaining) return [];
    remaining -= estimated.minutes;
    return [estimated];
  });
  return [...completedToday, ...remainingTasks];
}
/** Evidence uses local calendar dates, matching the plan rather than UTC boundaries. */
export function taskCompletionDates(
  tasks: LearningTask[],
  progress: ProgressState,
  ba: BaState,
): Record<string, string> {
  const dates: Record<string, string> = {};
  const reviewedDates = new Map(
    tasks
      .filter((task) => task.kind === "review" && task.lastReviewedAt)
      .map((task) => [
        task.evidenceId,
        localDate(new Date(task.lastReviewedAt!)),
      ]),
  );
  for (const task of tasks) {
    const timestamp = taskCompletionTimestamp(task, progress, ba);
    if (!timestamp) continue;
    const date = localDate(new Date(timestamp));
    // One accepted re-solve is one review session, not a second new-problem session.
    if (task.kind === "solve" && reviewedDates.get(task.evidenceId) === date)
      continue;
    dates[task.id] = date;
  }
  return dates;
}
function taskCompletionTimestamp(
  task: LearningTask,
  progress: ProgressState,
  ba: BaState,
): number | undefined {
  switch (task.kind) {
    case "solve":
      return progress.solved[task.evidenceId];
    case "review":
      return task.lastReviewedAt;
    case "read":
      if (task.track === "ba") return ba.read[task.evidenceId];
      return progress.read[task.evidenceId];
    case "quiz":
      return Math.max(
        0,
        ...(ba.quizzes[task.evidenceId] ?? [])
          .filter((attempt) => attempt.passed)
          .map((attempt) => attempt.at),
      );
  }
}
/** Reading checks record exposure; they never become demonstrated problem-solving evidence. */
export function exposureTasks(
  tasks: LearningTask[],
  progress: ProgressState,
  ba: BaState,
): Set<string> {
  return new Set(
    tasks
      .filter(
        (task) =>
          task.kind === "read" &&
          !!(task.track === "ba"
            ? ba.read[task.evidenceId]
            : progress.read[task.evidenceId]),
      )
      .map((task) => task.id),
  );
}
/** Includes five minutes for reflection after the source reading estimate. */
export function readingMinutes(sourceMinutes: number): number {
  return Math.min(
    120,
    Math.max(5, Math.ceil((Math.max(0, sourceMinutes) + 5) / 5) * 5),
  );
}
/** Keep future queue entries too: a review completed today must survive its due-date advance. */
export function learningReviewTasks(
  tasks: LearningTask[],
  review: ReviewState,
): LearningTask[] {
  const problems = new Map(
    tasks
      .filter((task) => task.kind === "solve")
      .map((task) => [task.evidenceId, task]),
  );
  return Object.entries(review).flatMap(([id, item]) => {
    const problem = problems.get(id);
    if (!problem) return [];
    return [
      {
        ...problem,
        id: `review:${id}`,
        title: `Re-solve: ${problem.title}`,
        kind: "review" as const,
        minutes: Math.min(30, problem.minutes),
        availableDate: localDate(new Date(item.due)),
        lastReviewedAt: item.step > 0 ? item.last : undefined,
      },
    ];
  });
}

function interleave<T>(first: T[], second: T[]): T[] {
  return Array.from(
    { length: Math.max(first.length, second.length) },
    (_, index) =>
      [first[index], second[index]].filter(
        (item): item is T => item !== undefined,
      ),
  ).flat();
}
export function demonstratedTasks(
  tasks: LearningTask[],
  progress: ProgressState,
  ba: BaState,
): Set<string> {
  return new Set(
    tasks
      .filter((task) => {
        if (task.kind === "solve") return !!progress.solved[task.evidenceId];
        if (task.kind === "quiz")
          return ba.quizzes[task.evidenceId]?.some((attempt) => attempt.passed);
        return false;
      })
      .map((task) => task.id),
  );
}
export function readinessEvidence(
  progress: ProgressState,
  ba: BaState,
  mock: MockState,
  codingIds: string[],
) {
  const quizAttempts = Object.values(ba.quizzes).flat();
  return {
    read: Object.keys(progress.read).length + Object.keys(ba.read).length,
    accepted: codingIds.filter((id) => !!progress.solved[id]).length,
    attempted: codingIds.filter((id) => !!progress.attempted[id]).length,
    quizPassed: Object.values(ba.quizzes).filter((attempts) =>
      attempts.some((attempt) => attempt.passed),
    ).length,
    quizAttempts: quizAttempts.length,
    completedMocks: mock.history.filter(
      (session) => session.endedAt !== undefined,
    ).length,
    mockSolves: mock.history.reduce(
      (total, session) => total + (session.solved?.length ?? 0),
      0,
    ),
    ratedMocks: mock.history.filter(
      (session) => session.ratings && Object.keys(session.ratings).length > 0,
    ).length,
  };
}

export const EVIDENCE_KEY = "ip:learning-evidence:v1";
export const EVIDENCE_ATTEMPT_LIMIT = 100;
export interface LearningAttempt {
  startedAt: number;
  declaredIndependent: boolean;
  hints: number;
  solutions: number;
  acceptedAt?: number;
}
export type LearningEvidence = Record<string, LearningAttempt[]>;
const timestamp = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0;
const count = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isInteger(value) &&
  value >= 0 &&
  value <= 1000000;
export function isLearningEvidence(value: unknown): value is LearningEvidence {
  return (
    obj(value) &&
    Object.keys(value).length <= 10000 &&
    Object.entries(value).every(
      ([id, attempts]) =>
        text(id, 200) &&
        id.length > 0 &&
        Array.isArray(attempts) &&
        attempts.length > 0 &&
        attempts.length <= EVIDENCE_ATTEMPT_LIMIT &&
        attempts.every(
          (attempt) =>
            obj(attempt) &&
            timestamp(attempt.startedAt) &&
            typeof attempt.declaredIndependent === "boolean" &&
            count(attempt.hints) &&
            count(attempt.solutions) &&
            (attempt.acceptedAt === undefined ||
              (timestamp(attempt.acceptedAt) &&
                attempt.acceptedAt >= attempt.startedAt)),
        ),
    )
  );
}
function currentAttempt(
  state: LearningEvidence,
  id: string,
  now: number,
): LearningAttempt {
  return (
    state[id]?.at(-1) ?? {
      startedAt: now,
      declaredIndependent: false,
      hints: 0,
      solutions: 0,
    }
  );
}
function replaceCurrent(
  state: LearningEvidence,
  id: string,
  attempt: LearningAttempt,
): LearningEvidence {
  const history = state[id] ?? [];
  return { ...state, [id]: [...history.slice(0, -1), attempt] };
}
export function beginIndependentAttempt(
  state: LearningEvidence,
  id: string,
  now: number,
): LearningEvidence {
  const attempt = {
    startedAt: now,
    declaredIndependent: true,
    hints: 0,
    solutions: 0,
  };
  return {
    ...state,
    [id]: [...(state[id] ?? []), attempt].slice(-EVIDENCE_ATTEMPT_LIMIT),
  };
}
export function withLearningAssistance(
  state: LearningEvidence,
  id: string,
  kind: "hint" | "solution",
  now: number,
): LearningEvidence {
  const current = currentAttempt(state, id, now);
  const key = kind === "hint" ? "hints" : "solutions";
  if (current.acceptedAt !== undefined) {
    // An accepted result is a historical snapshot. A later reveal begins another,
    // undeclared attempt; it cannot change what happened before that acceptance.
    const next: LearningAttempt = {
      startedAt: Math.max(now, current.acceptedAt),
      declaredIndependent: false,
      hints: current.hints,
      solutions: current.solutions,
    };
    next[key] = Math.min(next[key] + 1, 1000000);
    return {
      ...state,
      [id]: [...state[id], next].slice(-EVIDENCE_ATTEMPT_LIMIT),
    };
  }
  return replaceCurrent(state, id, {
    ...current,
    [key]: Math.min(current[key] + 1, 1000000),
  });
}
export function withLearningAcceptance(
  state: LearningEvidence,
  id: string,
  now: number,
): LearningEvidence {
  const attempt = currentAttempt(state, id, now);
  // Repeated accepted events without a new attempt must not rewrite its first result.
  if (attempt.acceptedAt !== undefined) return state;
  return replaceCurrent(state, id, {
    ...attempt,
    acceptedAt: Math.max(attempt.startedAt, now),
  });
}
export function learningEvidenceSummary(
  state: LearningEvidence,
  acceptedIds: string[],
) {
  const summary = { independent: 0, hints: 0, solutions: 0, unknown: 0 };
  for (const id of acceptedIds) {
    const accepted = (state[id] ?? []).filter(
      (attempt) => attempt.acceptedAt !== undefined,
    );
    if (
      accepted.some(
        (attempt) =>
          attempt.declaredIndependent &&
          attempt.hints === 0 &&
          attempt.solutions === 0,
      )
    )
      summary.independent++;
    else if (accepted.some((attempt) => attempt.solutions > 0))
      summary.solutions++;
    else if (accepted.some((attempt) => attempt.hints > 0)) summary.hints++;
    else summary.unknown++;
  }
  return summary;
}
