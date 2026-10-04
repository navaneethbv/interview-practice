## Prompt and scope

Model a parking lot with small and large spaces.
A small vehicle fits either type; a large vehicle fits only a large space.
Issue a ticket on entry, charge on exit, and reject entry when no suitable space is free.
Assume a single site and an in-memory implementation before discussing persistence.

## Model and invariants

```text
ParkingLot owns Space[] and active Ticket records
    | uses AllocationPolicy to choose a compatible free space
    | uses PricingPolicy to calculate an exit charge
    + uses Clock for deterministic entry and exit times

Ticket: ticketId, spaceId, vehicleId, enteredAt, status
Space: spaceId, size, occupiedByTicketId
```

An active ticket owns exactly one space, and a space has at most one active ticket.
Ticket identifiers are unique and cannot be reused to free another vehicle's space.
Keep money in integer minor units for this exercise and define how partial billing intervals round.

## Operations and walkthrough

`enter(vehicle)` selects and claims a space in one critical section, then returns a ticket.
`quote(ticketId)` computes a price without changing occupancy.
`exit(ticketId, paymentConfirmation)` validates the payment and closes the ticket before releasing the space within the local consistency boundary.
A repeated successful exit should return the recorded receipt rather than charge again.

Suppose S1 is small, L1 is large, and both are free.
Vehicle A is small and receives S1, leaving L1 available for large vehicle B.
A third large vehicle is rejected.
When A exits, only S1 becomes free; the large vehicle must still wait.
This example catches allocation policies that waste the only large space unnecessarily.

## Tests and extensions

Test incompatible vehicles, a full lot, unknown tickets, repeated exits, and two simultaneous entries competing for the last space.
Inject a clock and payment result so tests are deterministic.
If payment succeeds but the process crashes before exit is recorded, persistence and reconciliation become necessary; a local lock alone cannot resolve the external payment outcome.

An interview follow-up might add reservations or multiple entrances.
Describe how the invariant changes before introducing more classes.
Prefer a simple scan initially; indexed free-space sets improve allocation cost when measurements or scale justify them.
