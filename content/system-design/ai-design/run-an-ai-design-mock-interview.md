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
