# CTCI system design: a repeatable interview loop

These notes are an independently written study aid inspired by the system design chapter of Cracking the Coding Interview.
They do not reproduce the book, and the official resource is linked from the reader for credit.
System design interviews reward clear reasoning under incomplete requirements.
The goal is not to name every technology, but to make the important assumptions visible and show how the design changes when those assumptions change.

## Start with the contract

Write down the user actions the system must support before choosing components.
Separate must-have behavior from useful follow-ups such as analytics, moderation, administration, exports, or billing.
Ask how fresh the result must be, how long data is retained, whether requests are authenticated, and what failure the user can tolerate.

## A practical sequence

1. Clarify the product behavior and the most important non-functional requirements.
2. Estimate the request, storage, and bandwidth ranges that matter to the first design.
3. Draw the simplest end-to-end architecture that satisfies the contract.
4. Walk one read and one write through the system.
5. Identify the first bottlenecks and revise only the parts that need to scale.

Keep the diagram broad at first.
A short explanation of why a component exists is more valuable than a long list of vendor names.

## Make tradeoffs explicit

Every major choice should answer a question about the product.
A cache favors fast repeated reads but introduces freshness and invalidation concerns.
A queue protects the request path from slow work but introduces delayed completion and retry handling.
Denormalized data can make reads predictable but requires a plan for keeping copies consistent.

When the interviewer changes a requirement, update the affected assumption, flow, or data model rather than restarting the entire design.

# Capacity sketch: turn requirements into pressure

Capacity estimates are a way to expose constraints early.
They do not need to be precise, but they should be internally consistent.

## Estimate the useful quantities

Start with active users, actions per user, peak-to-average traffic, average payload size, and retention period.
From those values, derive average requests per second, peak requests per second, daily bytes written, and the size of the retained dataset.
For a read-heavy workload, estimate the cacheable portion of traffic and the expected hit rate.
For a write-heavy workload, estimate queue depth, batch size, and the rate at which workers can drain work.

## Example model

Suppose a notification digest serves 200,000 active accounts.
If each account creates three events per day, the average write rate is only a few events per second, but a busy period may be many times higher.
If the digest is generated every hour, the read path may have a predictable burst at the top of each hour.
That pattern suggests smoothing writes with a queue and precomputing digest data rather than rebuilding every account synchronously.

## Leave room for reality

Use a peak multiplier, replication overhead, indexes, and temporary migration space when sizing storage.
Call out which estimate is uncertain.
An estimate is useful when it tells you whether one database, several partitions, or an asynchronous pipeline is a reasonable starting point.

# Architecture: follow the data through the system

The first diagram should show clients, an entry point, application services, durable storage, and any asynchronous workers.
The important detail is the direction of data flow.

## Request paths

For a write, show validation, authorization, durable persistence, event publication, and the response boundary.
For a read, show the cache lookup, the source of truth, the fallback when cached data is absent, and the shape of the returned result.
Mark work that can be delayed, such as search indexing, analytics, notifications, previews, and recommendations.

## Keep the synchronous path small

The request path should do the minimum work needed to give the user a correct acknowledgement.
Slow or fan-out work belongs behind a durable queue when the product allows eventual completion.
The queue needs an idempotency key, retry policy, visibility timeout, and a place for permanently failing messages.

## Scale by pressure, not fashion

Add a load balancer when stateless application instances need to share traffic.
Add caching when repeated reads justify the freshness tradeoff.
Partition data when one node cannot handle the volume or throughput.
Replicate data when availability or regional latency requires it.
Each addition should be tied to an observed bottleneck or an explicit requirement.

# Data and consistency choices

Choose storage around access patterns and correctness rules.
A relational database is a strong default when transactions, constraints, and flexible relationships are central.
A key-value or document store can simplify predictable access at large scale, but it shifts more modeling and integrity work into the application.

## Partitioning

Partition by a key that spreads load while keeping common queries local.
A user or tenant identifier is often easy to reason about, but a single popular tenant can still create a hot partition.
Hash-based placement spreads keys but can make range queries harder.
Range placement helps ordered scans but requires a strategy for hot ranges and uneven growth.

## Consistency

Define which reads must reflect the latest write and which can be delayed.
Use a single source of truth for decisions that affect money, permissions, or irreversible actions.
Use derived views, caches, and search indexes for read performance when their staleness is acceptable.
When several copies must converge, record the event or version that lets consumers detect missed or duplicated work.

## Caches and invalidation

Cache immutable or versioned data whenever possible.
For mutable data, choose a write-through, write-behind, or cache-aside approach and explain what happens after an update, deletion, or failure.
Include a maximum lifetime and a way to remove sensitive data before its normal expiration.

# Reliability, security, and operations

Failure planning should be part of the design rather than a final checklist.

## Failure behavior

Assume an instance, dependency, network link, worker, or region can fail.
Use bounded timeouts, exponential backoff with jitter, and idempotent operations so retries do not duplicate side effects.
Use a dead-letter path for messages that need inspection instead of retrying forever.
Describe what the user sees when a dependency is unavailable and which data remains safe.

## Availability and recovery

Replicas improve availability only when failover is tested and the data loss boundary is understood.
State the recovery point objective and recovery time objective in plain language.
Keep backups isolated from the primary failure domain, encrypt them, and practice restoring them.

## Security boundaries

Authenticate users and authorize every resource access at the service boundary.
Validate input, protect secrets, encrypt data in transit and at rest, and minimize the sensitive data retained in logs and analytics.
Add rate limits and abuse controls where an endpoint can be automated or used to amplify work.

## Observability

Track request latency, error rate, saturation, queue age, cache hit rate, replication lag, and business-level failures.
Use correlation identifiers to connect a user request with asynchronous work.
Alerts should point to an actionable failure mode instead of firing on every transient error.

# Worked design: a read-later link service

Consider a service where a user submits a web address and receives a private saved-link entry that can be opened later.
The exercise is intentionally scoped to saving, listing, opening, and deleting links for one account.

## Baseline design

The API authenticates the account, validates the address, and writes a link record containing the owner, an opaque identifier, the normalized address, timestamps, and an optional title.
A relational store is a reasonable starting point because ownership and deletion rules are important.
The list endpoint reads records by owner and creation time with a cursor rather than an offset.
The open endpoint checks ownership before returning the saved address.

## Growth points

The list path can use a cache for accounts that open the same collection frequently, but updates must invalidate or version the cached page.
Title extraction and preview generation should run asynchronously so a slow remote site does not hold the save request open.
The preview worker needs timeouts, size limits, an allowlist policy for outbound requests, and a retry limit.
If the service grows across regions, route reads near the user while keeping ownership changes on an authoritative write path.

## Follow-up questions

Ask whether links are private, shareable, or searchable.
Ask how quickly deletes must remove previews and cached content.
Ask whether the system needs import and export, abuse reporting, retention limits, or audit history.
Each answer changes the data model, authorization checks, asynchronous work, or consistency promise.
