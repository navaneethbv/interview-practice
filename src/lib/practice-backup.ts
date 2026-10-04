import { isRecord, isSubmission, normalizeProgress, parsePrefs } from "./progress-data";
import { isPracticeVisit } from "./practice-resume";
import { restoreEntries, storedEntries } from "./storage";

export const BACKUP_LIMIT = 20 * 1024 * 1024;
export interface PracticeBackup {
  format: "interview-practice";
  version: 1;
  exportedAt: string;
  entries: Record<string, string>;
}
const CODE_KEY = /^ip:(?:code|recovery):(?:lc:)?[a-zA-Z0-9_-]+:(?:python|java|sql)$/;
const HISTORY_KEY = /^ip:subs:(?:lc:)?[a-zA-Z0-9_-]+$/;

function validStructuredEntry(key: string, value: unknown): boolean {
  if (HISTORY_KEY.test(key)) return Array.isArray(value) && value.length <= 30 && value.every(isSubmission);
  if (!isRecord(value)) return false;
  if (key === "ip:progress:v1") {
    const normalized = normalizeProgress(value);
    return Object.entries(value).every(([field, content]) => Object.hasOwn(normalized, field)
      && JSON.stringify(content) === JSON.stringify(normalized[field as keyof typeof normalized]));
  }
  if (key === "ip:prefs:v1") {
    const parsed = parsePrefs(JSON.stringify(value));
    return Object.keys(value).every((field) => field === "lang" || field === "fontSize")
      && value.lang === parsed.lang && value.fontSize === parsed.fontSize;
  }
  if (key === "ip:resume:v1") return Object.entries(value).every(([kind, visit]) =>
    (kind === "problem" || kind === "chapter") && isPracticeVisit(visit) && visit.kind === kind);
  return false;
}

export function parseBackup(text: string): PracticeBackup {
  if (new TextEncoder().encode(text).length > BACKUP_LIMIT) throw new Error("Backup is too large (maximum 20 MB).");
  let data: unknown;
  try { data = JSON.parse(text); } catch { throw new Error("This file is not valid JSON."); }
  if (!isRecord(data) || data.format !== "interview-practice" || data.version !== 1 || !isRecord(data.entries)
      || typeof data.exportedAt !== "string" || !Number.isFinite(Date.parse(data.exportedAt))) {
    throw new Error("Choose an Interview Practice version 1 backup.");
  }
  const entries: Record<string, string> = {};
  for (const [key, raw] of Object.entries(data.entries)) {
    if (typeof raw !== "string") throw new Error("The backup contains an invalid value.");
    if (!CODE_KEY.test(key)) {
      let value: unknown;
      try { value = JSON.parse(raw); } catch { throw new Error("The backup contains damaged practice data."); }
      if (!validStructuredEntry(key, value)) throw new Error("The backup contains unsupported or invalid practice data.");
    }
    entries[key] = raw;
  }
  if (!Object.keys(entries).length) throw new Error("The backup contains no practice data.");
  return { format: "interview-practice", version: 1, exportedAt: data.exportedAt, entries };
}

export function exportPractice(): string {
  const source = storedEntries();
  const entries: Record<string, string> = {};
  for (const [key, raw] of Object.entries(source)) {
    if (CODE_KEY.test(key)) entries[key] = raw;
    else {
      try {
        const value: unknown = JSON.parse(raw);
        if (validStructuredEntry(key, value)) entries[key] = raw;
        else if (["ip:progress:v1", "ip:prefs:v1", "ip:resume:v1"].includes(key) || HISTORY_KEY.test(key)) {
          throw new Error("Stored practice data is damaged. Export individual drafts before repairing it.");
        }
      } catch {
        throw new Error("Stored practice data could not be backed up completely. Download individual drafts before repairing it.");
      }
    }
  }
  const text = JSON.stringify({ format: "interview-practice", version: 1, exportedAt: new Date().toISOString(), entries }, null, 2);
  parseBackup(text);
  return text;
}

export function importPractice(backup: PracticeBackup) {
  // Validate again at the mutation boundary, including calls outside the file picker.
  restoreEntries(parseBackup(JSON.stringify(backup)).entries);
}
