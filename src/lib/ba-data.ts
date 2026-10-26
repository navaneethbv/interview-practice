/**
 * Pure logic for the Business Analyst prep course: quiz drawing and grading, chapter
 * locking, and validation of the stored state. Kept free of React and storage so it can
 * be unit tested.
 */

export const BA_KEY = "ip:ba:v1";
export const FINAL_ID = "final";

/** A question as authored. The first option is always the correct answer. */
export interface BaQuestion {
  id: string;
  /** 1-based index of the lesson (## heading) the question tests. */
  lesson: number;
  q: string;
  options: string[];
  why: string;
}

/** A question as shown in one attempt, with shuffled choices. */
export interface PresentedQuestion {
  id: string;
  lesson: number;
  chapter?: string;
  q: string;
  choices: string[];
  correct: number;
  why: string;
}

export interface BaAttempt {
  at: number;
  score: number;
  total: number;
  passed: boolean;
  /** Question ids shown, so the next attempt can prefer different ones. */
  ids: string[];
}

export interface BaState {
  /** Lesson ids (`chapter:n`) marked as read, with the time. */
  read: Record<string, number>;
  /** Attempts per chapter id (or "final"), newest last. */
  quizzes: Record<string, BaAttempt[]>;
  /** Private notes per chapter. */
  notes: Record<string, string>;
  /** Last lesson opened per chapter (1-based). */
  position: Record<string, number>;
  /** When the welcome tour was completed or dismissed. */
  tourDone?: number;
}

export const EMPTY_BA: BaState = { read: {}, quizzes: {}, notes: {}, position: {} };
const ATTEMPT_LIMIT = 20;
const NOTE_LIMIT = 20000;

export type Random = () => number;

export const lessonKey = (chapter: string, lesson: number) => `${chapter}:${lesson}`;

/** Fisher–Yates shuffle returning a new array. */
export function shuffle<T>(items: readonly T[], random: Random = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function present(question: BaQuestion, random: Random = Math.random, chapter?: string): PresentedQuestion {
  const order = shuffle(question.options.map((_, i) => i), random);
  return {
    id: question.id,
    lesson: question.lesson,
    chapter,
    q: question.q,
    choices: order.map((i) => question.options[i]),
    correct: order.indexOf(0),
    why: question.why,
  };
}

/**
 * Picks `size` questions spread across groups (lessons or chapters) so every topic is
 * tested, preferring questions that were not shown in `recent`. Order is randomized.
 */
export function drawBalanced<T extends { id: string }>(
  groups: T[][],
  size: number,
  recent: ReadonlySet<string> = new Set(),
  random: Random = Math.random,
): T[] {
  // Within each group, unseen questions come first, each part shuffled.
  const queues = shuffle(
    groups
      .filter((g) => g.length)
      .map((g) => [...shuffle(g.filter((q) => !recent.has(q.id)), random), ...shuffle(g.filter((q) => recent.has(q.id)), random)]),
    random,
  );
  const picked: T[] = [];
  // Round-robin over groups, taking unseen questions first in every round.
  while (picked.length < size && queues.some((q) => q.length)) {
    for (const queue of queues) {
      if (picked.length >= size) break;
      const next = queue.shift();
      if (next) picked.push(next);
    }
  }
  return shuffle(picked, random);
}

/** Draws a chapter quiz: balanced across the chapter's lessons. */
export function drawChapterQuiz(bank: BaQuestion[], size: number, recent: ReadonlySet<string>, random: Random = Math.random) {
  const byLesson = new Map<number, BaQuestion[]>();
  for (const q of bank) byLesson.set(q.lesson, [...(byLesson.get(q.lesson) ?? []), q]);
  return drawBalanced([...byLesson.values()], size, recent, random).map((q) => present(q, random));
}

/** Draws the final exam: balanced across every chapter's bank. */
export function drawFinalExam(banks: { chapter: string; questions: BaQuestion[] }[], size: number, recent: ReadonlySet<string>, random: Random = Math.random) {
  const tagged = banks.map((b) => b.questions.map((q) => ({ ...q, chapter: b.chapter })));
  return drawBalanced(tagged, size, recent, random).map((q) => present(q, random, q.chapter));
}

export function scoreAnswers(questions: PresentedQuestion[], answers: (number | null)[]) {
  const correct = questions.reduce((sum, q, i) => sum + Number(answers[i] === q.correct), 0);
  return { correct, total: questions.length, percent: questions.length ? Math.round((correct / questions.length) * 100) : 0 };
}

/** Passing needs at least `passPercent` of the questions, rounded up to whole questions. */
export function passMark(total: number, passPercent: number) {
  return Math.ceil((total * passPercent) / 100);
}

export function hasPassed(state: BaState, id: string) {
  return (state.quizzes[id] ?? []).some((a) => a.passed);
}

export function bestScore(state: BaState, id: string): BaAttempt | null {
  let best: BaAttempt | null = null;
  for (const a of state.quizzes[id] ?? []) if (!best || a.score / a.total > best.score / best.total) best = a;
  return best;
}

export function lessonsRead(state: BaState, chapter: string, lessons: number) {
  let n = 0;
  for (let i = 1; i <= lessons; i++) if (state.read[lessonKey(chapter, i)]) n++;
  return n;
}

export function hasTaken(state: BaState, id: string) {
  return (state.quizzes[id]?.length ?? 0) > 0;
}

/** "taken" means the quiz was attempted but not passed yet; every chapter stays open either way. */
export type ChapterStatus = "open" | "taken" | "passed";

export function chapterStatuses(state: BaState, chapterIds: string[]): ChapterStatus[] {
  return chapterIds.map((id) => {
    if (hasPassed(state, id)) return "passed";
    return hasTaken(state, id) ? "taken" : "open";
  });
}

/** The final exam opens once every chapter quiz has been taken, passed or not. */
export function finalUnlocked(state: BaState, chapterIds: string[]) {
  return chapterIds.every((id) => hasTaken(state, id));
}

/* ------------------------------------------------------------ state updates */

export function withRead(state: BaState, chapter: string, lesson: number, read: boolean, now = Date.now()): BaState {
  const next = { ...state.read };
  const key = lessonKey(chapter, lesson);
  if (read) next[key] = next[key] ?? now;
  else delete next[key];
  return { ...state, read: next };
}

export function withAttempt(state: BaState, id: string, attempt: BaAttempt): BaState {
  const list = [...(state.quizzes[id] ?? []), attempt].slice(-ATTEMPT_LIMIT);
  return { ...state, quizzes: { ...state.quizzes, [id]: list } };
}

export function withNote(state: BaState, chapter: string, text: string): BaState {
  const notes = { ...state.notes };
  if (text) notes[chapter] = text.slice(0, NOTE_LIMIT);
  else delete notes[chapter];
  return { ...state, notes };
}

export function withPosition(state: BaState, chapter: string, lesson: number): BaState {
  return { ...state, position: { ...state.position, [chapter]: lesson } };
}

/* ------------------------------------------------------------ validation */

const ID = /^[a-z0-9-]+$/;
const LESSON_KEY = /^[a-z0-9-]+:\d{1,3}$/;
const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const isTime = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v) && v >= 0;

