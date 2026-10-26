"use client";
import { useSyncExternalStore } from "react";
import { safeGet, safeSet } from "./storage";
import {
  INTERVIEWS_KEY,
  EMPTY_INTERVIEWS,
  parseInterviews,
  expireInterview,
  type InterviewState,
} from "./interview-data";
let raw: string | null | undefined;
let cache = EMPTY_INTERVIEWS;
const listeners = new Set<() => void>();
function read() {
  const next = safeGet(INTERVIEWS_KEY);
  if (next !== raw) {
    raw = next;
    cache = parseInterviews(next);
  }
  return cache;
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  const change = (e: StorageEvent) => {
    if (e.key === INTERVIEWS_KEY || e.key === null) listener();
  };
  window.addEventListener("storage", change);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", change);
  };
}
export function useInterviews() {
  return useSyncExternalStore(subscribe, read, () => EMPTY_INTERVIEWS);
}
export function changeInterviews(
  update: (state: InterviewState) => InterviewState,
) {
  const next = update(expireInterview(read(), Date.now()));
  if (next === cache) return;
  cache = next;
  raw = JSON.stringify(next);
  safeSet(INTERVIEWS_KEY, raw);
  listeners.forEach((l) => l());
}
export function checkInterviewDeadline() {
  changeInterviews((s) => s);
}
