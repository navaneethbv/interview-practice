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
