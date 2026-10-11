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
