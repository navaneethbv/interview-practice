"use client";

import { useSyncExternalStore } from "react";
import type { CodeLang } from "./content-types";
import type { Verdict } from "./judge/types";

/**
 * Per-browser practice state kept in localStorage: solved/attempted problems, finished
 * lessons, saved code, submission history and editor preferences. Every access is guarded
 * so the site still works when storage is unavailable (private windows, blocked storage).
 */

export interface ProgressState {
  solved: Record<string, number>;
  attempted: Record<string, number>;
  read: Record<string, number>;
}

export interface Submission {
  at: number;
  lang: CodeLang;
  verdict: Verdict;
  passed: number;
  total: number;
  runtimeMs?: number;
  code: string;
}

export interface Prefs {
  lang: CodeLang;
  fontSize: number;
}

const KEY = "ip:progress:v1";
const PREFS_KEY = "ip:prefs:v1";
const EMPTY: ProgressState = { solved: {}, attempted: {}, read: {} };
const DEFAULT_PREFS: Prefs = { lang: "python", fontSize: 14 };

function safeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage full or blocked: progress simply isn't persisted.
  }
}

function safeRemove(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Storage blocked: nothing to remove.
  }
}

/* ---------------------------------------------------------------- progress store */

let progressCache: ProgressState | null = null;
const listeners = new Set<() => void>();

function readProgress(): ProgressState {
  if (progressCache) return progressCache;
  try {
    const parsed = JSON.parse(safeGet(KEY) ?? "null") as Partial<ProgressState> | null;
    progressCache = { ...EMPTY, ...(parsed ?? {}) };
  } catch {
    progressCache = EMPTY;
  }
  return progressCache;
}

function writeProgress(next: ProgressState) {
  progressCache = next;
  safeSet(KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      progressCache = null;
      cb();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(subscribe, readProgress, () => EMPTY);
}

export function markSolved(id: string) {
  const p = readProgress();
  writeProgress({ ...p, solved: { ...p.solved, [id]: p.solved[id] ?? Date.now() } });
}

export function markAttempted(id: string) {
  const p = readProgress();
  if (p.attempted[id]) return;
  writeProgress({ ...p, attempted: { ...p.attempted, [id]: Date.now() } });
}

export function setRead(id: string, read: boolean) {
  const p = readProgress();
  const next = { ...p.read };
  if (read) next[id] = Date.now();
  else delete next[id];
  writeProgress({ ...p, read: next });
}

export function statusOf(p: ProgressState, id: string): "solved" | "attempted" | "none" {
  if (p.solved[id]) return "solved";
  if (p.attempted[id]) return "attempted";
  return "none";
}

/* ---------------------------------------------------------------- code & submissions */

const codeKey = (id: string, lang: CodeLang) => `ip:code:${id}:${lang}`;
const subsKey = (id: string) => `ip:subs:${id}`;

export function loadCode(id: string, lang: CodeLang): string | null {
  return safeGet(codeKey(id, lang));
}

export function saveCode(id: string, lang: CodeLang, code: string) {
  safeSet(codeKey(id, lang), code);
}

export function clearCode(id: string, lang: CodeLang) {
  safeRemove(codeKey(id, lang));
}

export function loadSubmissions(id: string): Submission[] {
  try {
    const parsed = JSON.parse(safeGet(subsKey(id)) ?? "[]");
    return Array.isArray(parsed) ? (parsed as Submission[]) : [];
  } catch {
    return [];
  }
}

export function addSubmission(id: string, sub: Submission) {
  safeSet(subsKey(id), JSON.stringify([sub, ...loadSubmissions(id)].slice(0, 30)));
}

/* ---------------------------------------------------------------- prefs */

export function loadPrefs(): Prefs {
  try {
    return { ...DEFAULT_PREFS, ...(JSON.parse(safeGet(PREFS_KEY) ?? "{}") as Partial<Prefs>) };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePrefs(prefs: Partial<Prefs>) {
  safeSet(PREFS_KEY, JSON.stringify({ ...loadPrefs(), ...prefs }));
}
