import type { LogEntry, ProgressState, Submission } from "./progress";
import { normalizeProgress, parseSubmissions } from "./progress-data";

/**
 * Three-way merge of practice entries for automatic sync. `base` describes the copy
 * this browser and the cloud last agreed on (empty on first sync). It keeps only a
 * fingerprint per key, plus the progress record whose counters need the old values,
 * so it does not double this site's use of the browser's storage quota. A key changed on one
 * side only takes that side, including deletions. A key changed on both sides is
 * combined when its records can be (progress and submission history); otherwise the
 * local edit wins, because it is the one the person in front of this browser made.
 */
export type Entries = Record<string, string>;
export interface SyncBase {
  fingerprints: Record<string, string>;
  progress?: string;
}

const PROGRESS_KEY = "ip:progress:v1";
const HISTORY_KEY = /^ip:subs:(?:lc:)?[a-zA-Z0-9_-]+$/;
const HISTORY_LIMIT = 30;
const LOG_LIMIT = 100;

function parse(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Per-id three-way merge of a record. `combine` resolves ids present on both sides. */
function mergeRecord<T>(
  base: Record<string, T> | undefined,
  local: Record<string, T> | undefined,
  cloud: Record<string, T> | undefined,
  combine: (local: T, cloud: T, base: T | undefined, id: string) => T,
): Record<string, T> {
  const b = base ?? {};
  const l = local ?? {};
  const c = cloud ?? {};
  const unchanged = (side: Record<string, T>, id: string) =>
    Object.hasOwn(b, id) && JSON.stringify(side[id]) === JSON.stringify(b[id]);
  const out: Record<string, T> = {};
  for (const id of new Set([...Object.keys(l), ...Object.keys(c)])) {
    const inL = Object.hasOwn(l, id);
    const inC = Object.hasOwn(c, id);
    if (inL && inC) out[id] = combine(l[id], c[id], b[id], id);
    // Present on one side only: the other side deleted it, which wins if this side is unchanged.
    else if (inL && !unchanged(l, id)) out[id] = l[id];
    else if (inC && !unchanged(c, id)) out[id] = c[id];
  }
  return out;
}

const latest = (a: number, b: number) => Math.max(a, b);

function mergeLog(local: LogEntry[], cloud: LogEntry[]): LogEntry[] {
  const seen = new Map<string, LogEntry>();
  for (const entry of [...local, ...cloud]) seen.set(`${entry[0]}:${entry[1]}`, entry);
  return [...seen.values()].sort((a, b) => a[0] - b[0]).slice(-LOG_LIMIT);
}

/** Counters grew independently on each side since the base, so both increments count. */
function mergeCount(local: number, cloud: number, base: number | undefined) {
  return Math.max(local, cloud, local + cloud - (base ?? 0));
}

export function mergeProgress(
  baseRaw: string | undefined,
  localRaw: string,
  cloudRaw: string,
): string {
  const base = baseRaw === undefined ? undefined : normalizeProgress(parse(baseRaw));
  const local = normalizeProgress(parse(localRaw));
  const cloud = normalizeProgress(parse(cloudRaw));
  const baselines: NonNullable<ProgressState["baselines"]> = {};
  for (const scope of new Set([
    ...Object.keys(local.baselines ?? {}),
    ...Object.keys(cloud.baselines ?? {}),
  ])) {
    // A baseline describes the counters at its scope's reset; keep the later reset's one.
    const fromCloud = (cloud.resets[scope] ?? 0) > (local.resets[scope] ?? 0);
    const chosen = fromCloud
      ? (cloud.baselines?.[scope] ?? local.baselines?.[scope])
      : (local.baselines?.[scope] ?? cloud.baselines?.[scope]);
    if (chosen) baselines[scope] = chosen;
  }
  const merged: ProgressState = {
    solved: mergeRecord(base?.solved, local.solved, cloud.solved, latest),
    attempted: mergeRecord(base?.attempted, local.attempted, cloud.attempted, latest),
    read: mergeRecord(base?.read, local.read, cloud.read, latest),
    resets: mergeRecord(base?.resets, local.resets, cloud.resets, latest),
    log: mergeRecord(base?.log, local.log, cloud.log, mergeLog),
    totals: mergeRecord(base?.totals, local.totals, cloud.totals, (l, c, b) => {
      const submissions = mergeCount(l[0], c[0], b?.[0]);
      return [submissions, Math.min(submissions, mergeCount(l[1], c[1], b?.[1]))];
    }),
    baselines,
  };
  return JSON.stringify(normalizeProgress(merged));
}

export function mergeHistory(localRaw: string, cloudRaw: string): string {
  const byTime = new Map<number, Submission>();
  for (const sub of [...parseSubmissions(cloudRaw), ...parseSubmissions(localRaw)])
    byTime.set(sub.at, sub);
  return JSON.stringify(
    [...byTime.values()].sort((a, b) => b.at - a.at).slice(0, HISTORY_LIMIT),
  );
}

/** cyrb53 plus length: a fast change detector, not a security boundary. */
export function fingerprint(value: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < value.length; i++) {
    const ch = value.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return `${value.length}:${(4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36)}`;
}

export function baseOf(entries: Entries): SyncBase {
  return {
    fingerprints: Object.fromEntries(
      Object.entries(entries).map(([key, value]) => [key, fingerprint(value)]),
    ),
    progress: entries[PROGRESS_KEY],
  };
}

export const EMPTY_BASE: SyncBase = { fingerprints: {} };

/** True when no key was added, changed or removed since `base`. */
export function unchangedSince(base: SyncBase, entries: Entries): boolean {
  const keys = Object.keys(entries);
  return (
    keys.length === Object.keys(base.fingerprints).length &&
    keys.every((key) => base.fingerprints[key] === fingerprint(entries[key]))
  );
}

export function mergeEntries(base: SyncBase, local: Entries, cloud: Entries): Entries {
  const known = (key: string, value: string) => base.fingerprints[key] === fingerprint(value);
  const out: Entries = {};
  for (const key of new Set([...Object.keys(local), ...Object.keys(cloud)])) {
    const l = local[key];
    const c = cloud[key];
    if (l !== undefined && c !== undefined) {
      if (l === c || known(key, c)) out[key] = l;
      else if (known(key, l)) out[key] = c;
      else if (key === PROGRESS_KEY) out[key] = mergeProgress(base.progress, l, c);
      else if (HISTORY_KEY.test(key)) out[key] = mergeHistory(l, c);
      else out[key] = l;
    }
    // Present on one side only: the other side deleted it, which wins if this side is unchanged.
    else if (l !== undefined && !known(key, l)) out[key] = l;
    else if (c !== undefined && !known(key, c)) out[key] = c;
  }
  return out;
}
