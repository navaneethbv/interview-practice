import { isRecord } from "./progress-data";

/**
 * Pure state for practice modes, kept separate from the storage layer so it can be validated
 * on backup import and unit tested.
 *
 * Review queue: each accepted problem is scheduled for a re-solve after 1, 3, 7, 21 and then
 * every 60 days. Solving a due problem advances it; marking it hard starts it over.
 *
 * Mock interviews: a timed session with problems drawn from a list. Problems count as solved
 * when an accepted submission lands while the session is running.
 */

export const REVIEW_KEY = "ip:review:v1";
export const MOCK_KEY = "ip:mock:v1";
export const DAY_MS = 24 * 60 * 60 * 1000;
export const REVIEW_INTERVALS_DAYS = [1, 3, 7, 21, 60];
export const MOCK_HISTORY_LIMIT = 20;
export const RUBRIC = ["Problem solving", "Coding", "Testing", "Communication"] as const;

export interface ReviewItem {
  /** Index into REVIEW_INTERVALS_DAYS of the interval that produced `due`. */
  step: number;
  due: number;
  /** Last time the problem was solved while due (or first scheduled). */
  last: number;
}
export type ReviewState = Record<string, ReviewItem>;

const finite = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value) && value >= 0;
const stepOk = (value: unknown) => Number.isInteger(value) && (value as number) >= 0 && (value as number) < REVIEW_INTERVALS_DAYS.length;

export function isReviewItem(value: unknown): value is ReviewItem {
  return isRecord(value) && stepOk(value.step) && finite(value.due) && finite(value.last)
    && Object.keys(value).every((k) => k === "step" || k === "due" || k === "last");
}

export function parseReview(raw: string | null): ReviewState {
  try {
    const value: unknown = JSON.parse(raw ?? "null");
    if (!isRecord(value)) return {};
    return Object.fromEntries(Object.entries(value).filter(([, item]) => isReviewItem(item))) as ReviewState;
  } catch {
    return {};
  }
}

export function isReviewState(value: unknown): value is ReviewState {
  return isRecord(value) && Object.values(value).every(isReviewItem);
}

/** Updates the schedule after an accepted submission. Early re-solves leave the schedule alone. */
export function afterAccepted(state: ReviewState, id: string, now: number): ReviewState {
  const item = state[id];
  if (!item) return { ...state, [id]: { step: 0, due: now + REVIEW_INTERVALS_DAYS[0] * DAY_MS, last: now } };
  if (item.due > now) return state;
  const step = Math.min(item.step + 1, REVIEW_INTERVALS_DAYS.length - 1);
  return { ...state, [id]: { step, due: now + REVIEW_INTERVALS_DAYS[step] * DAY_MS, last: now } };
}

/** The problem felt hard: start its schedule over from the first interval. */
export function markHard(state: ReviewState, id: string, now: number): ReviewState {
  return { ...state, [id]: { step: 0, due: now + REVIEW_INTERVALS_DAYS[0] * DAY_MS, last: state[id]?.last ?? now } };
}

export function removeReview(state: ReviewState, id: string): ReviewState {
  const next = { ...state };
  delete next[id];
  return next;
}

export function dueReviews(state: ReviewState, now: number): [string, ReviewItem][] {
  return Object.entries(state).filter(([, item]) => item.due <= now).sort((a, b) => a[1].due - b[1].due);
}

export function upcomingReviews(state: ReviewState, now: number): [string, ReviewItem][] {
  return Object.entries(state).filter(([, item]) => item.due > now).sort((a, b) => a[1].due - b[1].due);
}

/* ---------------------------------------------------------------- mock interviews */

export interface MockSession {
  startedAt: number;
  minutes: number;
  /** Where the problems came from: a problem set id or "course". */
  source: string;
  problems: string[];
  endedAt?: number;
  /** Problems with an accepted submission during the session, filled when it ends. */
  solved?: string[];
  /** Self-ratings from 1 (needs work) to 4 (strong), keyed by RUBRIC entry. */
  ratings?: Record<string, number>;
  notes?: string;
}

export interface MockState {
  active: MockSession | null;
  history: MockSession[];
}

export const EMPTY_MOCK: MockState = { active: null, history: [] };

const MOCK_FIELDS = new Set(["startedAt", "minutes", "source", "problems", "endedAt", "solved", "ratings", "notes"]);

