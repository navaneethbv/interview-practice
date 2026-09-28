Replication improves availability and read capacity, but copies introduce lag and conflict questions.

## Leader-based replication

A leader serializes writes and followers apply an ordered log.
Synchronous followers improve the durability boundary but add latency and reduce tolerance for slow replicas.
Asynchronous followers improve responsiveness but may be behind when a client reads from a different node.

## What users observe

Define whether a user must read their own write, whether reads may move backward, and whether related events must appear in order.
These are user-visible promises, not just database settings.
If the product can tolerate stale views, say how stale is acceptable and how the UI communicates that state.
