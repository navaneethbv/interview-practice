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
