"use client";
import { useMemo, useSyncExternalStore } from "react";
import { safeGet, safeSet } from "./storage";
import {
  LABS_KEY,
  isLabState,
  parseLabState,
  type LabAttempt,
} from "./lab-state";
const EVENT = "ip:labs-changed";
function subscribe(fn: () => void) {
  window.addEventListener(EVENT, fn);
  window.addEventListener("storage", fn);
  return () => {
    window.removeEventListener(EVENT, fn);
    window.removeEventListener("storage", fn);
  };
}
export function useLabState() {
  const raw = useSyncExternalStore(
    subscribe,
    () => safeGet(LABS_KEY),
    () => null,
  );
  return useMemo(() => parseLabState(raw), [raw]);
}
export function saveLabAttempt(id: string, attempt: LabAttempt) {
  const state = parseLabState(safeGet(LABS_KEY));
  state[id] = { ...attempt, draft: attempt.draft.slice(0, 50000) };
  // Imported drafts may already fill the bounded store. Refuse the new record
  // rather than persist a state whose next read would discard every draft.
  if (!isLabState(state)) return false;
  const saved = safeSet(LABS_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(EVENT));
  return saved;
}
