# Design document search with RAG

## Prompt and requirements

Design an assistant that answers questions from a company's internal documents and cites the evidence it used.
Assume documents change, different employees have different access, and some questions have no supported answer.
Begin by asking about corpus size, update delay, acceptable latency, and the consequences of an incorrect answer.
This is an original design exercise reviewed October 4, 2026.

## Architecture

```text
Documents -> parse and normalize -> chunks with document/version/access metadata
                                  -> lexical and vector indexes

Question + verified user identity -> authorized retrieval -> candidate reranking
                                  -> selected evidence -> answer + citations
```

Choose a simple baseline before adding an agent.
For a small authorized document set, passing the relevant documents directly may be sufficient.
For a larger corpus, retrieval limits the evidence sent to the model.
Lexical search helps exact identifiers; semantic search helps paraphrases.
Compare them with a combined approach using the same held-out questions.

## Worked example

A user asks whether contractors can access the staging environment.
An old policy permits access, but the current policy requires a named sponsor.
Store document versions and effective dates, retire superseded chunks, and cite the current policy.
A semantically similar document is not automatically authoritative.
If two current sources disagree, show the conflict or route the question to an owner instead of inventing a resolution.

## Security and freshness

Apply authorization while selecting candidates and recheck it before presenting evidence.
Include access scope in cache keys; a globally cached answer can leak another user's documents.
A revoked document must stop appearing in results even if its embedding or cached answer remains stored temporarily.
Treat retrieved instructions as document content, not permission to operate tools or change the assistant's task.

## Measure and challenge

Build a small evaluation set with exact lookups, paraphrases, no-answer cases, stale documents, conflicting policies, and forbidden documents.
Measure whether the correct evidence was retrieved separately from whether the answer faithfully used it.
Test citations by resolving them back to the same document version.
A high retrieval score does not establish answer correctness.

Follow up by doubling the corpus and tightening the latency budget.
Discuss which stages can be cached, what must be invalidated, and what quality you would measure before reducing candidate counts.

## Source

[Anthropic's Contextual Retrieval article](https://www.anthropic.com/engineering/contextual-retrieval) discusses lexical and embedding retrieval, chunk context, and reranking.
The authorization scenario and proposed checks here are original design exercises.

# Design a support assistant with bounded actions

## Prompt

Design an assistant that can explain an order's status and help a customer request a return.
The assistant may read authorized order data, but refunds and other consequential actions require the application's normal authorization and confirmation process.
Clarify which actions are supported before choosing any autonomous behavior.

## Separate answer generation from execution

```text
Authenticated customer -> intent and context
                         |-> read-only order lookup -> explanation
                         +-> proposed return request -> policy validation
                                                     -> customer confirmation
                                                     -> recorded operation
```

A deterministic workflow is suitable when the business steps are known.
Use a model to interpret a request or draft an explanation where that variability is useful.
The model does not decide whether an order belongs to the customer or whether a refund is permitted.
Trusted application logic validates identifiers, permissions, amounts, and state transitions.

## Worked failure sequence

The customer asks for a return, confirms it, and the application records operation R17.
The response is lost before the customer sees it.
On retry, the same operation identifier should recover the prior result rather than create a second return.
If the downstream system gives no definitive result, show a pending state and reconcile it.
An uncertain response is not evidence that the action failed.

## Bound the work

Limit the number of steps, elapsed time, and resource consumption per request.
Give tools only the fields and permissions they need.
Log decisions and outcomes with redaction so operators can investigate failure without retaining unnecessary customer data.
If a request falls outside the supported workflow, ask for clarification or hand it to a human with relevant context.

## Review questions

- What prevents one customer from reading another customer's order?
- What happens if an order note contains instructions to ignore the policy?
- Can a repeated confirmation create a second operation?
- How does a human take over without losing the pending state?
- Which steps still work if the model is unavailable?

## Source

[Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents) distinguishes predefined workflows from model-directed agents and recommends starting with simpler designs.
This exercise applies that distinction to an original support workflow.

# Evaluate quality, latency, and cost together

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

# Run an AI design mock interview

## Scenario

A team wants an assistant that searches operational runbooks and proposes incident-response steps.
The initial version must not execute those steps.
Run a 45-minute practice session with a partner, then reverse roles.
The timing is a practice format rather than a claim about a company's interview process.

## Interview sequence

Spend five minutes clarifying users, sensitive information, failure consequences, and the allowed actions.
Use ten minutes to draw ingestion, retrieval, authorization, answer generation, and monitoring.
Use fifteen minutes to examine a difficult failure, such as a retired runbook or instructions embedded in a log excerpt.
Reserve ten minutes for evaluation, operational cost, and rollout.
Use the final five minutes to summarize the tradeoffs and unresolved assumptions.

## Pressure changes

Your partner should introduce one of these changes after the initial design:

- A document's access is revoked while its answer is cached.
- Two runbooks disagree about the correct recovery sequence.
- Retrieval is unavailable during an incident.
- A team wants to let the assistant restart a service automatically.
- The model produces a correct answer with a citation to the wrong document.

Explain which boundary changes in response.
Automatic execution, for example, adds authorization, confirmation, idempotency, and recovery concerns that were absent from the read-only design.
Do not treat it as merely adding another tool call.

## Self-assessment

Score requirements, data flow, access control, failure handling, evaluation, and communication from zero to two.
Zero means missing, one means named, and two means explained with a concrete mechanism and tradeoff.
A diagram full of product names earns no credit unless the components have clear responsibilities.
Afterward, write the weakest assumption and a practical way to test it.
A useful next iteration addresses that weakness rather than adding more architecture.
