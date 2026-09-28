Batch jobs process a bounded or historical dataset, while stream processors react to an ongoing sequence of events.
Batch processing is often easier to reproduce, and streaming can reduce freshness delay.

## Event semantics

At-least-once delivery is common, so consumers should tolerate duplicates through idempotency or deduplication.
Exactly-once behavior is usually a property of a carefully bounded workflow rather than a magical transport guarantee.
Track offsets, event time, processing time, late data, and failed records.

## Derived data

Search indexes, materialized views, aggregates, and recommendations are derived from source events or source tables.
Record enough provenance to rebuild them when code or business rules change.
Treat rebuilds as production operations with capacity limits, progress tracking, and validation.
