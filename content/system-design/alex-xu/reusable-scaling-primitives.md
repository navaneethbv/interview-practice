Stateless application instances scale behind a load balancer when session state and durable data live elsewhere.
Caches reduce repeated work but require expiry, invalidation, and a plan for stale or sensitive data.
Queues smooth bursts and isolate slow work, but consumers need retries, idempotency, visibility timeouts, and dead-letter handling.
Object storage is useful for large immutable blobs, while a database can hold metadata and authorization state.

## Choose one source of truth

Derived indexes and caches should be rebuildable from authoritative data or events.
If two stores can both accept conflicting writes, define the conflict rule instead of hoping the copies converge correctly.
