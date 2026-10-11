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
