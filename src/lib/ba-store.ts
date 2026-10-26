"use client";

import { useSyncExternalStore } from "react";
import {
  BA_KEY,
  EMPTY_BA,
  parseBa,
  withAttempt,
  withNote,
  withPosition,
  withRead,
  type BaAttempt,
  type BaState,
} from "./ba-data";
import { safeGet, safeRemove, safeSet } from "./storage";

/**
 * Browser store for the Business Analyst course, using the same guarded localStorage
 * helpers as the rest of the site: reads never throw and failed writes are kept in memory.
 */
let cache: BaState | null = null;
let cachedRaw: string | null | undefined;
const listeners = new Set<() => void>();

function read(): BaState {
  const raw = safeGet(BA_KEY);
  if (cache === null || raw !== cachedRaw) {
    cache = parseBa(raw);
    cachedRaw = raw;
  }
  return cache;
}

function write(next: BaState) {
  cache = next;
  cachedRaw = JSON.stringify(next);
  safeSet(BA_KEY, cachedRaw);
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === BA_KEY || e.key === null) {
      cache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useBa(): BaState {
  return useSyncExternalStore(subscribe, read, () => EMPTY_BA);
}

const noop = () => () => {};
/** False during server rendering and hydration, true afterwards. */
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}

export const setLessonRead = (chapter: string, lesson: number, done: boolean) => write(withRead(read(), chapter, lesson, done));
export const recordAttempt = (id: string, attempt: BaAttempt) => write(withAttempt(read(), id, attempt));
export const saveNote = (chapter: string, text: string) => write(withNote(read(), chapter, text));
export const savePosition = (chapter: string, lesson: number) => {
  if (read().position[chapter] !== lesson) write(withPosition(read(), chapter, lesson));
};
export const finishTour = () => write({ ...read(), tourDone: Date.now() });

export function resetCourse() {
  cache = EMPTY_BA;
  cachedRaw = null;
  safeRemove(BA_KEY);
  listeners.forEach((l) => l());
}
