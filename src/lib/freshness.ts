import manifest from "../../content/content-reviews.json";

export type ContentReview = {
  id: string;
  title: string;
  href: string;
  contentPath: string;
  kind: string;
  sourceDate: string | null;
  reportedAt: string | null;
  reportedPeriods?: string[];
  observedAt?: string | null;
  reviewedAt: string | null;
  addedAt: string | null;
  reviewIntervalDays: number;
  sources: { label: string; url: string }[];
  history: { date: string; commit: string; summary: string }[];
  notes?: string;
};
export type FreshnessStatus = "reviewed" | "stale" | "unknown";

export function getContentReviews(): ContentReview[] {
  return manifest.entries;
}

export function getContentReview(id: string): ContentReview | undefined {
  return getContentReviews().find((entry) => entry.id === id);
}

export function freshnessStatus(
  entry: Pick<
    ContentReview,
    "reviewedAt" | "sourceDate" | "reviewIntervalDays"
  >,
  now = new Date(),
): FreshnessStatus {
  const date = entry.reviewedAt ?? entry.sourceDate;
  if (
    date &&
    now.getTime() - Date.parse(`${date}T00:00:00Z`) >
      entry.reviewIntervalDays * 86_400_000
  )
    return "stale";
  return entry.reviewedAt ? "reviewed" : "unknown";
}

export const freshnessLabels: Record<FreshnessStatus, string> = {
  reviewed: "Reviewed",
  stale: "Review overdue",
  unknown: "Review needed · date unknown",
};
