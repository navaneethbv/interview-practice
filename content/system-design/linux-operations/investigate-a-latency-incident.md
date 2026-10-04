## Scenario

A fictional service's p95 request latency increases from 200 milliseconds to two seconds after a release.
Error rate remains low, CPU is moderate, and database connection-pool waiting time rises.
Your task is to propose the next investigation and a reversible mitigation, not to guess the final root cause.
Reviewed October 4, 2026.

## Follow the request path

```text
Incoming request -> application queue -> connection-pool wait
                 -> database execution -> serialization -> response
```

Break total latency into stages before optimizing one component.
Low CPU does not rule out saturation of a smaller shared resource such as the connection pool.
Compare affected endpoints, release cohorts, traffic volume, query duration, active connections, and time spent waiting for a connection.
Check whether the application holds a connection while performing unrelated remote work.

## Hypothesis and discriminating evidence

A release may have lengthened transactions, leaked connections, or increased query count per request.
These hypotheses imply different evidence.
Long transaction duration supports the first; a steadily growing borrowed-connection count after traffic subsides supports the second; query count per request supports the third.
One correlated metric is a starting point, not proof.

## Mitigate and verify

If the previous version is known to handle the current workload and rollback is compatible with data changes, reverting the release may reduce impact while investigation continues.
Reducing concurrency or shedding lower-priority work may help when the database is overloaded.
Increasing the pool without checking database capacity can move the queue downstream and worsen the incident.

After mitigation, inspect latency distributions, queue age, request volume, and errors together.
A lower latency caused by dropping most requests is not an unqualified recovery.
Record the affected period, evidence, decision, and remaining uncertainty for the handoff.

## Interview follow-up

What changes if only one customer is affected?
Consider a hot tenant, unusually expensive queries, skewed data, or a tenant-specific dependency.
Propose a safe way to compare affected and unaffected requests without logging sensitive payloads.
A strong answer narrows the fault domain and chooses measurements that separate competing explanations.
