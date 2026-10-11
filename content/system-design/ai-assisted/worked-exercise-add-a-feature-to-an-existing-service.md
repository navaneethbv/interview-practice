This is an original practice exercise.
Set a 45-minute timer, use an assistant, and narrate as if an interviewer were watching.

## The codebase

```text
jobs/
  queue.py        # JobQueue: submit(job), next() -> job or None, complete(job_id)
  worker.py       # Worker loop: job = queue.next(); run(job); queue.complete(job.id)
  models.py       # Job(id, kind, payload, attempts=0)
tests/
  test_queue.py   # FIFO order, complete removes job, next on empty returns None
```

`JobQueue` keeps pending jobs in a deque and in-flight jobs in a dict keyed by id.

## The task

Add retries: when a job fails, `worker.py` calls a new method `queue.fail(job_id)`.
A failed job returns to the queue with `attempts + 1` until it has failed 3 times; then it moves to a dead-letter list exposed by `queue.dead_letters()`.
Retried jobs must not run before jobs that were already waiting.

## A strong session

1. Read `queue.py` and run the tests (2 minutes).
2. Clarify: should a retried job go to the back of the queue? Is there a delay? Is `fail` called for unknown ids?
3. Write the tests first:

```python
def test_failed_job_is_retried_after_waiting_jobs():
    q = JobQueue(); a, b = Job("a", "email", {}), Job("b", "email", {})
    q.submit(a); q.submit(b)
    assert q.next().id == "a"
    q.fail("a")
    assert [q.next().id, q.next().id] == ["b", "a"]

def test_job_moves_to_dead_letters_after_three_failures():
    q = JobQueue(); q.submit(Job("a", "email", {}))
    for _ in range(3):
        q.next(); q.fail("a")
    assert q.next() is None
    assert [j.id for j in q.dead_letters()] == ["a"]
```

4. Prompt for the implementation of `fail` and `dead_letters`, naming the file and the tests.
5. Review the diff: does `fail` remove the job from the in-flight dict? Does it handle an unknown id explicitly? Is `attempts` incremented exactly once?
6. Run the tests, then discuss what would change with multiple workers (a lock around the deque and dict, or moving to a database row with a status column and `SELECT ... FOR UPDATE SKIP LOCKED`).

## Common failure points

- The generated `fail` appends to the front of the deque, so retries jump the line.
- It increments `attempts` on the in-flight copy but submits the original object.
- It silently ignores unknown ids, hiding worker bugs; raising or logging is a decision to state out loud.
