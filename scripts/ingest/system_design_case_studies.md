# How to use these case studies

Each chapter is an original worked design for a prompt that comes up often in system design interviews.
They follow the same order you would use in a 45-minute round: requirements, estimates, API, data model, architecture, deep dives, failure modes, and the follow-up questions an interviewer is likely to ask.
Numbers are illustrative assumptions; state your own and adjust the design when they change.
Reviewed October 25, 2026.

## Before reading a chapter

Cover the solution and spend 10 minutes on the prompt yourself:

1. Write the functional requirements and three non-functional ones.
2. Estimate peak reads and writes per second and storage per year.
3. Sketch the components on paper.
4. Pick the hardest part and decide how you would make it correct.

Then compare.
The goal is not to match the chapter, but to notice which trade-offs you missed.

## Shared vocabulary

- **Idempotency key:** a client-chosen identifier that makes retries of the same request safe.
- **Outbox:** writing an event to a table in the same transaction as the state change, then publishing it asynchronously.
- **Fan-out on write / read:** doing work when data is produced versus when it is requested.
- **Hot key:** a single key receiving a disproportionate share of traffic.

# Design a payment system

## Requirements

- Accept payments from customers to merchants through external payment processors.
- Never charge a customer twice for one order, and never lose a successful charge.
- Record every money movement in a ledger that balances.
- Pay merchants out on a schedule; reconcile with processors daily.

Non-functional: correctness over latency, auditability, and availability of the checkout path.
Assume 1,000 payments per second at peak and 50 million per day.

## API

```text
POST /payments           {order_id, amount, currency, method_token}  Idempotency-Key: <uuid>
GET  /payments/{id}
POST /refunds            {payment_id, amount}                          Idempotency-Key: <uuid>
POST /webhooks/processor (signed)
```

## Data model

```text
payments(id, order_id UNIQUE, amount, currency, status, processor_ref, idempotency_key UNIQUE, created_at)
ledger_entries(id, transaction_id, account, debit, credit, currency, created_at)   -- append-only
outbox(id, topic, payload, published_at)
```

Status moves only forward: `created -> authorized -> captured -> settled`, or `failed`, or `refunded`.

## Architecture

```text
Checkout -> Payment API -> payments DB (status + idempotency) -> Processor adapter -> Card network
                       \-> outbox -> event bus -> Ledger service -> ledger DB
Processor webhooks -> Webhook handler -> payments DB
Nightly: Reconciliation job compares processor settlement files with the ledger
```

## Deep dives

**Exactly-once charging.** Networks fail between "processor charged the card" and "we recorded it".
Store the idempotency key with the payment row before calling the processor, and pass the same key to the processor so its side deduplicates too.
On a timeout, do not retry blindly: query the processor by reference, or let the webhook or reconciliation settle the status.

**Double-entry ledger.** Every transaction writes entries that sum to zero, for example debit customer funds and credit merchant payable.
Entries are never updated; corrections are new entries.
Balances are derived by summing entries, cached in snapshot tables for speed.

**Consistency between payment and ledger.** Write the payment status and an outbox row in one transaction; a relay publishes outbox rows.
The ledger consumer is idempotent on transaction id, so redelivery is harmless.

## Failure modes

- Processor down: fail over to a second processor for new authorizations only; never move an in-flight payment between processors.
- Duplicate webhook: idempotent on processor event id.
- Ledger lag: checkout does not wait for the ledger; reconciliation alerts on mismatches.

## Follow-up questions

