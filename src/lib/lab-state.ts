export const LABS_KEY = "ip:labs:v1";
export interface LabAttempt {
  draft: string;
  checks: string[];
  updated: number;
}
export type LabState = Record<string, LabAttempt>;
export function isLabState(value: unknown): value is LabState {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const entries = Object.entries(value);
  return (
    entries.length <= 200 &&
    entries.every(
      ([key, v]) =>
        /^[a-z0-9-]{1,100}$/.test(key) &&
        v &&
        typeof v === "object" &&
        !Array.isArray(v) &&
        Object.keys(v).every((k) =>
          ["draft", "checks", "updated"].includes(k),
        ) &&
        typeof v.draft === "string" &&
        v.draft.length <= 50000 &&
        Array.isArray(v.checks) &&
        v.checks.length <= 100 &&
        v.checks.every(
          (c: unknown) => typeof c === "string" && c.length <= 100,
        ) &&
        typeof v.updated === "number" &&
        Number.isFinite(v.updated) &&
        v.updated >= 0,
    )
  );
}
export function parseLabState(raw: string | null): LabState {
  try {
    const v: unknown = JSON.parse(raw ?? "null");
    return isLabState(v) ? v : {};
  } catch {
    return {};
  }
}
