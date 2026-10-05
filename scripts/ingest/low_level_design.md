# Model behavior before drawing classes

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

# Design a parking lot

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

# Design an elevator controller

## Prompt and scope

Model two elevators in a ten-floor building.
Support hall calls with a direction, internal floor selections, and emergency stop behavior.
This is a software modeling exercise, not a certified physical control design.
Assume a separate safety subsystem authorizes motion and door operations.

## State and responsibilities

```text
Dispatcher -> assigns hall calls -> ElevatorController
                                    | owns mode and target stops
                                    | reads PositionSensor
                                    + requests Motor and Door actions

Mode: IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN, OUT_OF_SERVICE
```

The dispatcher chooses an eligible elevator but does not directly operate its motor.
The controller decides the next safe transition.
Represent floor number and travel direction separately so a hall request is not confused with an internal destination.

## Scheduling walkthrough

Elevator A is at floor 2 moving up toward floor 7.
Elevator B is idle at floor 9.
A caller at floor 4 wants to go up.
A simple directional policy assigns A because it can serve the request on its current route.
A caller at floor 4 wanting to go down may receive B or wait for A's return, depending on the stated policy.
Distance alone ignores direction and scheduled work.

Use a sorted collection of stops in each direction and deduplicate repeated button presses.
Complete the current sweep before reversing unless the policy defines an explicit exception.
Track waiting time so continuous traffic in one direction does not starve other requests.

## Safety invariants and tests

Do not request motion while the door is open.
Do not accept a target outside the building's range.
An out-of-service elevator cannot receive new assignments.
When it becomes unavailable, outstanding hall calls return to the dispatcher rather than disappearing.

Use a fake clock and scripted sensor events to test arrival, door closing, reversal, duplicate calls, and a failed sensor.
An event claiming arrival at an unexpected floor must produce an explicit fault decision, not silently update the state.

## Follow-up

Add priority service or a third elevator without changing the controller's safety rules.
Explain the tradeoff between average waiting time, worst-case waiting time, and predictable behavior.
A useful design keeps scheduling policy separate from state transitions while acknowledging that real motion control requires additional engineering.

# Design a vending machine

## Prompt and scope

A machine accepts coins, sells one selected product per transaction, returns change, and permits cancellation before dispensing.
Assume a fixed set of coin denominations and finite inventory.
Define how the machine handles a jam or inability to make change.

## Model

```text
VendingMachine -> Session(balance, selection, state)
               -> ProductInventory
               -> CoinInventory
               -> Dispenser

IDLE -> ACCEPTING -> READY -> DISPENSING -> COMPLETE
                  \-> CANCELLED
                            DISPENSING -> NEEDS_RECOVERY
```

Store monetary amounts as integer minor units.
The session owns the inserted-credit ledger; inventory owns the counts of products and coins.
Do not equate enough total money with the ability to produce exact change.

## Worked example

A product costs 135 units and the customer inserts 200.
The machine needs change of 65.
If available coins are one 50, one 10, and one 5, it can reserve those coins and one product before dispensing.
If there is no 5 and no other combination makes 65, reject the purchase or ask for exact payment while preserving the customer's credit.
A greedy change algorithm is not valid for every possible denomination set and bounded inventory.
For small fixed amounts, a bounded search or dynamic program can determine feasibility.

## Transaction boundary

Validate product availability and change feasibility before requesting physical delivery.
Reserve the necessary inventory so another session cannot consume it.
On a confirmed successful dispense, finalize the sale and release change.
If the hardware reports an uncertain outcome, record a recovery state instead of blindly retrying and possibly dispensing twice.
The software must distinguish a definite failure from missing confirmation.

## Tests

Test exact payment, insufficient balance, unavailable products, impossible change, cancellation, duplicate button presses, and a jam after reservation.
A cancellation before dispensing should refund the session's credit without changing product inventory.
After an uncertain physical action, recovery needs a hardware-specific policy rather than an invented rollback guarantee.

## Follow-up

Introduce card payments by separating payment authorization from inventory and dispensing.
Discuss the new failure windows before adding a payment interface to the diagram.

# Design a task scheduler

## Prompt and scope

Implement an in-memory scheduler for tasks that become eligible at a specified time.
Support cancellation, retries after explicit failures, and a bounded number of workers.
State that process restarts lose tasks in the initial version.
Durability is a follow-up requirement.

## Model and state

```text
Scheduler -> priority queue ordered by (dueAt, sequence)
          -> task registry keyed by taskId
          -> WorkerPool with bounded concurrency
          -> Clock

PENDING -> RUNNING -> SUCCEEDED
                  -> RETRY_WAIT -> RUNNING
                  -> FAILED
PENDING or RETRY_WAIT -> CANCELLED
```

A task is claimed by at most one worker at a time.
A cancelled pending task cannot subsequently start.
Cancellation of a running task is cooperative unless the task's execution environment supports a stronger guarantee.
Keep the public contract honest about that distinction.

## Worked execution

At time 10, tasks A and B are due at 12 and task C is due at 20.
With one worker and an insertion sequence tie-breaker, A starts at 12 and B remains eligible until A releases the worker.
If A explicitly fails, schedule its retry at a later due time rather than blocking the queue with a sleeping worker.
A stale queue entry for a cancelled task is ignored after checking its current registry state.

## Complexity and tests

A heap provides O(log n) insertion and removal of the earliest task.
A registry supports expected O(1) lookup by task identifier.
Lazy cancellation can leave stale heap entries, so explain when compaction or indexed removal becomes necessary.

Test equal due times, cancellation before claim, retry exhaustion, capacity saturation, and a task that submits another task.
Use a controllable clock so tests advance time without sleeping.
Do not hold the scheduler lock while executing user work.

## Persistence follow-up

A durable queue needs a claim mechanism, recovery for abandoned work, and idempotent effects.
If a worker performs an effect and crashes before recording success, retrying can repeat that effect.
Leases and heartbeats help detect abandoned ownership; they do not by themselves create exactly-once external effects.
Describe an idempotency key or transactional boundary appropriate to the destination.
