# Data systems: reliability, scale, and maintainability

These notes are an independently written study aid inspired by Designing Data-Intensive Applications and Database Internals.
They summarize decision-making themes without reproducing either book.

## Three questions for every data system

Reliability asks whether the system continues to behave correctly when components fail.
Scalability asks how capacity changes as traffic, data, or users grow.
Maintainability asks whether people can operate, understand, and change the system without creating avoidable risk.

Treat these as separate dimensions.
A system can be fast but difficult to operate, highly available but logically incorrect, or easy to change but too expensive at peak load.

## Start from workload shape

Describe the reads, writes, payload sizes, retention, burstiness, and correctness boundaries before choosing storage.
A timeline feed, a payment ledger, a search index, and an event archive have different access patterns even when all of them store records.
Write down the hot path and the background path so the design does not accidentally make every operation synchronous.

# Data models and access patterns

The data model should make the important queries understandable.
Relational models are useful when constraints, joins, and transactions express the business rules directly.
Document models can keep an aggregate close to its common read path, but duplicated data requires an explicit update strategy.
Graph models are useful when the relationships themselves are the main object of exploration.

## Choose around queries

List the queries the product must serve and estimate their frequency.
An index is valuable when it turns a frequent scan into a bounded lookup, but every index adds write work and storage.
Avoid designing a schema around an imagined future query that has no product requirement.

## Encoding and evolution

Data outlives the code that first wrote it.
Prefer formats and migrations that let old and new readers coexist during a rollout.
Adding an optional field is usually easier to roll out than changing the meaning of an existing field.
Treat event schemas and API payloads as contracts with compatibility rules, not incidental implementation details.

# Storage engines: pages, logs, and indexes

A storage engine turns logical records into bytes and must balance read cost, write cost, recovery, and space usage.
Memory is fast but limited, while durable storage is slower and must account for layout, caching, and failure.

## B-trees and ordered pages

B-trees keep keys in sorted pages and update a path from the root to a leaf.
They are a strong fit for point lookups and ordered range scans when updates should be visible in place.
Page size, fan-out, caching, and write amplification affect their practical behavior.

## Log-structured storage

An append-oriented engine writes new versions sequentially and later merges sorted runs.
This can make writes efficient, but reads may consult multiple structures until compaction consolidates them.
Bloom filters, sparse indexes, and compaction policy determine how much unnecessary work remains.

## The real tradeoff

Compare an engine by workload rather than by the name of its data structure.
Ask how it handles random writes, range scans, updates, deletes, compaction pauses, crashes, and recovery time.

# Transactions and recovery

Transactions protect a set of operations from being observed in an invalid intermediate state.
The strongest isolation level is not automatically the best choice because it can reduce concurrency or increase coordination.

## Recovery path

A write-ahead log records enough information to recover durable state after a process or machine failure.
The system can acknowledge a write only after the required durability boundary has been reached.
Checkpoints reduce restart work by establishing a known base from which the log can be replayed.

## Concurrency

Locks are easy to reason about but can create contention and deadlocks.
Optimistic validation works well when conflicts are uncommon, while versioned reads can let readers avoid blocking writers.
Whichever approach is chosen, define what happens when a conflict is detected and how clients retry safely.

# Replication and consistency

Replication improves availability and read capacity, but copies introduce lag and conflict questions.

## Leader-based replication

A leader serializes writes and followers apply an ordered log.
Synchronous followers improve the durability boundary but add latency and reduce tolerance for slow replicas.
Asynchronous followers improve responsiveness but may be behind when a client reads from a different node.

## What users observe

Define whether a user must read their own write, whether reads may move backward, and whether related events must appear in order.
These are user-visible promises, not just database settings.
If the product can tolerate stale views, say how stale is acceptable and how the UI communicates that state.

# Partitioning and coordination

Partitioning spreads data and work across nodes, but it also turns local operations into distributed operations when a request spans partitions.
Choose a key that distributes load while keeping common queries local.
Watch for hot keys, uneven growth, and rebalancing cost.

## Coordination boundaries

Leader election, membership, and consensus are useful when many nodes need one authoritative decision.
They do not remove failure, and they do not make arbitrary multi-step business workflows atomic.
Keep coordination scopes small and make retries idempotent.

## Rebalancing

Adding capacity should not require moving the entire dataset at once.
Use staged migration, dual reads or writes when needed, verification, and a rollback plan.
Measure the effect on latency and background bandwidth while the move is running.

