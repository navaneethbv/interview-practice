# Content provenance and review

`content/content-reviews.json` is the explicit provenance ledger shown at `/content-status`. Per-page badges use `ContentFreshness` and a collection ID (`book:grokking`, `set:neetcode-150`, `course:grokking`, `practice:labs`, `practice:interviews`, or `business-analyst`). Unknown IDs render a review-needed badge; never silently assume a review.

Dates have separate meanings:

- `sourceDate`: a verified publication date or an explicitly dated source snapshot. A pinned revision alone supplies no date.
- `reportedAt`: a date claimed by a source (for company observations, the latest exact last-asked date available). It is not independently verified.
- `reportedPeriods`: approximate source wording, preserved verbatim rather than converted into invented exact dates. Source scope may span multiple companies.
- `observedAt`: when evidence was collected. It is not an interview date.
- `addedAt`: the earliest available commit date for the local content file. It does not establish when its source was published. Shared set-file dates describe collection storage, not individual question additions.
- `reviewedAt`: an editorial review explicitly recorded with evidence. Build, ingestion, migration and this ledger's creation do not constitute content review.

Null dates remain visibly unknown. Authored prompts have no external publication date, and remain review-needed until reviewed. Current initial review evidence is the NeetCode catalog's existing “reviewed October 4, 2026” source label; company snapshot dates come from existing catalog labels. The ledger does not claim a new source review.

The status becomes overdue when the recorded review (or, without one, source snapshot) exceeds `reviewIntervalDays`: 90 for company snapshots/reports and 180 otherwise. A recent source snapshot without an editorial review remains review-needed. The “Unknown dates” filter includes any collection lacking a source date or review date, so it may overlap the overdue filter.

For a review, inspect the linked original sources, validate mappings and claims, record the date actually reviewed, and add a concise evidence note. Do not replace source dates with today's date. Include source URLs for additional evidence and retain any known original dates. For candidate reports explicitly distinguish source claims from verified interview facts. Never infer an individual interview date from an aggregate listing.

`history` contains actual recorded git commit dates, abbreviated hashes and subjects available when the ledger was created, or explicit editorial events. It is a limited snapshot, not live Git history. New authored material has empty history until a real event exists. Update it when meaningful content changes; never generate synthetic “updated today” events. A file addition or formatting commit does not refresh `reviewedAt`.

## Reference verification in CI

The required status remains **Quality checks**, a final aggregate requiring lint/types/unit, production build/browser, independent BCTCI oracles and all four reference shards. Reference jobs run `npm run tests:build -- --java --shard=N/4`. The sorted complete fixture list is partitioned by index modulo shard count; every selected spec still runs all its Python/SQLite and applicable Java cases through the existing judge. No verdict logic changes. Explicit IDs are validated before partitioning. Unit tests prove the four-way fixture union, disjointness, balance and order independence. A failed shard does not cancel the others, and the aggregate rejects failures, cancellations and skipped dependencies.

Run the unsharded `npm run tests:build -- --java` locally for full verification. Shards only select specs; `--regen`, extra-language checks and expected-output behavior remain unchanged. CI rejects uncommitted expected-output changes.
