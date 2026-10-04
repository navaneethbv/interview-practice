## Prompt and scope

Implement an in-memory scheduler for tasks that become eligible at a specified time.
Support cancellation, retries after explicit failures, and a bounded number of workers.
State that process restarts lose tasks in the initial version.
Durability is a follow-up requirement.

## Model and state

```text
Scheduler -> priority queue ordered by (dueAt, sequence)
          -> task registry keyed by taskId
          -> WorkerPool with bounded concurrency
          -> Clock

PENDING -> RUNNING -> SUCCEEDED
                  -> RETRY_WAIT -> RUNNING
                  -> FAILED
PENDING or RETRY_WAIT -> CANCELLED
```

A task is claimed by at most one worker at a time.
A cancelled pending task cannot subsequently start.
Cancellation of a running task is cooperative unless the task's execution environment supports a stronger guarantee.
Keep the public contract honest about that distinction.

## Worked execution

At time 10, tasks A and B are due at 12 and task C is due at 20.
With one worker and an insertion sequence tie-breaker, A starts at 12 and B remains eligible until A releases the worker.
If A explicitly fails, schedule its retry at a later due time rather than blocking the queue with a sleeping worker.
A stale queue entry for a cancelled task is ignored after checking its current registry state.

## Complexity and tests

A heap provides O(log n) insertion and removal of the earliest task.
A registry supports expected O(1) lookup by task identifier.
Lazy cancellation can leave stale heap entries, so explain when compaction or indexed removal becomes necessary.

Test equal due times, cancellation before claim, retry exhaustion, capacity saturation, and a task that submits another task.
Use a controllable clock so tests advance time without sleeping.
Do not hold the scheduler lock while executing user work.

## Persistence follow-up

A durable queue needs a claim mechanism, recovery for abandoned work, and idempotent effects.
If a worker performs an effect and crashes before recording success, retrying can repeat that effect.
Leases and heartbeats help detect abandoned ownership; they do not by themselves create exactly-once external effects.
Describe an idempotency key or transactional boundary appropriate to the destination.
