These notes are an independently written study aid inspired by the system design chapter of Cracking the Coding Interview.
They do not reproduce the book, and the official resource is linked from the reader for credit.
System design interviews reward clear reasoning under incomplete requirements.
The goal is not to name every technology, but to make the important assumptions visible and show how the design changes when those assumptions change.

## Start with the contract

Write down the user actions the system must support before choosing components.
Separate must-have behavior from useful follow-ups such as analytics, moderation, administration, exports, or billing.
Ask how fresh the result must be, how long data is retained, whether requests are authenticated, and what failure the user can tolerate.

## A practical sequence

1. Clarify the product behavior and the most important non-functional requirements.
2. Estimate the request, storage, and bandwidth ranges that matter to the first design.
3. Draw the simplest end-to-end architecture that satisfies the contract.
4. Walk one read and one write through the system.
5. Identify the first bottlenecks and revise only the parts that need to scale.

Keep the diagram broad at first.
A short explanation of why a component exists is more valuable than a long list of vendor names.

## Make tradeoffs explicit

Every major choice should answer a question about the product.
A cache favors fast repeated reads but introduces freshness and invalidation concerns.
A queue protects the request path from slow work but introduces delayed completion and retry handling.
Denormalized data can make reads predictable but requires a plan for keeping copies consistent.

When the interviewer changes a requirement, update the affected assumption, flow, or data model rather than restarting the entire design.
