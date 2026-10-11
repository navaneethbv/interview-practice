# What changed and how these rounds are graded

Some companies now run a coding round in which the candidate may use an AI assistant inside the interview IDE.
Reports from 2025 and 2026 describe Meta replacing one onsite coding round with a 60-minute AI-assisted round in CoderPad, and Google piloting a round built around an existing codebase.
Vendors such as CodeSignal, CoderPad and HackerRank now offer AI-enabled interview environments.
Adoption is uneven: CoderPad's 2026 survey reported that about a third of hiring teams still ban AI tools entirely.
Ask your recruiter which format each round uses, which assistant and models are available, and whether you may search documentation.
Reviewed October 11, 2026.

## What the interviewer is measuring

The assistant writes code quickly, so typing speed and syntax recall matter less.
What remains visible is judgement:

- Do you understand the problem and the existing code before asking for changes?
- Do you break the work into steps small enough to verify?
- Do you read and test what the assistant produced, or paste it and hope?
- Can you explain every line you keep, including the ones you did not type?
- Do you notice when the assistant is confidently wrong, and recover quickly?

Several guides note that the behavior most often penalized is accepting generated code that the candidate cannot explain.

## How the round differs from a classic one

| Classic round | AI-assisted round |
| --- | --- |
| One self-contained function | Several files, often an existing project with tests |
| You write every line | You direct, review and edit generated code |
| Recall of algorithms is central | Reading code, decomposing work and verifying results are central |
| Hidden tests decide correctness | You are expected to run and extend the tests yourself |

Classic algorithm skills still matter.
You need them to judge whether a generated solution has the right complexity, to spot an off-by-one, and to choose the next step when the assistant stalls.

## Sources

