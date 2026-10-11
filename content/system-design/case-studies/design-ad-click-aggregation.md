## Requirements

- Count clicks per ad per minute, query aggregates for the last N minutes or days, and feed billing.
- Results must be accurate enough to bill: no double counting, late events handled.

Assume 1 billion clicks per day (about 12,000 per second average, 50,000 at peak) across 2 million ads.

## Architecture

```text
Click servers -> log (Kafka, partitioned by ad id) -> stream aggregator (windowed counts)
              -> aggregate store (OLAP: Druid, ClickHouse or Pinot)
              -> raw events to object storage -> daily batch recompute for billing
```

## Deep dives

**Windows and late events.** Aggregate by event time in one-minute tumbling windows.
Use watermarks to decide when a window is complete, keep windows open for an allowed lateness, and send later events to a correction path.

**Exactly-once counting.** Deduplicate on click id within a time window.
With Kafka and a stream processor that supports transactional sinks, the offset commit and the aggregate write happen atomically, giving effectively-once results.

**Hot ads.** A viral ad concentrates traffic on one partition.
Pre-aggregate on the click servers for a few seconds, or salt the key into several sub-keys and merge downstream.

**Reconciliation.** The batch job over raw events is the source of truth for billing; the streaming result serves dashboards and alerts on divergence.

## Follow-up questions

- How do you filter bot clicks? (Rules and models upstream of aggregation, with the filtered events kept for audit.)
- How would you support arbitrary dimensions? (Store pre-aggregated rollups for common dimensions in the OLAP store.)
