Consistent hashing maps keys and nodes onto a ring so adding a node moves a smaller portion of keys than a full modulo scheme.
Virtual nodes can smooth uneven distribution, but the system still needs membership changes, replication, and hot-key protection.

## Key-value design

Define the key format, value size, read and write operations, expiration behavior, and durability promise.
Partition by a key that spreads load while keeping common operations local.
Replicate according to availability and consistency needs, and make rebalancing measurable and reversible.
