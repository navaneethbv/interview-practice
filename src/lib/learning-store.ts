"use client";
import { useSyncExternalStore } from "react";
import { safeGet, safeSet } from "./storage";
import {
  BOOKMARKS_KEY,
  EMPTY_PLAN,
  isBookmarks,
  isMistakes,
  isPlanState,
  MISTAKES_KEY,
  parseLearning,
  PLAN_KEY,
  localDate,
  type Bookmark,
  type Mistake,
  EVIDENCE_KEY,
  isLearningEvidence,
  type LearningEvidence,
  beginIndependentAttempt,
  withLearningAssistance,
  withLearningAcceptance,
} from "./learning-data";

function store<T>(
  key: string,
  validate: (value: unknown) => value is T,
  empty: T,
) {
  let raw: string | null | undefined;
  let value = empty;
  const listeners = new Set<() => void>();
  const read = () => {
    const next = safeGet(key);
    if (next !== raw) {
      raw = next;
      value = parseLearning(next, validate, empty);
    }
    return value;
  };
  const write = (next: T) => {
    if (!validate(next)) return false;
    value = next;
    raw = JSON.stringify(next);
    const saved = safeSet(key, raw);
    listeners.forEach((listener) => listener());
    return saved;
  };
  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    const onStorage = (event: StorageEvent) => {
      if (event.key === key || event.key === null) {
        raw = undefined;
        listener();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  };
  return {
    read,
    write,
    use: () => useSyncExternalStore(subscribe, read, () => empty),
  };
}
export const learningPlan = store(PLAN_KEY, isPlanState, EMPTY_PLAN);
export const bookmarks = store<Bookmark[]>(BOOKMARKS_KEY, isBookmarks, []);
export const mistakes = store<Mistake[]>(MISTAKES_KEY, isMistakes, []);

const subscribeDay = (listener: () => void) => {
  const timer = window.setInterval(listener, 30000);
  return () => window.clearInterval(timer);
};
export function useLocalDay() {
  return useSyncExternalStore(
    subscribeDay,
    () => localDate(),
    () => "",
  );
}

const evidence = store<LearningEvidence>(EVIDENCE_KEY, isLearningEvidence, {});
export const useLearningEvidence = evidence.use;
/** Self declaration begins a fresh attempt; prior assistance never silently disappears. */
export function startIndependentAttempt(id: string) {
  return evidence.write(
    beginIndependentAttempt(evidence.read(), id, Date.now()),
  );
}
export function recordLearningAssistance(
  id: string,
  kind: "hint" | "solution",
) {
  return evidence.write(
    withLearningAssistance(evidence.read(), id, kind, Date.now()),
  );
}
export function recordLearningAcceptance(id: string) {
  return evidence.write(
    withLearningAcceptance(evidence.read(), id, Date.now()),
  );
}
