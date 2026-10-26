import type { Metadata } from "next";
import Link from "next/link";
import { NavBar, SiteFooter } from "@/components/NavBar";
import { PageHeader } from "@/components/PageHeader";
import {
  freshnessLabels,
  freshnessStatus,
  getContentReviews,
} from "@/lib/freshness";

export const metadata: Metadata = { title: "Content status" };

export default async function ContentStatusPage({
  searchParams,
}: Readonly<{
  searchParams: Promise<{ filter?: string }>;
}>) {
  const { filter } = await searchParams;
  const all = getContentReviews();
  const now = new Date();
  const entries = all.filter((entry) => {
    if (filter === "stale") return freshnessStatus(entry, now) === "stale";
    if (filter === "unknown") return !entry.sourceDate || !entry.reviewedAt;
    return true;
  });
  return (
    <>
      <NavBar />
      <PageHeader eyebrow="Sources & maintenance" title="Content status">
        Check where material came from and what has actually been reviewed. A
        repository update, source report and editorial review are different
        events.
      </PageHeader>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <p className="max-w-3xl text-sm text-fg-2">
          Unknown means no verified date is recorded. Review overdue means the
          recorded source snapshot or review exceeds its review interval.
          Candidate reports are source claims; they do not predict your
          interview. Authored material still needs an editorial review.
        </p>
        <nav
          aria-label="Filter content status"
          className="my-6 flex flex-wrap gap-2"
        >
          {[
            { id: "all", label: "All content" },
            { id: "stale", label: "Review overdue" },
            { id: "unknown", label: "Unknown dates" },
          ].map(({ id, label }) => (
            <Link
              key={id}
              href={
                id === "all"
                  ? "/content-status"
                  : `/content-status?filter=${id}`
              }
              aria-current={(filter ?? "all") === id ? "page" : undefined}
              className="rounded-lg border border-line bg-layer-1 px-4 py-2 text-sm aria-[current=page]:border-brand aria-[current=page]:text-brand"
            >
              {label}
            </Link>
          ))}
        </nav>
        <p className="mb-4 text-sm text-fg-3">
          {entries.length} of {all.length} collections
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {entries.map((entry) => (
            <article
              id={entry.id.replaceAll(":", "-")}
              key={entry.id}
              className="min-w-0 scroll-mt-20 rounded-2xl border border-line bg-layer-1 p-5"
            >
              <p className="text-xs font-medium text-brand">
                {entry.kind} · {freshnessLabels[freshnessStatus(entry, now)]}
              </p>
              <h2 className="mt-2 text-lg font-semibold">
                <Link href={entry.href} className="hover:text-brand">
                  {entry.title}
                </Link>
              </h2>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                <dt className="text-fg-3">Source date</dt>
                <dd>{entry.sourceDate ?? "Unknown"}</dd>
                <dt className="text-fg-3">Reviewed</dt>
                <dd>{entry.reviewedAt ?? "Not recorded"}</dd>
                <dt className="text-fg-3">Added locally</dt>
                <dd>{entry.addedAt ?? "Unknown"}</dd>
                {entry.observedAt && (
                  <>
                    <dt className="text-fg-3">Observed</dt>
                    <dd>{entry.observedAt}</dd>
                  </>
                )}
                {entry.reportedAt && (
                  <>
                    <dt className="text-fg-3">Reported</dt>
                    <dd>{entry.reportedAt} (source claim)</dd>
                  </>
                )}
                {entry.reportedPeriods?.length ? (
                  <>
                    <dt className="text-fg-3">Reported periods</dt>
                    <dd>{entry.reportedPeriods.join("; ")} (source claims)</dd>
                  </>
                ) : null}
                <dt className="text-fg-3">Review interval</dt>
                <dd>{entry.reviewIntervalDays} days</dd>
              </dl>
              <p className="mt-4 text-sm text-fg-2">{entry.notes}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {entry.sources.map((source) => (
                  <li key={source.url}>
                    <a
                      className="break-words text-brand underline underline-offset-2"
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {source.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
              {entry.history.length > 0 && (
                <details className="mt-4 text-sm">
                  <summary className="cursor-pointer text-fg-2">
                    Recorded repository changes
                  </summary>
                  <ul className="mt-2 space-y-2 text-fg-3">
                    {entry.history.map((event) => (
                      <li key={event.commit}>
                        <time>{event.date}</time> · <code>{event.commit}</code>{" "}
                        · {event.summary}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs text-fg-3">
                    These are local file changes, not source publication or
                    editorial review dates.
                  </p>
                </details>
              )}
            </article>
          ))}
        </div>
        {!entries.length && (
          <p className="rounded-xl border border-line p-6">
            No collections match this filter.
          </p>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
