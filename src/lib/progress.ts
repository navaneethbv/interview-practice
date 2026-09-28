"use client";

import { useSyncExternalStore } from "react";
import type { CodeLang } from "./content-types";
import type { Verdict } from "./judge/types";

/**
 * Per-browser practice state kept in localStorage: solved/attempted problems, finished
 * lessons, saved code, submission history and editor preferences. Every access is guarded
 * so the site still works when storage is unavailable (private windows, blocked storage).
 *
 * Problem lists can be reset independently: a reset stores a timestamp for the list's scope,
 * and the list only counts submissions made after it. Other lists sharing a problem keep
 * their progress.
 */

/** A judged submission: [timestamp, accepted ? 1 : 0]. */
export type LogEntry = [number, 0 | 1];

export interface ProgressState {
  solved: Record<string, number>;
  attempted: Record<string, number>;
  read: Record<string, number>;
  /** Recent submissions per problem, newest last, used for status and accuracy. */
  log: Record<string, LogEntry[]>;
  /** Reset time per scope (a problem set id, or the course). */
  resets: Record<string, number>;
  /** Lifetime [submissions, accepted] counts, independent of the bounded event log. */
  totals?: Record<string, [number, number]>;
  /** Cumulative counts at each list's reset. */
  baselines?: Record<string, Record<string, [number, number]>>;
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
const EMPTY: ProgressState = { solved: {}, attempted: {}, read: {}, log: {}, resets: {} };
const LOG_LIMIT = 100;
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
    progressCache = Object.assign({}, EMPTY, parsed);
    // Migrate old first-attempt timestamps and reconstruct reset baselines while the
    // legacy event history is still present. Already discarded events cannot be recovered.
    const p = progressCache;
    p.solved = { ...p.solved };
    p.attempted = { ...p.attempted };
    p.baselines = { ...p.baselines };
    for (const [id, log] of Object.entries(p.log)) {
      for (const [at, ok] of log) {
        p.attempted[id] = Math.max(p.attempted[id] ?? 0, at);
        if (ok) p.solved[id] = Math.max(p.solved[id] ?? 0, at);
      }
      for (const [scope, since] of Object.entries(p.resets)) {
        if (p.baselines[scope]?.[id]) continue;
        const recent = log.filter(([at]) => at > since);
        const total = totalOf(p, id);
        p.baselines[scope] = { ...p.baselines[scope], [id]: [total[0] - recent.length, total[1] - recent.reduce((sum, [, ok]) => sum + ok, 0)] };
      }
    }
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

/** Records a judged submission and updates the problem's solved/attempted state. */
export function recordSubmission(id: string, accepted: boolean) {
  const p = readProgress();
  const now = Math.max(Date.now(), (p.attempted[id] ?? 0) + 1, ...Object.values(p.resets).map((at) => at + 1));
  const [submissions, successes] = totalOf(p, id);
  const log = [...(p.log[id] ?? []), [now, accepted ? 1 : 0] as LogEntry].slice(-LOG_LIMIT);
  writeProgress({
    ...p,
    log: { ...p.log, [id]: log },
    totals: { ...p.totals, [id]: [submissions + 1, successes + Number(accepted)] },
    solved: accepted ? { ...p.solved, [id]: now } : p.solved,
    attempted: { ...p.attempted, [id]: now },
  });
}

export function setRead(id: string, read: boolean) {
  const p = readProgress();
  const next = { ...p.read };
  if (read) next[id] = Date.now();
  else delete next[id];
  writeProgress({ ...p, read: next });
}

export type Status = "solved" | "attempted" | "none";

/** A problem's status, counting only submissions after the scope's last reset. */
export function statusOf(p: ProgressState, id: string, scope?: string): Status {
  const since = scope ? (p.resets[scope] ?? 0) : 0;
  if (!since) {
    if (p.solved[id]) return "solved";
    if (p.attempted[id]) return "attempted";
    return "none";
  }
  const recent = (p.log[id] ?? []).filter(([at]) => at > since);
  if ((p.solved[id] ?? 0) > since || recent.some(([, ok]) => ok)) return "solved";
  return (p.attempted[id] ?? 0) > since || recent.length ? "attempted" : "none";
}

export function totalOf(p: ProgressState, id: string): [number, number] {
  return p.totals?.[id] ?? [p.log[id]?.length ?? 0, (p.log[id] ?? []).reduce((sum, [, ok]) => sum + ok, 0)];
}

export interface ScopeSummary {
  solved: number;
  attempted: number;
  /** Submissions and accepted submissions since the scope's last reset. */
  submissions: number;
  accepted: number;
}

export function summarize(p: ProgressState, ids: string[], scope: string): ScopeSummary {
  const since = p.resets[scope] ?? 0;
  const out: ScopeSummary = { solved: 0, attempted: 0, submissions: 0, accepted: 0 };
  for (const id of ids) {
    const s = statusOf(p, id, scope);
    if (s === "solved") out.solved++;
    else if (s === "attempted") out.attempted++;
    const baseline = p.baselines?.[scope]?.[id];
    if (!since || baseline) {
      const total = totalOf(p, id);
      out.submissions += total[0] - (baseline?.[0] ?? 0);
      out.accepted += total[1] - (baseline?.[1] ?? 0);
    } else {
      // Legacy resets have no cumulative snapshot; retain their recorded events.
      for (const [at, ok] of p.log[id] ?? []) {
        if (at <= since) continue;
        out.submissions++;
        out.accepted += ok;
      }
    }
  }
  return out;
}

/**
 * Starts a scope over: its problems show as unsolved and its accuracy restarts from zero.
 * Optionally clears the saved code of those problems so they open with the starter code.
 */
export function resetScope(scope: string, ids: string[], clearSavedCode: boolean) {
  const p = readProgress();
  if (clearSavedCode) {
    for (const id of ids) for (const lang of LANGS) clearCode(id, lang);
  }
  const at = Math.max(Date.now(), ...Object.values(p.attempted), ...Object.values(p.resets));
  writeProgress({
    ...p,
    resets: { ...p.resets, [scope]: at },
    baselines: { ...p.baselines, [scope]: Object.fromEntries(ids.map((id) => [id, totalOf(p, id)])) },
  });
}

/* ---------------------------------------------------------------- code & submissions */

const LANGS: CodeLang[] = ["python", "java", "sql"];
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
