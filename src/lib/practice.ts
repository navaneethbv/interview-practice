"use client";

import { useSyncExternalStore } from "react";
import {
  afterAccepted,
  EMPTY_MOCK,
  endSession,
  expireSession,
  markHard,
  MOCK_KEY,
  parseMock,
  parseReview,
  removeReview,
  REVIEW_KEY,
  type MockSession,
  type MockState,
  type ReviewState,
} from "./practice-data";
import { safeGet, safeSet } from "./storage";

/**
 * Browser store for the review queue and mock interviews, following the same guarded
 * localStorage pattern as progress.ts: reads never throw and failed writes are retried
 * through the storage layer.
 */
function createStore<T>(key: string, parse: (raw: string | null) => T, empty: T) {
  let cache: T | null = null;
  let cachedRaw: string | null | undefined;
  const listeners = new Set<() => void>();
  const read = () => {
    const raw = safeGet(key);
    if (cache === null || raw !== cachedRaw) {
      cache = parse(raw);
      cachedRaw = raw;
    }
    return cache;
  };
  const write = (next: T) => {
    cache = next;
    cachedRaw = JSON.stringify(next);
    safeSet(key, cachedRaw);
    listeners.forEach((l) => l());
  };
  const subscribe = (cb: () => void) => {
    listeners.add(cb);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key || e.key === null) {
        cache = null;
        cb();
      }
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(cb);
      window.removeEventListener("storage", onStorage);
    };
  };
  const use = () => useSyncExternalStore(subscribe, read, () => empty);
  return { read, write, use };
}

const EMPTY_REVIEW: ReviewState = {};
const review = createStore(REVIEW_KEY, parseReview, EMPTY_REVIEW);
const mock = createStore(MOCK_KEY, parseMock, EMPTY_MOCK);

export const useReview = review.use;
export const useMock = mock.use;

export function reviewAccepted(id: string) {
  review.write(afterAccepted(review.read(), id, Date.now()));
}
export function reviewHard(id: string) {
  review.write(markHard(review.read(), id, Date.now()));
}
export function reviewRemove(id: string) {
  review.write(removeReview(review.read(), id));
}

export function startMock(session: Omit<MockSession, "startedAt">) {
  const state = mock.read();
  mock.write({ ...state, active: { ...session, startedAt: Date.now() } });
}

export function finishMock(log: Record<string, [number, 0 | 1][]>) {
  mock.write(endSession(mock.read(), log, Date.now()));
}

export function expireMock(log: Record<string, [number, 0 | 1][]>) {
  const state = mock.read();
  const next = expireSession(state, log, Date.now());
  if (next !== state) mock.write(next);
}

/** Saves self-ratings and notes on the most recent finished session. */
export function rateLastMock(ratings: Record<string, number>, notes: string) {
  const state: MockState = mock.read();
  const [last, ...rest] = state.history;
  if (!last) return;
  mock.write({ ...state, history: [{ ...last, ratings, notes: notes.slice(0, 5000) }, ...rest] });
}
