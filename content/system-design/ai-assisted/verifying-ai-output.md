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