# Batch and stream processing

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

# Evolving a data system

A safe data change has a compatibility story, an observable rollout, and a recovery path.
Expand a schema before switching writers, backfill in bounded batches, verify counts and invariants, then remove obsolete paths only after the new path has been stable.

Prefer explicit ownership of data and derived views.
Document retention, deletion, access control, and recovery expectations beside the design so operational behavior is part of correctness.

# Read a query plan and choose an index

## Interview exercise

A PostgreSQL application frequently requests the latest twenty orders for one customer.
The fictional table has millions of rows and columns `id`, `customer_id`, `created_at`, `status`, and `total_minor`.
Explain how you would investigate a slow query before adding an index.
These notes were reviewed October 4, 2026.

```sql
EXPLAIN
SELECT id, created_at, total_minor
FROM orders
WHERE customer_id = 42
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

## Reason from the access pattern

The query filters by customer and then orders that customer's rows.
A candidate B-tree index is `(customer_id, created_at DESC, id DESC)`.
It can support the equality filter and the requested ordering, allowing early termination after enough qualifying rows.
The second ordering column makes ties deterministic.
An index on `created_at` alone may scan many other customers' orders before finding twenty matches.
An index on `customer_id` alone may still require sorting that customer's matches.

## Inspect evidence

Compare estimated rows with observed rows, scan type, sorting, and the amount of work needed before the limit is satisfied.
`EXPLAIN ANALYZE` executes the statement, so use representative disposable data for this exercise.
`BUFFERS` adds information about buffer activity.
A sequential scan is not automatically a defect: it can be sensible for a small table or a query returning much of the table.

Do not claim that the candidate index improves performance until you measure the same query and data distribution before and after.
Indexes add storage and write work, and the planner's choice depends on statistics and selectivity.
A covering index may reduce heap access in suitable conditions, but adding every selected column increases its size and maintenance cost.

## Follow-up and answer criteria

Change the query to filter by `status` as well.
Ask whether status is selective and whether all customers use the same query before rearranging the index.
A strong answer connects column order to predicates, considers ordering and limits, and proposes a measurement rather than promising a speedup.

## Source

[PostgreSQL's EXPLAIN documentation](https://www.postgresql.org/docs/current/using-explain.html) explains plan interpretation and the execution behavior of `ANALYZE`.
The orders example is original.

# Diagnose a transaction conflict

## Exercise

Two workers each attempt to reserve the last available unit of an item.
The initial quantity is one.
A broken implementation reads the quantity, computes a new value in the application, and then writes that value in a separate operation.
Both workers can observe one and both can report a successful reservation even though the stored quantity ends at zero.
The final number alone does not prove correctness.

## Use an atomic condition

For this single-item exercise, express the precondition in the update itself.

```sql
UPDATE inventory
SET quantity = quantity - 1
WHERE item_id = 7 AND quantity > 0
RETURNING quantity;
```

A returned row means this statement reserved a unit.
No returned row means the item was absent or had no stock; distinguish those cases separately if the contract requires it.
Record the reservation in the same transaction so stock and ownership cannot diverge on a local failure.
Use a unique request identifier to recognize a retry of a completed reservation.

## Isolation is not a label that fixes everything

In PostgreSQL, Read Committed gives each statement a new snapshot, while Repeatable Read uses a transaction snapshot and may reject conflicting updates.
Serializable transactions can also require retries when a serialization anomaly is detected.
Retry the complete transaction with a bounded policy, not only its final statement.
Keep irreversible external effects outside a transaction retry loop unless an appropriate idempotency mechanism protects them.

## Reproduction schedule

Use two sessions against a disposable database.
For the broken version, pause both after reading quantity one, then let both write and record their reported success.
For the corrected version, run both conditional updates and verify one reservation, quantity zero, and one unsuccessful claim.
The regression should inspect both persisted state and returned outcomes.

## Follow-up

Now reserve two different items together.
Acquire locks in a consistent order when appropriate, handle deadlocks as explicit retryable failures, and roll back the entire reservation when either item is unavailable.
Explain why a single conditional update solved the first exercise but does not automatically solve every multi-row invariant.

## Source

[PostgreSQL transaction isolation](https://www.postgresql.org/docs/current/transaction-iso.html) documents snapshot and concurrency behavior.
This inventory example is an original exercise.
