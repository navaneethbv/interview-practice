export const RESUME_KEY = "ip:resume:v1";
export type PracticeKind = "problem" | "chapter";
export interface PracticeVisit {
  kind: PracticeKind;
  title: string;
  href: string;
  context: string;
  at: number;
}
export type PracticeVisits = Partial<Record<PracticeKind, PracticeVisit>>;

export function isPracticeVisit(value: unknown): value is PracticeVisit {
  if (!value || typeof value !== "object") return false;
  const visit = value as Partial<PracticeVisit>;
  if (visit.kind !== "problem" && visit.kind !== "chapter") return false;
  if (typeof visit.title !== "string" || !visit.title.trim() || visit.title.length > 500) return false;
  if (typeof visit.context !== "string" || visit.context.length > 200) return false;
  if (typeof visit.at !== "number" || !Number.isFinite(visit.at) || visit.at <= 0) return false;
  if (typeof visit.href !== "string") return false;
  // Restored browser data may be edited: permit only this app's detail routes.
  return visit.kind === "chapter"
    ? /^\/system-design\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/.test(visit.href)
    : /^\/problems\/(?:lc\/)?[a-zA-Z0-9_-]+(?:\?set=[a-z0-9-]+)?$/.test(visit.href);
}

export function parsePracticeVisits(raw: string | null): PracticeVisits {
  try {
    const value: unknown = JSON.parse(raw ?? "null");
    if (!value || typeof value !== "object") return {};
    const visits = value as PracticeVisits;
    return Object.fromEntries((["problem", "chapter"] as const)
      .filter((kind) => isPracticeVisit(visits[kind]) && visits[kind]?.kind === kind)
      .map((kind) => [kind, visits[kind]]));
  } catch {
    return {};
  }
}

/** Retain list context while discarding transient or unrelated URL parameters. */
export function practiceHref(pathname: string, search: string): string {
  const set = new URLSearchParams(search).get("set");
  return pathname.startsWith("/problems/lc/") && set && /^[a-z0-9-]+$/.test(set)
    ? `${pathname}?set=${set}`
    : pathname;
}
