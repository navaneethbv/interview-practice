import Link from "next/link";
import {
  freshnessLabels,
  freshnessStatus,
  getContentReview,
} from "@/lib/freshness";

/** Use catalog scope IDs: set:<id>, book:<id>, course:grokking, reports:<source>. */
export function ContentFreshness({ contentId }: { contentId: string }) {
  const entry = getContentReview(contentId);
  return (
    <aside
      aria-label="Content freshness"
      className="my-4 rounded-xl border border-line bg-layer-1 px-4 py-3 text-xs text-fg-2"
    >
      <p className="font-medium text-fg-1">
        {entry
          ? freshnessLabels[freshnessStatus(entry)]
          : "Review needed · date unknown"}
      </p>
      <p className="mt-1">
        Source date: {entry?.sourceDate ?? "unknown"} · Reviewed:{" "}
        {entry?.reviewedAt ?? "not recorded"}
        {entry?.addedAt ? ` · Added to repository: ${entry.addedAt}` : ""}
      </p>
      {entry?.reportedAt && (
        <p className="mt-1">
          Source-reported date: {entry.reportedAt} (not independently verified)
        </p>
      )}
      {entry?.reportedPeriods?.length ? (
        <p className="mt-1">
          Source-reported periods: {entry.reportedPeriods.join("; ")} (not
          independently verified)
        </p>
      ) : null}
      {entry?.sources.map((source) => (
        <a
          key={source.url}
          className="mr-3 mt-2 inline-block text-brand underline underline-offset-2"
          href={source.url}
          target="_blank"
          rel="noreferrer"
        >
          {source.label}
        </a>
      ))}
      <Link
        className="mt-2 inline-block text-brand underline underline-offset-2"
        href={`/content-status${entry ? `#${entry.id.replaceAll(":", "-")}` : ""}`}
      >
        Source and review history
      </Link>
    </aside>
  );
}