- [Formation: AI-assisted coding interviews](https://formation.dev/blog/ai-assisted-coding-interviews)
- [Formation: 3 ways AI has changed FAANG interviews in 2026](https://formation.dev/blog/3-ways-ai-has-changed-faang-interviews-in-2026)
- [Exponent: Google's AI coding interview](https://www.tryexponent.com/blog/google-ai-coding-interview)
- [Interview Query: CodeSignal agentic assessments](https://www.interviewquery.com/p/codesignal-ai-assisted-technical-interviews)
- [Interview Query: CoderPad's 2026 interview format](https://www.interviewquery.com/p/coderpad-tech-interview-2026-format)

These are secondary reports; confirm the details for your own loop.

# A workflow for a 60-minute round

The most reliable approach is the same loop a careful engineer uses with an assistant at work: understand, plan, make one small change, verify, repeat.

## Minutes 0 to 10: understand before generating

1. Restate the task and ask clarifying questions, as in any interview.
2. Skim the repository layout, the entry point and the existing tests.
3. Run the tests once so you know what passes before you change anything.
4. Say out loud which files you expect to change and why.

It is fine to ask the assistant to summarize a file, but check the summary against the code before relying on it.

## Minutes 10 to 45: small, verified steps

Split the task into steps that each end with something you can run.
For each step:

1. Write a precise prompt: the file, the function, the behavior, the constraints, and what must not change.
2. Read the diff before accepting it. Look for invented APIs, changed signatures, swallowed errors and edge cases it skipped.
3. Run the relevant tests. Add a test when the behavior is new.
4. Narrate what you checked and what you would still worry about in production.

When the output is wrong, say so and correct course quickly: tighten the prompt, give the failing test as context, or write the tricky part yourself.

## Minutes 45 to 60: harden and explain

- Run the full test suite.
- Walk through edge cases: empty input, duplicates, concurrency, large inputs, failure of a dependency.
- State the complexity of the core path.
- Summarize the change as you would in a pull request description.

## Prompts that work

Weak prompt:

```text
Add retries.
```

Specific prompt:

```text
In client/http.py, make fetch() retry up to 3 times on HTTP 502, 503 and 504 and on connection errors,
with exponential backoff starting at 100 ms. Do not retry 4xx responses. Keep the function signature.
Add tests in tests/test_http.py for: success on the second attempt, giving up after 3 attempts,
and no retry on 404.
```

The specific prompt names the location, the behavior, what to leave alone, and how success will be checked.

# Reading an unfamiliar codebase quickly

AI-assisted and code-comprehension rounds often begin with a project you have never seen.
A structured first pass saves more time than generating code early.

## A ten-minute reading plan

1. **Entry points.** Find `main`, the HTTP routes, the CLI parser or the public API.
2. **Data model.** Find the core types and how they are stored.
3. **One request end to end.** Follow a single operation from input to output, noting each module it touches.
4. **Tests.** Read the tests for the area you will change; they document intended behavior better than comments.
5. **Conventions.** Note error handling, logging, naming and dependency injection so your change fits in.

Write a short map as you go:

```text
POST /orders -> api/orders.py:create_order
             -> services/pricing.py:quote   (pure, unit-tested)
             -> repo/orders.py:insert       (SQLite, transaction per request)
             -> events/publish.py           (fire-and-forget, no retry)
```

## Questions to ask yourself out loud

- Where is the invariant enforced, and could my change bypass it?
- Is this code called from more than one place?
- What happens on failure halfway through?
- Which tests will tell me I broke something?

## Using the assistant to read

Good uses: "List the callers of `quote`", "Explain what this regular expression accepts", "Which tests cover order cancellation?".
Always confirm with search or by opening the file.
Assistants summarize plausibly even when they are wrong about details such as which branch handles an error.

# Verifying AI output

Generated code fails in predictable ways.
Reviewing against a checklist is faster than reading line by line with no plan.

## Review checklist

- **Interfaces.** Did it call functions or library APIs that do not exist, or change a public signature?
- **Scope.** Did it touch files or behavior you did not ask about?
- **Errors.** Are exceptions caught too broadly, ignored, or logged and then lost?
- **Edge cases.** Empty input, null, duplicates, boundaries, Unicode, time zones.
- **Concurrency.** Shared state without synchronization, check-then-act races.
- **Complexity.** A nested loop or repeated query where the original path was linear.
- **Security.** String-built SQL or shell commands, secrets in logs, missing authorization checks.
- **Tests.** Do the new tests assert behavior, or do they only execute code? Would they fail if the feature were removed?

## Make tests do the verification

Ask for tests first, or write them yourself, then ask for the implementation.
A test written before the code is an independent check; a test generated alongside the code tends to mirror the code's assumptions, including its bugs.

```python
def test_retry_gives_up_after_three_attempts(fake_server):
    fake_server.respond_with(503, times=5)
    with pytest.raises(UpstreamUnavailable):
        fetch("/inventory")
    assert fake_server.request_count == 3
```

## When to stop prompting and write it yourself

If two prompts in a row produce the same wrong behavior, the assistant is missing context or the problem is subtle.
Write the core logic yourself and use the assistant for boilerplate, tests or renaming.
Interviewers notice when you recognize this point.

# Worked exercise: add a feature to an existing service

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

# Worked exercise: debug with an assistant

Debugging rounds test whether you form hypotheses and check them, rather than asking the assistant to "fix the bug".

## The report

Users report two problems with the "last 7 days" revenue chart: the bar for today is always empty, and some late-evening orders appear under the following day.
The function is:

```python
def daily_revenue(orders, today, days=7):
    start = today - timedelta(days=days)
    totals = defaultdict(int)
    for o in orders:
        if start < o.created_at.date() < today:
            totals[o.created_at.date()] += o.amount_cents
    return [totals[start + timedelta(days=i)] for i in range(1, days + 1)]
```

## A strong session

1. Reproduce it with a test before touching the code:

```python
def test_includes_today():
    today = date(2026, 3, 10)
    orders = [Order(created_at=datetime(2026, 3, 10, 9), amount_cents=500)]
    assert daily_revenue(orders, today)[-1] == 500
```

2. State hypotheses: the filter excludes `today`; time zones shift late orders to the next day; the output window is off by one.
3. Check them one at a time. The test fails because `< today` excludes today, while the returned window ends at `start + 7 days = today`.
4. Fix the comparison to `start < day <= today` and rerun. That explains the empty bar but not the second symptom: `created_at` is stored in UTC while "today" is the user's local date, so an order at 21:00 in New York is dated the next day.
5. Propose converting timestamps to the user's zone before taking `.date()`, and add a test for an order at 23:30 local time.

An assistant asked to "fix the bug" will usually change the comparison and stop; the interview signal is finding the second cause.

# Rubric and a mock interview plan

## Self-review rubric

Score each from 1 (needs work) to 4 (strong) after a practice session.

| Signal | Strong looks like |
| --- | --- |
| Understanding | Read the code and ran the tests before generating; asked clarifying questions |
| Decomposition | Small steps, each verified before the next |
| Prompting | Specific prompts with location, behavior, constraints and tests |
| Verification | Reviewed every diff, wrote or read tests that would fail if the feature broke |
| Ownership | Could explain every line kept; rewrote parts the assistant got wrong |
| Communication | Narrated decisions and trade-offs; summarized the change at the end |

## Practice plan

1. Pick a small open-source project in a language you know, or one of your own.
2. Write a feature request and a bug report for it, or reuse the two exercises in this guide.
3. Run a 60-minute session with a timer and screen recording, using the assistant your target company provides if you know it.
4. Watch the recording and score yourself with the rubric. Note every point where you accepted code you had not read.
5. Repeat with a different codebase; the reading skill improves fastest with variety.

Keep practicing classic problems in the workspace as well.
They remain part of most loops, and they train the judgement you use to review generated code.
