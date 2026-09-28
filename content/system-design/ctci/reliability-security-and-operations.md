Failure planning should be part of the design rather than a final checklist.

## Failure behavior

Assume an instance, dependency, network link, worker, or region can fail.
Use bounded timeouts, exponential backoff with jitter, and idempotent operations so retries do not duplicate side effects.
Use a dead-letter path for messages that need inspection instead of retrying forever.
Describe what the user sees when a dependency is unavailable and which data remains safe.

## Availability and recovery

Replicas improve availability only when failover is tested and the data loss boundary is understood.
State the recovery point objective and recovery time objective in plain language.
Keep backups isolated from the primary failure domain, encrypt them, and practice restoring them.

## Security boundaries

Authenticate users and authorize every resource access at the service boundary.
Validate input, protect secrets, encrypt data in transit and at rest, and minimize the sensitive data retained in logs and analytics.
Add rate limits and abuse controls where an endpoint can be automated or used to amplify work.

## Observability

Track request latency, error rate, saturation, queue age, cache hit rate, replication lag, and business-level failures.
Use correlation identifiers to connect a user request with asynchronous work.
Alerts should point to an actionable failure mode instead of firing on every transient error.
