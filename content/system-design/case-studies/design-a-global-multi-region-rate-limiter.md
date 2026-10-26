**Recent interview prompt signal:** Gotham Loop's public feed listed a Google L5 onsite question on October 20, 2026 about a distributed rate limiter handling one million requests per second across data centers with eventual consistency. Candidate-report feeds can be incomplete or inaccurate; use this as a practice prompt, not as a claim about Google's standard loop. [Source: Gotham Loop recently asked questions](https://www.gothamloop.com/)

## Prompt

Design a rate-limiting service for a global API. It must enforce limits by tenant and API key, allow short bursts, publish rule changes quickly, and keep request checks fast while regions can temporarily lose connectivity to one another.

Assume the system sees one million requests per second globally. State any other assumptions you need, including the request-check latency target and how much temporary over-limit traffic the business can tolerate.

## Requirements

- Decide whether a request is allowed before the protected API performs expensive work.
- Support limits at more than one scope, such as tenant, credential, user, IP address, and endpoint.
- Support sustained rates and short bursts, plus explicit exceptions for trusted clients.
- Let operators change limits, activate emergency blocks, and audit who changed a rule.
- Continue making a bounded decision when a region cannot reach the global control plane.

Do not assume every limit has the same fairness, latency, or abuse requirements.

## First design questions

Clarify which scopes must be enforced together and how a caller is identified. Ask whether the limit is a hard contractual quota, an abuse-control guardrail, or a fairness target; each implies a different tolerance for overshoot.

Ask whether rejected requests consume quota, whether retries count, how policy changes take effect, and what clients should receive when a limit is exceeded. Define the permitted error budget and regional failure behavior before selecting an algorithm.

## Estimation

Start with the given one-million-request-per-second global load. Estimate the peak share per region, the number of active keys, the number of rule checks per request, and the metadata or counter state per active key. Separate steady traffic from bursts.

Use the estimates to identify the hot path. A design that performs a synchronous cross-region write for every request is unlikely to meet a tight request latency target during a partition. A design with independent local counters may be fast, but can exceed a truly global limit.

## API and rule model

~~~text
POST /v1/decisions
  { tenant_id, credential_id, user_id, ip, route, cost }
  -> { allowed, retry_after_ms, policy_id, decision_id }

PUT /v1/policies/{policy_id}
  { scope, key, sustained_rate, burst_capacity, action, effective_at, version }

GET /v1/policies/{policy_id}
GET /v1/decisions/{decision_id}
~~~

Treat rule updates as versioned and auditable. Do not put raw credentials or unnecessary personal data in counter keys or logs. The policy service should validate ownership and scope before publishing a change.

## Architecture

~~~text
API gateway in each region
  -> local decision engine
       -> in-memory token buckets for hot keys
       -> regional state store for shared local counters
       -> cached, versioned policy bundle
Global policy service
  -> durable policy database and audit log
  -> change stream / regional distribution
Quota coordinator
  -> leases a bounded share of global quota to each region
~~~

Keep the per-request decision path in-region. Use a globally coordinated control plane for policy and quota allocation, with explicit bounds on stale configuration and unreported usage.

For global quotas, grant each region a lease or budget. A region decrements its local budget quickly and reports consumption asynchronously. Smaller leases reduce global overshoot but cause more coordination and can waste unused capacity; larger leases improve availability and utilization but permit more temporary excess. State the maximum acceptable overshoot and size the lease to that bound.

## Algorithm choices

- **Token bucket:** supports an average rate and a configurable burst. Store the last refill time and remaining tokens; refill on demand and cap at burst capacity.
- **Sliding window:** offers a closer rolling-window interpretation but costs more state or computation.
- **Fixed window:** is easy to implement, but a caller can send nearly twice the configured rate across a window boundary.
- **Concurrency limit:** complements rate limits when request duration or downstream pressure matters more than arrival rate.

Use a monotonic clock for elapsed time. Define how clock skew, duplicate retries, weighted requests, and multi-rule decisions affect token consumption.

## Consistency and regional partitions

A precise global counter requires coordination. During a network partition, the product must choose between rejecting traffic, allowing a bounded amount of extra traffic, or reducing each region to its preallocated share. Explain the choice in terms of customer impact and the business meaning of the quota.

A regional lease gives a measurable upper bound on overshoot. Leases should expire or be fenced so a recovered region cannot spend an old allocation after reassignment. If a region exhausts its lease while disconnected, choose a documented fallback: reject, use a smaller emergency reserve, or temporarily enforce only local abuse limits.

## Failure modes and abuse controls

- **Policy service unavailable:** continue with the last valid policy only for a bounded age; alert when the age limit is reached.
- **Counter store unavailable:** use a conservative local fallback with a short lifetime and record degraded decisions.
- **Hot tenant or key:** shard or replicate reads carefully; do not allow one key to saturate the shared state store.
- **Rule update races:** apply monotonically increasing versions and reject older updates.
- **Retry storm:** return a useful retry delay, add jitter in clients, and avoid retrying automatically without a budget.
- **Identity spoofing:** derive trusted identity at the gateway; do not rely on an untrusted client-supplied tenant id.
- **Emergency block:** define authenticated approval, propagation target, audit record, and a tested rollback path.

## Observability and rollout

Measure decision latency by region and policy scope, allow/deny rates, false-positive complaints, estimated global overshoot, stale-policy age, lease exhaustion, counter-store errors, and rule-propagation delay.

Shadow new rules before enforcing them. Compare decisions with the current policy, inspect affected tenants, and roll out by region or traffic percentage. Keep an explicit rollback and emergency override.

## Follow-up questions

- How would you enforce a strict contractual quota across regions during a partition?
- What changes if one request consumes a different amount of capacity than another?
- How do you avoid a hot key while preserving fair accounting?
- How should the system handle a sudden abusive client without blocking its entire tenant?
- What should happen when a tenant's policy is lowered below its current burst?
- How would you measure and limit false-positive throttling?
