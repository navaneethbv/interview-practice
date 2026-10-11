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
