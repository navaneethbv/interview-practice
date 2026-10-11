Each chapter is an original worked design for a prompt that comes up often in system design interviews.
They follow the same order you would use in a 45-minute round: requirements, estimates, API, data model, architecture, deep dives, failure modes, and the follow-up questions an interviewer is likely to ask.
Numbers are illustrative assumptions; state your own and adjust the design when they change.
Reviewed October 11, 2026.

## Before reading a chapter

Cover the solution and spend 10 minutes on the prompt yourself:

1. Write the functional requirements and three non-functional ones.
2. Estimate peak reads and writes per second and storage per year.
3. Sketch the components on paper.
4. Pick the hardest part and decide how you would make it correct.

Then compare.
The goal is not to match the chapter, but to notice which trade-offs you missed.

## Shared vocabulary

- **Idempotency key:** a client-chosen identifier that makes retries of the same request safe.
- **Outbox:** writing an event to a table in the same transaction as the state change, then publishing it asynchronously.
- **Fan-out on write / read:** doing work when data is produced versus when it is requested.
- **Hot key:** a single key receiving a disproportionate share of traffic.
