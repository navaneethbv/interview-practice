# Lead a system design interview

These notes are an independently written study aid inspired by Alex Xu’s System Design Interview guide.
They organize reusable interview habits and design primitives without reproducing the book.

## A dependable conversation loop

Start by clarifying the user actions, scale, freshness, retention, privacy, and success criteria.
State assumptions aloud and ask which one the interviewer wants to change if the prompt is intentionally open-ended.
Sketch a broad design, walk through a request, find bottlenecks, and deepen only the parts that matter.

## Keep the discussion interactive

Explain why a component exists before discussing its implementation.
Invite tradeoffs instead of presenting a single design as inevitable.
When a concern is raised, update the diagram and describe the new failure mode or cost.

# Back-of-the-envelope estimation

Estimation gives the design a scale vocabulary.
Start with active users, requests per user, peak-to-average ratio, payload size, retention, and replication factor.
Convert those assumptions into requests per second, storage per day, bandwidth, and the number of machines or partitions implied by the load.

## Use ranges

An order-of-magnitude estimate is usually more useful than false precision.
Show the multiplication so an assumption can be changed without restarting the calculation.
Include headroom for bursts, indexes, replicas, migrations, and background work.

## Let the estimate choose the next detail

If one database comfortably handles the first scale, keep the design simple and explain when partitioning becomes necessary.
If a single dependency is already a bottleneck, make its partitioning, caching, or asynchronous path explicit early.

# Reusable scaling primitives

Stateless application instances scale behind a load balancer when session state and durable data live elsewhere.
Caches reduce repeated work but require expiry, invalidation, and a plan for stale or sensitive data.
Queues smooth bursts and isolate slow work, but consumers need retries, idempotency, visibility timeouts, and dead-letter handling.
Object storage is useful for large immutable blobs, while a database can hold metadata and authorization state.

## Choose one source of truth

Derived indexes and caches should be rebuildable from authoritative data or events.
If two stores can both accept conflicting writes, define the conflict rule instead of hoping the copies converge correctly.

# Rate limiting

A rate limiter protects a service from accidental overload and deliberate abuse.
Clarify whether the limit applies per user, token, IP, endpoint, tenant, or global service.

## Algorithm choices

A fixed window is simple but can allow bursts at a boundary.
A sliding window gives a smoother view of recent usage but costs more state.
A token bucket allows controlled bursts while enforcing a long-term refill rate.
Choose the algorithm based on the product promise and the cost of rejecting or delaying work.

## Placement and failure

An edge limiter can reject traffic early, while a service-level limiter understands authenticated identity and business cost.
Distributed counters need a consistency decision and a degraded-mode policy when the counter store is unavailable.
Return a retry hint and make rejection observable.

# Consistent hashing and key-value stores

Consistent hashing maps keys and nodes onto a ring so adding a node moves a smaller portion of keys than a full modulo scheme.
Virtual nodes can smooth uneven distribution, but the system still needs membership changes, replication, and hot-key protection.

## Key-value design

Define the key format, value size, read and write operations, expiration behavior, and durability promise.
Partition by a key that spreads load while keeping common operations local.
Replicate according to availability and consistency needs, and make rebalancing measurable and reversible.

# IDs, URLs, and crawlers

An ID service should define uniqueness, ordering, generation location, clock behavior, and the amount of information exposed in the identifier.
Time-based IDs can help ordered storage but require care when clocks move backward.

A URL shortener needs an ownership rule, collision handling, redirect latency, abuse controls, and analytics that do not slow redirects.
A crawler needs frontier management, politeness limits, deduplication, canonicalization, content limits, and a way to resume after failure.

## Separate hot and cold work

Redirects and crawl scheduling belong on a fast path, while analytics, previews, parsing, and reprocessing can move to queues.
The design should state which results are immediate and which are eventually consistent.

# Notifications, feeds, and chat

Notification systems combine user preferences, fanout, retries, delivery providers, and feedback about success or failure.
Use templates and idempotency keys so a retry does not send the same notification repeatedly.

For feeds, decide whether new posts are pushed into follower timelines or assembled when a reader opens the feed.
Push reduces read work but makes high-follower accounts expensive, while pull avoids large fanout but increases read cost.
A hybrid policy can treat ordinary and celebrity accounts differently.

Chat systems need durable message identity, ordering scope, online presence, reconnect behavior, and delivery semantics.
Do not promise global ordering when the product only needs ordering within one conversation.

# Media and file products

Large media should usually upload directly to object storage through scoped, expiring credentials.
Metadata, ownership, processing state, and access policy belong in a durable store.
Transcoding, thumbnails, virus scanning, indexing, and notifications should be asynchronous and observable.

For a drive-like product, define conflict handling, version history, sharing, deletion, and offline edits before selecting a synchronization protocol.
The last write is not always the correct winner when multiple devices can edit the same document.

# Close the design with tradeoffs

End by naming the current bottleneck, the next scaling step, the main failure mode, and the data that must remain correct.
Mention what the design intentionally does not solve.
That boundary shows control of scope and gives the interviewer a concrete path for follow-up questions.