function isAttempt(v: unknown): v is BaAttempt {
  return isObj(v)
    && isTime(v.at)
    && Number.isInteger(v.score) && Number.isInteger(v.total)
    && (v.score as number) >= 0 && (v.total as number) > 0 && (v.score as number) <= (v.total as number)
    && typeof v.passed === "boolean"
    && Array.isArray(v.ids) && v.ids.length <= 100 && v.ids.every((id) => typeof id === "string" && id.length <= 80);
}

/** Strict check used for backups: every field must be well formed. */
export function isBaState(v: unknown): v is BaState {
  if (!isObj(v)) return false;
  const allowed = new Set(["read", "quizzes", "notes", "position", "tourDone"]);
  if (!Object.keys(v).every((k) => allowed.has(k))) return false;
  if (!isObj(v.read) || !Object.entries(v.read).every(([k, t]) => LESSON_KEY.test(k) && isTime(t))) return false;
  if (!isObj(v.quizzes) || !Object.entries(v.quizzes).every(([k, list]) =>
    ID.test(k) && Array.isArray(list) && list.length <= ATTEMPT_LIMIT && list.every(isAttempt))) return false;
  if (!isObj(v.notes) || !Object.entries(v.notes).every(([k, n]) => ID.test(k) && typeof n === "string" && n.length <= NOTE_LIMIT)) return false;
  if (!isObj(v.position) || !Object.entries(v.position).every(([k, n]) => ID.test(k) && Number.isInteger(n) && (n as number) >= 1 && (n as number) < 1000)) return false;
  return v.tourDone === undefined || isTime(v.tourDone);
}

/** Lenient parse for reading storage: keeps every well-formed field and drops the rest. */
export function parseBa(raw: string | null): BaState {
  if (!raw) return EMPTY_BA;
  let value: unknown;
  try { value = JSON.parse(raw); } catch { return EMPTY_BA; }
  if (isBaState(value)) return value;
  if (!isObj(value)) return EMPTY_BA;
  const pick = <K extends keyof BaState>(field: K, fallback: BaState[K]) => {
    const candidate = { ...EMPTY_BA, [field]: value[field] };
    return isBaState(candidate) ? (candidate[field] as BaState[K]) : fallback;
  };
  return {
    read: pick("read", {}),
    quizzes: pick("quizzes", {}),
    notes: pick("notes", {}),
    position: pick("position", {}),
    tourDone: pick("tourDone", undefined),
  };
}
