## Requirements

- Users schedule jobs to run once at a time or on a cron schedule.
- Each job run executes at least once; jobs are idempotent or receive a run id to deduplicate.
- Runs start within a few seconds of their scheduled time; history and logs are queryable.

Assume 10 million scheduled jobs and 20,000 runs per second at the top of each minute.

## API

```text
POST /jobs        {name, schedule: "0 * * * *" | run_at, payload, timeout_s, max_retries}
GET  /jobs/{id}/runs
POST /jobs/{id}/pause | resume
```

## Data model

```text
jobs(id, schedule, next_run_at, payload, owner, status)
runs(id, job_id, scheduled_at, state, attempt, worker_id, lease_expires_at, started_at, finished_at)
```

Index `jobs(next_run_at)` where status is active.

## Architecture

```text
API -> jobs DB
Scheduler (sharded by job id) -- every second: claim jobs with next_run_at <= now
          -> insert run row, compute next_run_at -> enqueue run id on a queue
Workers -> lease run -> execute -> heartbeat -> mark finished
Reaper -> requeue runs whose lease expired
```

## Deep dives

**Avoiding duplicate dispatch.** Partition jobs across scheduler instances by hash of id.
Within a partition, claim rows with an atomic update (`UPDATE ... SET next_run_at = &lt;next> WHERE id = ? AND next_run_at = &lt;old>`) so two schedulers that overlap during a rebalance cannot both dispatch.
Insert the run with a unique constraint on `(job_id, scheduled_at)`.

**At-least-once execution.** Workers hold a lease and heartbeat.
If a worker dies, the lease expires and the reaper requeues the run with `attempt + 1`.
Because a slow worker can still finish after its lease expires, jobs must be idempotent or check the run id.

**The top-of-the-minute spike.** Many cron jobs fire at `:00`.
Precompute runs a few seconds early into a time-bucketed queue, and spread jobs that do not need exact timing with jitter.

## Failure modes

- Scheduler partition owner dies: lease-based ownership moves the partition to another instance.
- Poison job that always crashes the worker: cap attempts, then move to a dead-letter state and alert the owner.
- Clock skew: use the database's clock for `now` in claims.

## Follow-up questions

- How would you support job dependencies (a DAG)? (Store edges, start a run when all upstream runs succeed, as Airflow-style workflow engines do.)
- How do you isolate noisy tenants? (Per-tenant concurrency limits and separate queues.)
