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
