Low-level design connects a domain's rules to objects, operations, and tests.
A useful answer explains what the model prevents as well as what it can represent.
Do not begin by listing design patterns.
Begin with one user journey, the state it changes, and the invariants that must survive failure or concurrency.
Reviewed October 4, 2026.

## A repeatable sequence

1. Clarify the actors, supported operations, and exclusions.
2. Walk through one successful request and one rejected request.
3. Identify entities with identity and values compared by their contents.
4. Put each invariant behind a small operation with an explicit result.
5. Draw ownership and collaboration between objects.
6. Test state transitions before adding extension points.

## Example boundary

For a reservation, the rule is not merely that a `Seat` has an `available` flag.
The rule is that no two active reservations may own the same seat for an overlapping interval.
A method that checks availability and a separate method that marks the seat occupied leave a race between them.
A single reservation operation must enforce the rule atomically within the chosen storage or synchronization boundary.

```text
User action -> ReservationService -> ReservationStore
                       |
                       +-> AvailabilityPolicy
```

In an in-memory interview exercise, a lock around the check and update can express that boundary.
In a persistent application, a transaction and suitable constraint may be necessary.
Explain which environment your answer assumes rather than claiming that one object solves distributed coordination.

## What to draw and test

A diagram should show who owns mutable state and who calls whom.
Use composition for independently varying behavior, such as pricing, when the problem actually asks for that variation.
An interface is justified when it separates a stable contract from a changing implementation or makes a failure boundary testable.

Test successful transitions, invalid transitions, duplicate requests, and competing requests.
For every new requirement, ask whether it changes a domain rule or only an implementation detail.

## Source and scope

[Amazon lists object-oriented design among interview topics](https://amazon.jobs/content/en/how-we-hire/interview-prep/software-development-topics).
The four exercises in this guide are original practice scenarios, not claims about questions asked by a particular employer.
