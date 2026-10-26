import test from "node:test";
import assert from "node:assert/strict";
import {
  freshnessStatus,
  getContentReview,
  getContentReviews,
} from "./freshness";

test("review status separates unknown, stale snapshots and explicit editorial review", () => {
  const now = new Date("2026-10-26T12:00:00Z");
  const unknown = {
    reviewedAt: null,
    sourceDate: null,
    reviewIntervalDays: 90,
  };
  assert.equal(freshnessStatus(unknown, now), "unknown");
  assert.equal(
    freshnessStatus({ ...unknown, sourceDate: "2026-10-25" }, now),
    "unknown",
  );
  assert.equal(
    freshnessStatus({ ...unknown, sourceDate: "2026-07-12" }, now),
    "stale",
  );
  assert.equal(
    freshnessStatus({ ...unknown, reviewedAt: "2026-10-04" }, now),
    "reviewed",
  );
  assert.equal(
    freshnessStatus({ ...unknown, reviewedAt: "2026-01-01" }, now),
    "stale",
  );
});

test("provenance ledger IDs, source links and dates are valid", () => {
  const entries = getContentReviews();
  assert.equal(new Set(entries.map((r) => r.id)).size, entries.length);
  assert.equal(getContentReview("does-not-exist"), undefined);
  for (const entry of entries) {
    assert.ok(entry.href.startsWith("/"));
    for (const date of [
      entry.sourceDate,
      entry.reportedAt,
      entry.reviewedAt,
      entry.addedAt,
      entry.observedAt,
    ]) {
      if (date) assert.match(date, /^\d{4}-\d{2}-\d{2}$/);
    }
    for (const source of entry.sources)
      assert.match(source.url, /^https?:\/\//);
    for (const event of entry.history)
      assert.match(event.commit, /^[a-f0-9]{7,40}$/);
  }
});
