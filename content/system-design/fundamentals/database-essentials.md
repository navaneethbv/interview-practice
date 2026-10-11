## Indexes

A B-tree index keeps keys sorted, supporting equality and range lookups in O(log n) and ordered scans.
A composite index on `(a, b)` serves queries on `a` and on `a` with `b`, but not on `b` alone.
Indexes speed reads and slow writes, because every insert and update maintains them.
LSM trees (used by Cassandra, RocksDB) buffer writes in memory and merge sorted files in the background, favoring write-heavy workloads.

## Transactions and isolation

ACID: atomicity, consistency, isolation, durability.
Isolation levels trade anomalies for concurrency:

| Level | Prevents | Still allows |
| --- | --- | --- |
| Read committed | Dirty reads | Non-repeatable reads, lost updates without care |
| Repeatable read / snapshot | Non-repeatable reads | Write skew |
| Serializable | All of the above | Nothing, at the cost of aborts or locking |

Many databases implement snapshot isolation with MVCC: readers see a consistent snapshot and do not block writers.

## Replication and partitioning

Leader-follower replication sends writes to one leader and reads can go to followers, which may lag.
Partitioning (sharding) splits data by key range or hash; choose a key that spreads load and keeps related data together.
Cross-partition transactions need two-phase commit or application-level patterns such as sagas.

## Normalization and denormalization

Normalize to avoid update anomalies; denormalize read paths when joins become the bottleneck, and keep the copies consistent with events or scheduled rebuilds.

## Questions to answer aloud

- Why might adding an index make a query slower?
- Two users withdraw from a shared account at the same time. Which isolation level or query prevents an overdraft?
- What breaks when you shard a table by user id and later need a report across all users?