export function isMockSession(value: unknown): value is MockSession {
  if (!isRecord(value) || !Object.keys(value).every((k) => MOCK_FIELDS.has(k))) return false;
  const ids = (v: unknown): v is string[] => Array.isArray(v) && v.length <= 10
    && v.every((x) => typeof x === "string" && x.length > 0) && new Set(v).size === v.length;
  return finite(value.startedAt) && Number.isInteger(value.minutes) && (value.minutes as number) > 0 && (value.minutes as number) <= 240
    && typeof value.source === "string" && ids(value.problems) && value.problems.length > 0
    && (value.endedAt === undefined || (finite(value.endedAt) && value.endedAt >= value.startedAt
      && value.endedAt <= value.startedAt + (value.minutes as number) * 60_000))
    && (value.solved === undefined || (ids(value.solved) && value.solved.every((id) => (value.problems as string[]).includes(id))))
    && (value.ratings === undefined || validRatings(value.ratings))
    && (value.notes === undefined || (typeof value.notes === "string" && value.notes.length <= 5000));
}

function validRatings(value: unknown): boolean {
  const signals: readonly string[] = RUBRIC;
  return isRecord(value) && Object.entries(value).every(([key, rating]) =>
    signals.includes(key) && Number.isInteger(rating) && (rating as number) >= 1 && (rating as number) <= 4);
}

export function isMockState(value: unknown): value is MockState {
  return isRecord(value) && Object.keys(value).every((k) => k === "active" || k === "history")
    && (value.active === null || isMockSession(value.active))
    && Array.isArray(value.history) && value.history.length <= MOCK_HISTORY_LIMIT && value.history.every(isMockSession);
}

export function parseMock(raw: string | null): MockState {
  try {
    const value: unknown = JSON.parse(raw ?? "null");
    return isMockState(value) ? value : EMPTY_MOCK;
  } catch {
    return EMPTY_MOCK;
  }
}

export interface Candidate {
  id: string;
  difficulty: "easy" | "medium" | "hard";
}

/**
 * Picks `count` distinct problems, preferring ones not yet solved; falls back to solved ones
 * when a list has too few unsolved problems left.
 */
export function pickProblems(candidates: Candidate[], solved: (id: string) => boolean, count: number, random: () => number): string[] {
  const shuffle = <T,>(items: T[]) => {
    const out = [...items];
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  };
  const unique = [...new Map(candidates.map((candidate) => [candidate.id, candidate])).values()];
  const fresh = shuffle(unique.filter((c) => !solved(c.id)));
  const seen = shuffle(unique.filter((c) => solved(c.id)));
  return [...fresh, ...seen].slice(0, count).map((c) => c.id);
}

/** Prefer medium questions, then fill from the remaining pool even for single-difficulty lists. */
export function pickInterviewMix(candidates: Candidate[], solved: (id: string) => boolean, count: number, random: () => number): string[] {
  const medium = pickProblems(candidates.filter((c) => c.difficulty === "medium"), solved, Math.max(1, count - 1), random);
  const other = pickProblems(candidates.filter((c) => c.difficulty !== "medium"), solved, count - medium.length, random);
  const selected = new Set([...medium, ...other]);
  return [...selected, ...pickProblems(candidates.filter((c) => !selected.has(c.id)), solved, count - selected.size, random)];
}

/** Finish overdue sessions at their deadline, including after a suspended tab resumes. */
export function expireSession(state: MockState, log: Record<string, [number, 0 | 1][]>, now: number): MockState {
  return state.active && now >= sessionDeadline(state.active) ? endSession(state, log, now) : state;
}

export function sessionDeadline(session: MockSession) {
  return session.startedAt + session.minutes * 60_000;
}

/** Ids accepted between the start of the session and its end (or deadline). */
export function solvedDuring(session: MockSession, log: Record<string, [number, 0 | 1][]>): string[] {
  const end = session.endedAt ?? sessionDeadline(session);
  return session.problems.filter((id) => (log[id] ?? []).some(([at, ok]) => ok === 1 && at >= session.startedAt && at <= end));
}

export function endSession(state: MockState, log: Record<string, [number, 0 | 1][]>, now: number): MockState {
  if (!state.active) return state;
  const endedAt = Math.min(now, sessionDeadline(state.active));
  const done: MockSession = { ...state.active, endedAt };
  done.solved = solvedDuring(done, log);
  return { active: null, history: [done, ...state.history].slice(0, MOCK_HISTORY_LIMIT) };
}

/** Normalizes a complexity like "O( N · log N )" for comparison: lowercase, no spaces or multiplication signs. */
export function normalizeComplexity(value: string) {
  return value
    .toLowerCase()
    .replaceAll(/\s+/g, "")
    .replaceAll(/[*·×]/g, "")
    .replaceAll("²", "^2")
    .replace(/^o\((.*)\)$/, "$1")
    .replaceAll(/[()]/g, "");
}
