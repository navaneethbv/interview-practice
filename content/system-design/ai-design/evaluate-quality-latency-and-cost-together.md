## Establish independent outcomes

A fluent answer can still use the wrong evidence, violate access rules, or fail to complete the requested task.
Evaluate these outcomes independently instead of collapsing them into one impression score.
Keep a development set for iteration and a held-out set for checking whether improvements generalize.

| Dimension | Example check | Failure to catch |
| --- | --- | --- |
| Retrieval | Relevant authorized document appears in candidates | Correct answer generated from memory despite bad retrieval |
| Grounding | Important claims have supporting evidence | Plausible claim not supported by a citation |
| Task success | Requested state exists in the backing system | Assistant says an operation succeeded when it did not |
| Authorization | Forbidden content and actions remain blocked | Answer cache crosses user boundaries |
| Latency | End-to-end percentiles and stage timings | Fast model but slow retrieval or tool calls |
| Cost | Measured tokens and external work per completed task | Cheap individual call repeated many times |

## Worked budget

Suppose a fictional request budget is 2,000 milliseconds.
Allocate 300 to retrieval, 200 to reranking, 1,200 to generation, and 300 to network and application overhead as an initial planning assumption.
Measure actual timings before presenting those numbers as achievable.
If generation dominates, reducing retrieval by 20 milliseconds will not materially solve the problem.
Streaming can improve time to first visible output while leaving total completion time unchanged.
Report both when the distinction matters.

## Build useful cases

Include ordinary tasks, ambiguous requests, tool timeouts, empty search results, stale data, and adversarial document text.
For nondeterministic behavior, repeat cases and inspect failure rates rather than trusting one successful run.
Use exact checks for identifiers and final state when possible.
Human review is useful for qualities that lack a simple exact check, but reviewers need a clear rubric and representative samples.

## Exercise

A new retriever improves evidence recall but doubles latency.
Propose an experiment comparing task success, forbidden-document exposure, latency percentiles, and cost on identical questions.
Decide what result would justify deployment before observing the outcome.
Keep failed examples as regression cases after correcting their cause.

## Source

[Anthropic's guide to agent evaluations](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) describes outcome-based evaluation and different grading approaches.
The budget, scenarios, and comparison exercise here are original practice material.