- How would you support multiple currencies and FX? (Store amounts in minor units with currency; record the rate used as its own ledger transaction.)
- How do you prevent fraud? (Risk scoring before authorization, velocity limits, 3-D Secure when risk is high.)
- How do you handle PCI scope? (Tokenize card data at the edge with the processor's hosted fields so raw card numbers never reach your servers.)

# Design a distributed job scheduler

## Requirements

- Users schedule jobs to run once at a time or on a cron schedule.
- Each job run executes at least once; jobs are idempotent or receive a run id to deduplicate.
- Runs start within a few seconds of their scheduled time; history and logs are queryable.

Assume 10 million scheduled jobs and 20,000 runs per second at the top of each minute.

## API

```text
POST /jobs        {name, schedule: "0 * * * *" | run_at, payload, timeout_s, max_retries}
GET  /jobs/{id}/runs
POST /jobs/{id}/pause | resume
```

## Data model

```text
jobs(id, schedule, next_run_at, payload, owner, status)
runs(id, job_id, scheduled_at, state, attempt, worker_id, lease_expires_at, started_at, finished_at)
```

Index `jobs(next_run_at)` where status is active.

## Architecture

```text
API -> jobs DB
Scheduler (sharded by job id) -- every second: claim jobs with next_run_at <= now
          -> insert run row, compute next_run_at -> enqueue run id on a queue
Workers -> lease run -> execute -> heartbeat -> mark finished
Reaper -> requeue runs whose lease expired
```

## Deep dives

**Avoiding duplicate dispatch.** Partition jobs across scheduler instances by hash of id.
Within a partition, claim rows with an atomic update (`UPDATE ... SET next_run_at = <next> WHERE id = ? AND next_run_at = <old>`) so two schedulers that overlap during a rebalance cannot both dispatch.
Insert the run with a unique constraint on `(job_id, scheduled_at)`.

**At-least-once execution.** Workers hold a lease and heartbeat.
If a worker dies, the lease expires and the reaper requeues the run with `attempt + 1`.
Because a slow worker can still finish after its lease expires, jobs must be idempotent or check the run id.

**The top-of-the-minute spike.** Many cron jobs fire at `:00`.
Precompute runs a few seconds early into a time-bucketed queue, and spread jobs that do not need exact timing with jitter.

## Failure modes

- Scheduler partition owner dies: lease-based ownership moves the partition to another instance.
- Poison job that always crashes the worker: cap attempts, then move to a dead-letter state and alert the owner.
- Clock skew: use the database's clock for `now` in claims.

## Follow-up questions

- How would you support job dependencies (a DAG)? (Store edges, start a run when all upstream runs succeed, as Airflow-style workflow engines do.)
- How do you isolate noisy tenants? (Per-tenant concurrency limits and separate queues.)

# Design a collaborative document editor

## Requirements

- Many users edit the same document at once and see each other's changes within a fraction of a second.
- Edits made offline merge when the user reconnects.
- Version history, comments and cursors of other users.

Assume 50 million documents, most with one editor at a time, and a few popular documents with hundreds of concurrent editors.

## The core problem

Two users insert text at the same position concurrently.
Applying operations in different orders on each client must still converge to the same document.
The two standard approaches:

- **Operational transformation (OT):** a central server orders operations and transforms each incoming operation against the operations it missed. Simple to reason about with a single authority per document.
- **CRDTs:** each character gets a unique, ordered identifier so operations commute without a central transform. Works peer-to-peer and offline, at the cost of metadata per character.

In an interview, pick one and explain convergence with an example; most hosted editors use a server-ordered approach.

## Architecture (server-ordered)

```text
Client <-> WebSocket gateway -> Document session (one owner per document, chosen by consistent hashing)
                                   -> operation log (append-only) -> snapshot every N operations
                                   -> broadcast transformed ops to all clients in the session
Presence (cursors) -> pub/sub, not persisted
```

## Deep dives

**Session ownership.** Route all connections for a document to one session process so operations get a single order.
If the owner fails, another instance loads the latest snapshot plus the operation log tail and resumes.

**Persistence.** Store the operation log durably before acknowledging, and snapshot periodically so loading a document does not replay its whole history.

**Offline edits.** The client keeps local operations with the last server revision it saw; on reconnect the server transforms them against everything newer.

## Follow-up questions

- How do you scale a document with 500 editors? (Batch operations, throttle presence updates, and keep one owner but shard broadcast across gateways.)
- How do you implement version history? (Named snapshots plus the operation log; restoring creates new operations rather than rewriting history.)

# Design a real-time leaderboard

## Requirements

- Update a player's score after each game; show the top 100 and any player's rank and neighbors.
- Global, regional and friends leaderboards; daily, weekly and all-time windows.

Assume 50 million players and 10,000 score updates per second.

## Core data structure

A sorted set keyed by score supports `add`, `rank` and `range` in O(log n).
Redis sorted sets are the common choice: `ZINCRBY board:weekly 50 player:42`, `ZREVRANGE board:weekly 0 99`, `ZREVRANK board:weekly player:42`.

## Architecture

```text
Game servers -> score events -> stream -> Leaderboard updater -> Redis sorted sets (per board and window)
                                       -> durable store (scores table) for rebuilds
API -> Redis for top N, rank, neighbors; friends board computed on read
```

## Deep dives

**Windows.** Keep one sorted set per window key, such as `weekly:2026-41`, and expire old keys.

**Scale beyond one node.** 50 million members fit in memory on one large node, but writes may not.
Shard by score range or by player hash: by hash, top N is a merge of each shard's top N; rank requires summing counts above a score across shards.

**Friends leaderboard.** Fetch the friends' scores (a few hundred) and sort in the API; do not maintain a sorted set per user.

**Ties.** Encode a tie-breaker in the score, for example `score * 2^32 + (MAX_TIME - achieved_at)`, so earlier achievers rank first.

## Follow-up questions

- How do you rebuild after losing Redis? (Replay from the durable scores table or the event stream.)
- How do you prevent cheating? (Validate scores server-side from game events; never accept client-reported totals.)

# Design a stock exchange matching engine

## Requirements

- Accept limit and market orders, match buy and sell orders by price-time priority, and publish trades and market data.
- Deterministic, auditable and extremely low latency: microseconds per order on the critical path.

Assume a few thousand symbols and 1 million orders per second at peak across them.

## Order book

For each symbol keep bids (highest price first) and asks (lowest price first).
Each price level holds a FIFO queue of orders.

```text
Asks: 101.20 [o7 300] [o9 100]
      101.10 [o3 200]
Bids: 101.00 [o5 500]
       100.90 [o2 100] [o8 250]
```

A buy limit at 101.15 for 250 matches o3 for 200 at 101.10, then rests the remaining 50 at 101.15 on the bid side.

## Architecture

```text
Gateways -> sequencer (assigns a global sequence number, writes to a journal)
         -> matching engine (single thread per symbol shard, in memory)
         -> trades + book updates -> market data publisher, clearing, risk
```

## Deep dives

**Determinism.** The sequencer gives every input a sequence number and journals it before matching.
The engine is a pure function of the input sequence, so replaying the journal rebuilds the exact state, and a hot standby can consume the same journal.

**Single-threaded matching.** One thread per symbol shard avoids locks and makes ordering trivial; scale by sharding symbols, not by parallelizing one book.

**Data structures.** Price levels in an array indexed by tick for dense books, or a tree map; orders in an intrusive doubly linked list plus a hash map from order id for O(1) cancel.

## Follow-up questions

- How is risk checked without slowing matching? (Pre-trade risk in the gateway with cached limits; the engine only enforces simple invariants.)
- How do you fail over? (Standby replays the journal and takes over at a known sequence number.)

# Design ad click aggregation

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

# Design a metrics and monitoring system

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

# Design an object storage service

## Requirements

- Store and retrieve immutable objects from bytes to terabytes by bucket and key.
- Eleven nines of durability, high availability, list by prefix, and versioning.

## Architecture

```text
Clients -> API frontends (auth, routing)
        -> metadata service: bucket/key -> object id, size, checksums, version, placement (sharded KV store)
        -> data service: storage nodes holding chunks on disk
Background: repair, rebalancing, garbage collection, lifecycle rules
```

## Deep dives

**Durability.** Split each object into chunks and store them with erasure coding, for example 10 data plus 4 parity chunks across failure domains.
Any 10 of 14 reconstruct the data, using 1.4 times the raw size instead of 3 times for triple replication.
Checksums on every chunk detect corruption; background scrubbing verifies and repairs.

**Large uploads.** Multipart upload: the client uploads parts in parallel and retries individual parts; a final commit stitches them into one object atomically.

**Consistency.** Metadata writes go through a strongly consistent store so a successful PUT is immediately visible to GET and LIST.
Data chunks are written and acknowledged before the metadata commit, so metadata never points at missing data.

**Listing.** Keys are sorted in the metadata store, so prefix listing is a range scan.

## Follow-up questions

- How do you handle a hot object? (Cache at the frontend or CDN; objects are immutable so caching is safe.)
- How do deletes work with versioning? (A delete writes a tombstone version; garbage collection reclaims chunks no version references.)

# Design a hotel booking system

## Requirements

- Search hotels by location and dates, show availability and prices, and book a room type.
- Never sell more rooms than exist; allow a controlled amount of overbooking if the business wants it.
- Handle payment and cancellation.

Assume 5,000 hotels in a region with 1 million rooms, 3,000 searches and 30 bookings per second.

## Data model

```text
room_types(id, hotel_id, name, total_rooms)
inventory(room_type_id, date, total, reserved, PRIMARY KEY (room_type_id, date))
reservations(id, room_type_id, check_in, check_out, status, guest_id, idempotency_key UNIQUE)
```

Inventory is per room type per night, not per physical room; rooms are assigned at check-in.

## Deep dives

**Preventing oversell.** A reservation for nights d1 to dn must update every night's row atomically:

```sql
UPDATE inventory SET reserved = reserved + 1
WHERE room_type_id = ? AND date >= ? AND date < ? AND reserved < total
```

Proceed only if the update touched exactly n rows; otherwise roll back.
This is optimistic and avoids long-held locks.
For overbooking, compare against `total * 1.1` instead.

**Holds.** Reserve inventory when the guest starts payment, with an expiry; a job releases expired holds.

**Search.** Search reads from a cache or search index of availability that can lag slightly; the booking transaction is the source of truth, and the UI handles "no longer available".

## Follow-up questions

- How do you handle a flash sale? (Queue booking requests per room type and process them serially.)
- How do you integrate with external channel managers? (Treat their allocations as separate inventory pools with sync and reconciliation.)

# Design a distributed cache

## Requirements

- Get and set key-value pairs with sub-millisecond latency, TTL expiry, and eviction when memory is full.
- Scale to terabytes across many nodes; survive node failures.

## Architecture

```text
Clients (with a consistent-hashing client library or a proxy) -> cache nodes
Each node: hash table + LRU/LFU eviction + TTL; optional replica per shard
Cluster config service: membership, shard ownership
```

## Deep dives

**Partitioning.** Consistent hashing with virtual nodes spreads keys and moves only about 1/N of keys when a node joins or leaves.

**Eviction.** LRU with a doubly linked list and hash map is O(1); approximated LRU (sampling a few keys) saves memory per key, as Redis does.

**Expiry.** Lazy expiry on read plus a background sweep that samples keys with TTLs.

**Cache patterns.** Cache-aside: read the cache, on miss read the database and populate.
Write-through and write-behind trade write latency for freshness.
Invalidate on writes and use short TTLs as a safety net.

**Thundering herd.** When a hot key expires, many requests miss at once.
Use request coalescing (one loader, others wait), stale-while-revalidate, or jittered TTLs.

**Hot keys.** Replicate very hot keys to several nodes, or keep a small in-process cache in front.

## Follow-up questions

- Replication: synchronous or asynchronous? (Asynchronous is typical; a cache can lose recent writes because the database is the source of truth.)
- How do you avoid stale reads after a database write? (Delete the key after the commit, and use versioned values when ordering matters.)

# Design an email service

## Requirements

- Send and receive email for 1 billion users, store mailboxes, search and thread messages, and filter spam.
- Durable delivery: an accepted message is never lost.

## Architecture

```text
Outgoing: Web/app -> API -> outbound queue -> SMTP senders (per destination domain, rate-limited, retries with backoff)
Incoming: MX servers (SMTP) -> spam and malware filtering -> delivery -> mailbox store -> push notifications
Mailbox store: metadata (folders, flags, threads) in a sharded DB keyed by user; bodies and attachments in object storage
Search: per-user inverted index updated asynchronously
```

## Deep dives

**Durability.** Acknowledge an incoming SMTP transaction only after the message is written to replicated storage.
Outbound messages sit in a durable queue and are retried for days according to SMTP rules before bouncing.

**Sharding.** Shard everything by user id so a mailbox lives on one shard; large attachments are deduplicated by content hash in object storage.

**Deliverability.** SPF, DKIM and DMARC authenticate outbound mail; per-domain sending rates and warm-up protect IP reputation.

**Spam.** Layered: connection reputation, authentication results, content and attachment scanning, and per-user feedback.

## Follow-up questions

- How do you implement threading? (Group by the `References` and `In-Reply-To` headers, falling back to normalized subjects.)
- How do you search a 50 GB mailbox quickly? (A per-user index sharded with the mailbox, built incrementally.)


# Design a global multi-region rate limiter

**Recent interview prompt signal:** Gotham Loop's public feed listed a Google L5 onsite question on October 20, 2026 about a distributed rate limiter handling one million requests per second across data centers with eventual consistency. Candidate-report feeds can be incomplete or inaccurate; use this as a practice prompt, not as a claim about Google's standard loop. [Source: Gotham Loop recently asked questions](https://www.gothamloop.com/)

## Prompt

Design a rate-limiting service for a global API. It must enforce limits by tenant and API key, allow short bursts, publish rule changes quickly, and keep request checks fast while regions can temporarily lose connectivity to one another.

Assume the system sees one million requests per second globally. State any other assumptions you need, including the request-check latency target and how much temporary over-limit traffic the business can tolerate.

## Requirements

- Decide whether a request is allowed before the protected API performs expensive work.
- Support limits at more than one scope, such as tenant, credential, user, IP address, and endpoint.
- Support sustained rates and short bursts, plus explicit exceptions for trusted clients.
- Let operators change limits, activate emergency blocks, and audit who changed a rule.
- Continue making a bounded decision when a region cannot reach the global control plane.

Do not assume every limit has the same fairness, latency, or abuse requirements.

## First design questions

Clarify which scopes must be enforced together and how a caller is identified. Ask whether the limit is a hard contractual quota, an abuse-control guardrail, or a fairness target; each implies a different tolerance for overshoot.

Ask whether rejected requests consume quota, whether retries count, how policy changes take effect, and what clients should receive when a limit is exceeded. Define the permitted error budget and regional failure behavior before selecting an algorithm.

## Estimation

Start with the given one-million-request-per-second global load. Estimate the peak share per region, the number of active keys, the number of rule checks per request, and the metadata or counter state per active key. Separate steady traffic from bursts.

Use the estimates to identify the hot path. A design that performs a synchronous cross-region write for every request is unlikely to meet a tight request latency target during a partition. A design with independent local counters may be fast, but can exceed a truly global limit.

## API and rule model

~~~text
POST /v1/decisions
  { tenant_id, credential_id, user_id, ip, route, cost }
  -> { allowed, retry_after_ms, policy_id, decision_id }

PUT /v1/policies/{policy_id}
  { scope, key, sustained_rate, burst_capacity, action, effective_at, version }

GET /v1/policies/{policy_id}
GET /v1/decisions/{decision_id}
~~~

Treat rule updates as versioned and auditable. Do not put raw credentials or unnecessary personal data in counter keys or logs. The policy service should validate ownership and scope before publishing a change.

## Architecture

~~~text
API gateway in each region
  -> local decision engine
       -> in-memory token buckets for hot keys
       -> regional state store for shared local counters
       -> cached, versioned policy bundle
Global policy service
  -> durable policy database and audit log
  -> change stream / regional distribution
Quota coordinator
  -> leases a bounded share of global quota to each region
~~~

Keep the per-request decision path in-region. Use a globally coordinated control plane for policy and quota allocation, with explicit bounds on stale configuration and unreported usage.

For global quotas, grant each region a lease or budget. A region decrements its local budget quickly and reports consumption asynchronously. Smaller leases reduce global overshoot but cause more coordination and can waste unused capacity; larger leases improve availability and utilization but permit more temporary excess. State the maximum acceptable overshoot and size the lease to that bound.

## Algorithm choices

- **Token bucket:** supports an average rate and a configurable burst. Store the last refill time and remaining tokens; refill on demand and cap at burst capacity.
- **Sliding window:** offers a closer rolling-window interpretation but costs more state or computation.
- **Fixed window:** is easy to implement, but a caller can send nearly twice the configured rate across a window boundary.
- **Concurrency limit:** complements rate limits when request duration or downstream pressure matters more than arrival rate.

Use a monotonic clock for elapsed time. Define how clock skew, duplicate retries, weighted requests, and multi-rule decisions affect token consumption.

## Consistency and regional partitions

A precise global counter requires coordination. During a network partition, the product must choose between rejecting traffic, allowing a bounded amount of extra traffic, or reducing each region to its preallocated share. Explain the choice in terms of customer impact and the business meaning of the quota.

A regional lease gives a measurable upper bound on overshoot. Leases should expire or be fenced so a recovered region cannot spend an old allocation after reassignment. If a region exhausts its lease while disconnected, choose a documented fallback: reject, use a smaller emergency reserve, or temporarily enforce only local abuse limits.

## Failure modes and abuse controls

- **Policy service unavailable:** continue with the last valid policy only for a bounded age; alert when the age limit is reached.
- **Counter store unavailable:** use a conservative local fallback with a short lifetime and record degraded decisions.
- **Hot tenant or key:** shard or replicate reads carefully; do not allow one key to saturate the shared state store.
- **Rule update races:** apply monotonically increasing versions and reject older updates.
- **Retry storm:** return a useful retry delay, add jitter in clients, and avoid retrying automatically without a budget.
- **Identity spoofing:** derive trusted identity at the gateway; do not rely on an untrusted client-supplied tenant id.
- **Emergency block:** define authenticated approval, propagation target, audit record, and a tested rollback path.

## Observability and rollout

Measure decision latency by region and policy scope, allow/deny rates, false-positive complaints, estimated global overshoot, stale-policy age, lease exhaustion, counter-store errors, and rule-propagation delay.

Shadow new rules before enforcing them. Compare decisions with the current policy, inspect affected tenants, and roll out by region or traffic percentage. Keep an explicit rollback and emergency override.

## Follow-up questions

- How would you enforce a strict contractual quota across regions during a partition?
- What changes if one request consumes a different amount of capacity than another?
- How do you avoid a hot key while preserving fair accounting?
- How should the system handle a sudden abusive client without blocking its entire tenant?
- What should happen when a tenant's policy is lowered below its current burst?
- How would you measure and limit false-positive throttling?


# Design a real-time pedestrian-intent system

**Recent interview prompt signal:** Gotham Loop's public feed listed a Waymo L4 screen question on October 23, 2026 about processing LiDAR point clouds to detect and track pedestrian intent under a sub-100-millisecond latency target. Candidate-report feeds can be incomplete or inaccurate; use this as a practice prompt, not as a claim about Waymo's standard loop. [Source: Gotham Loop recently asked questions](https://www.gothamloop.com/)

## Prompt

Design an onboard perception system that consumes timestamped LiDAR point clouds, detects pedestrians, maintains tracks across frames, and estimates near-term motion or crossing intent quickly enough to inform a downstream planning system.

Assume the perception-to-planning path has a target below 100 milliseconds. Clarify which components are included in that budget and what the system should do when confidence is low, an input is stale, or a sensor is degraded.

## Requirements

- Associate detections over time so the planner can reason about a moving pedestrian, not isolated points.
- Produce a calibrated estimate of position, velocity, and short-horizon trajectory with uncertainty.
- Keep the real-time decision path onboard and bounded; connectivity to a cloud service is not guaranteed.
- Handle occlusion, sparse or noisy point clouds, overlapping pedestrians, and sensor timing differences.
- Preserve enough privacy-aware telemetry for offline evaluation and improvement without placing cloud availability on the safety-critical path.

Treat “intent” as an uncertain prediction, not a directly observed fact. The system should communicate confidence and uncertainty to downstream consumers.

## Data flow

~~~text
LiDAR frames + timestamps
  -> time alignment and sensor-health checks
  -> point-cloud filtering and feature extraction
  -> pedestrian detection
  -> multi-object tracking
  -> short-horizon motion / intent prediction
  -> confidence and freshness checks
  -> downstream planner
~~~

Keep the stages modular so latency, quality, and failure can be measured separately. Each message should include a timestamp, coordinate frame, track identifier, estimate, confidence, and validity period.

## Latency and capacity

Ask about sensor frame rate, point-cloud size, number of concurrent objects, compute budget, and whether the 100-millisecond target is end-to-end or only for a model stage. Build a latency budget with time for preprocessing, detection, association, inference, and message handoff.

Prefer bounded queues and drop stale frames rather than allowing backpressure to turn old predictions into apparently current ones. Measure p50, p95, p99 and deadline misses by stage and by operating condition.

## Tracking and prediction

Use a stable track identity while making identity changes explicit. Data association should account for motion, uncertainty, missed detections, and objects entering or leaving the field of view. A track should expire based on time and evidence, not simply on one missing frame.

Predict a distribution or a small set of plausible near-term paths instead of a single overconfident label. Separate the detected state (“pedestrian at position X, moving at velocity V”) from an inference (“may enter the roadway”). Send uncertainty and age so the planner can apply its own policy.

## Failure handling

- **Stale frame:** mark output invalid or expired; never present an old estimate as current.
- **Low confidence:** expose the uncertainty and let the downstream safety policy choose a conservative response.
- **Occlusion:** retain a short-lived predicted track with growing uncertainty, then retire it.
- **Clock or frame mismatch:** reject or quarantine data with invalid timestamps or coordinate metadata.
- **Compute overload:** shed stale work, prioritize current perception, and report missed deadlines.
- **Sensor degradation:** publish health state and reduce confidence; do not silently substitute a normal-quality estimate.
- **Model update:** validate version, resource use, latency, and scenario performance before rollout; retain a rapid rollback path.

## Evaluation

Build an offline evaluation set stratified by lighting, weather, crowd density, occlusion, pedestrian behavior, and sensor quality. Measure detection and tracking quality, intent calibration, latency, deadline misses, and performance on rare but important scenarios.

Review false negatives and false positives separately. Averages can hide poor behavior in a small but consequential scenario group. Use replay and simulation to reproduce failures, and ensure training and evaluation splits do not leak near-duplicate sequences.

## Follow-up questions

- How do you distinguish a pedestrian who is walking alongside a road from one preparing to cross?
- How does uncertainty grow when a track is occluded?
- What should happen if two sensors disagree on a track?
- Which metrics would you use to compare a new model with the current one?
- How would you test a model update against rare scenarios before deployment?
- Which work belongs onboard, and which can safely happen offline?
