import type { LogEntry, Prefs, ProgressState, Submission } from "./progress";

export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
const safeKey = (key: string) => !["__proto__", "constructor", "prototype"].includes(key);
const count = (value: unknown): value is number => typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
const timestamp = (value: unknown): value is number => count(value) && value < 8_640_000_000_000_000;
const entries = (value: unknown) => isRecord(value) ? Object.entries(value).filter(([key]) => safeKey(key)) : [];
const times = (value: unknown): Record<string, number> => Object.fromEntries(entries(value).filter((entry): entry is [string, number] => timestamp(entry[1])));
const isPair = (value: unknown): value is [number, number] => Array.isArray(value) && value.length === 2 && count(value[0]) && count(value[1]) && value[1] <= value[0];
const pairs = (value: unknown): Record<string, [number, number]> => Object.fromEntries(entries(value).filter((entry): entry is [string, [number, number]] => isPair(entry[1])));
const isLog = (value: unknown): value is LogEntry => Array.isArray(value) && value.length === 2 && timestamp(value[0]) && (value[1] === 0 || value[1] === 1);

/** Recover valid fields independently, including old records without totals. */
export function normalizeProgress(value: unknown): ProgressState {
  const p = isRecord(value) ? value : {};
  const progress: ProgressState = {
    solved: times(p.solved), attempted: times(p.attempted), read: times(p.read), resets: times(p.resets),
    log: Object.fromEntries(entries(p.log).map(([id, log]) => [id, Array.isArray(log) ? log.filter(isLog).slice(-100) : []])),
    totals: pairs(p.totals),
    baselines: Object.fromEntries(entries(p.baselines).map(([scope, values]) => [scope, pairs(values)])),
  };
  // Lifetime counters cannot be smaller than events still present in the log.
  for (const [id, log] of Object.entries(progress.log)) {
    const total = progress.totals?.[id];
    if (!total) continue;
    const retainedAccepted = log.reduce((sum, [, ok]) => sum + ok, 0);
    const accepted = Math.max(total[1], retainedAccepted);
    progress.totals![id] = [Math.max(total[0], accepted + log.length - retainedAccepted), accepted];
  }
  // A reset snapshot must describe a possible prefix of the lifetime counters.
  // Both the snapshot and the remaining submissions need valid success counts.
  for (const baseline of Object.values(progress.baselines ?? {})) {
    for (const [id, pair] of Object.entries(baseline)) {
      const log = progress.log[id] ?? [];
      const total = progress.totals?.[id] ?? [log.length, log.reduce((sum, [, ok]) => sum + ok, 0)];
      const submissions = Math.min(pair[0], total[0]);
      const accepted = Math.min(submissions, total[1], Math.max(pair[1], total[1] - total[0] + submissions));
      baseline[id] = [submissions, accepted];
    }
  }
  return progress;
}

function parse(raw: string | null): unknown {
  try { return JSON.parse(raw ?? "null"); } catch { return null; }
}
const isLang = (value: unknown) => value === "python" || value === "java" || value === "sql";
const verdicts = new Set(["Accepted", "Wrong Answer", "Runtime Error", "Compile Error", "Time Limit Exceeded", "Internal Error"]);
export function isSubmission(value: unknown): value is Submission {
  if (!isRecord(value)) return false;
  return timestamp(value.at) && isLang(value.lang) && typeof value.verdict === "string" && verdicts.has(value.verdict)
    && count(value.passed) && count(value.total) && value.passed <= value.total && typeof value.code === "string"
    && (value.runtimeMs === undefined || (typeof value.runtimeMs === "number" && Number.isFinite(value.runtimeMs) && value.runtimeMs >= 0));
}
export function parseSubmissions(raw: string | null): Submission[] {
  const value = parse(raw);
  return Array.isArray(value) ? value.filter(isSubmission).slice(0, 30) : [];
}
export function parsePrefs(raw: string | null): Prefs {
  const value = parse(raw);
  const p = isRecord(value) ? value : {};
  return {
    lang: isLang(p.lang) ? p.lang as Prefs["lang"] : "python",
    fontSize: typeof p.fontSize === "number" && Number.isFinite(p.fontSize) ? Math.min(22, Math.max(11, Math.round(p.fontSize))) : 14,
  };
}
