## Requirements

- Collect numeric metrics (counters, gauges, histograms) from 100,000 hosts every 10 seconds.
- Query recent data in dashboards within seconds; keep raw data 15 days and downsampled data 2 years.
- Evaluate alert rules continuously.

That is about 10 million samples per second if each host emits 1,000 series.

## Data model

A series is a metric name plus labels, such as `http_requests_total{service="cart", status="500"}`.
Each sample is `(series id, timestamp, value)`.
Label cardinality is the main scaling risk: a label with user ids creates millions of series.

## Architecture

```text
Agents -> collectors (stateless) -> ingestion queue -> time series DB (sharded by series id)
                                                    -> long-term store (object storage, downsampled blocks)
Query service -> fan out to shards -> merge
Alert evaluator -> runs rules every 30 s -> notification service (dedupe, routing, silences)
```

## Deep dives

**Storage.** Time series compress extremely well: delta-of-delta encoding for timestamps and XOR encoding for floating-point values reduce samples to about 1 to 2 bytes each.
Write to an in-memory head block with a write-ahead log, then flush immutable blocks.

**Downsampling.** Precompute 5-minute and 1-hour rollups (min, max, sum, count) so long-range queries read far fewer points.

**Alerting.** Evaluate rules close to the data, require a condition to hold for a duration to avoid flapping, and group alerts so one outage pages once.

## Follow-up questions

- How do you protect the system from a cardinality explosion? (Per-tenant series limits and rejecting unbounded labels at ingestion.)
- How do you monitor the monitoring system? (An independent, simpler pipeline and dead-man's-switch alerts.)
