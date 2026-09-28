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
