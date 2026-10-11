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
The exercises in this guide are original practice scenarios, not claims about questions asked by a particular employer.

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

# Design an expense-splitting app

## Prompt and scope

Users in a group record shared expenses and see who owes whom.
An expense has a payer, an amount and a split: equal, exact amounts or percentages.
Show each user's net balance and a short list of payments that settles the group.
Assume one currency and amounts in cents.
Reviewed October 11, 2026.

## Model and invariants

```text
Group(id, members)
Expense(id, group_id, payer, amount_cents, splits: list[Split], created_at)
Split(user, amount_cents)
BalanceSheet: user -> net cents (positive means the user is owed money)
```

The splits of an expense must sum exactly to its amount.
The net balances of a group always sum to zero.
Make split strategies separate classes behind one interface, because the rules for computing shares really do vary:

```python
class SplitStrategy:
    def shares(self, amount_cents, participants, params) -> dict[str, int]: ...

class EqualSplit(SplitStrategy):
    def shares(self, amount_cents, participants, params):
        base, extra = divmod(amount_cents, len(participants))
        # Give the leftover cents to the first participants so the total is exact.
        return {u: base + (1 if i < extra else 0) for i, u in enumerate(participants)}
```

## Operations and walkthrough

Adding an expense validates the split, stores it, and updates balances: the payer gains the amount, each participant loses their share.
Alice pays 100.00 for Alice, Bob and Carol split equally: shares are 33.34, 33.33 and 33.33.
Balances become Alice +66.66, Bob -33.33, Carol -33.33.

To settle, repeatedly match the largest debtor with the largest creditor and record a payment of the smaller absolute balance.
This produces at most n - 1 payments.
Finding the true minimum number of payments is NP-hard in general, so say that the greedy result is short but not always minimal.

## Tests and extensions

Test rounding (100 cents across 3 people), percentages that do not sum to 100, a payer not in the split, and deleting an expense (which reverses its balance changes).
Extensions: multiple currencies with a recorded rate per expense, recurring expenses, and an audit log of edits.

# Design a movie ticket booking system

## Prompt and scope

Customers browse shows at a cinema, pick specific seats, and pay.
Two customers must never book the same seat for the same show.
Unpaid selections are released after a few minutes.

## Model and invariants

```text
Cinema -> Screen -> Seat(row, number, type)
Show(id, screen_id, movie_id, starts_at)
ShowSeat(show_id, seat_id, state: AVAILABLE | HELD | BOOKED, hold_id, hold_expires_at)
Booking(id, show_id, seats, customer_id, status, payment_id)
```

The key invariant is on `ShowSeat`: a seat is held or booked by at most one customer at a time.
Enforce it in the operation that changes state, not by checking availability first and updating later.

## Holding seats atomically

```sql
UPDATE show_seats
SET state = 'HELD', hold_id = :hold, hold_expires_at = :expiry
WHERE show_id = :show AND seat_id IN (:seats)
  AND (state = 'AVAILABLE' OR (state = 'HELD' AND hold_expires_at < :now))
```

If the number of updated rows is smaller than the number of seats requested, roll back: someone else got one of them.
In an in-memory interview version, one lock per show around the same check-and-set expresses the boundary.

## Walkthrough

Two customers request seat C7 at the same moment.
Both send the update; the database serializes them, the first matches the row, and the second updates zero rows and is told the seat is gone.
The first customer pays; on success the seats move from HELD to BOOKED with the booking id.
If payment fails or the hold expires, the seats return to AVAILABLE.

## Tests and follow-up

Test concurrent holds on overlapping seat sets, expiry, payment success after expiry (reject and refund), and cancellation.
Follow-ups: pricing by seat type and time, a waiting queue for sold-out shows, and seat maps cached for reads while writes go to the source of truth.

# Design a chess game

## Prompt and scope

Model a two-player chess game that validates moves, detects check, checkmate and stalemate, and records move history.
No AI opponent; a user interface is out of scope.

## Model

```text
Game(board, players, turn, history, status)
Board: 8x8 grid of Piece or empty
Piece(color, kind) with polymorphic pseudo_moves(board, from) -> squares
Move(from, to, piece, captured, promotion, is_castle, is_en_passant)
```

Each piece type knows its movement pattern; sliding pieces (rook, bishop, queen) share a helper that walks a direction until blocked.

## Validating a move

1. The piece belongs to the player to move.
2. The destination is among the piece's pseudo-legal moves.
3. After applying the move on a copy (or apply and undo), the mover's king is not attacked.

Step 3 handles pins and moving into check with one rule.
Special moves (castling, en passant, promotion) need extra state: whether the king and rooks have moved, and the last double pawn push.

## Game status

After each move, the opponent is in check if any of the mover's pieces attacks their king.
If the opponent has no legal moves, it is checkmate when in check and stalemate otherwise.

## Tests and follow-up

Test a pinned piece that cannot move, castling through an attacked square (illegal), en passant only immediately after the double push, and promotion.
Follow-ups: undo by storing moves with captured pieces, draw rules (threefold repetition with a position hash, the fifty-move rule), and timers.

# Design a library management system

## Prompt and scope

Members search the catalog, borrow and return copies, place holds, and pay late fees.
Librarians add books and copies.

## Model and invariants

```text
Book(isbn, title, authors)            -- the work
Copy(id, isbn, status: AVAILABLE | ON_LOAN | ON_HOLD_SHELF | LOST)
Member(id, max_loans, fines_cents)
Loan(id, copy_id, member_id, due_at, returned_at)
Hold(id, isbn, member_id, created_at, status)
```

Separate the book from its physical copies; holds are placed on the book, loans on a copy.
A copy is on at most one open loan.
A member cannot exceed their loan limit or borrow with unpaid fines over a threshold.

## Operations

- `checkout(member, copy)`: validate member limits and copy status, create the loan, set the copy ON_LOAN.
- `return(copy)`: close the loan, compute a fine from days late, then, if a hold queue exists for the book, put the copy on the hold shelf for the earliest hold and notify that member.
- `place_hold(member, isbn)`: append to the book's FIFO hold queue.

## Walkthrough and tests

Bob returns a copy of a book with Alice's hold pending.
The copy goes to the hold shelf, not back to AVAILABLE, so Carol cannot check it out at the desk.
Tests: limit reached, return of a lost copy, fine calculation across a month boundary, and hold expiry passing the copy to the next member.

# Design a rate limiter class

## Prompt and scope

Implement `allow(client_id) -> bool` that permits at most `limit` requests per client per `window` seconds.
This is the in-process, object-oriented version; the distributed version appears in the system design guides.

## Choosing an algorithm

| Algorithm | Memory per client | Burst behavior |
| --- | --- | --- |
| Fixed window counter | O(1) | Up to 2x limit across a window edge |
| Sliding window log | O(limit) | Exact |
| Sliding window counter | O(1) | Approximate, smooth |
| Token bucket | O(1) | Allows bursts up to capacity, then a steady rate |

## Token bucket implementation

```python
class TokenBucket:
    def __init__(self, capacity, refill_per_second, clock=time.monotonic):
        self.capacity, self.rate, self.clock = capacity, refill_per_second, clock
        self.buckets = {}  # client -> (tokens, last_refill)
        self.lock = threading.Lock()

    def allow(self, client):
        with self.lock:
            now = self.clock()
            tokens, last = self.buckets.get(client, (self.capacity, now))
            tokens = min(self.capacity, tokens + (now - last) * self.rate)
            allowed = tokens >= 1
            self.buckets[client] = (tokens - 1 if allowed else tokens, now)
            return allowed
```

Inject the clock so tests can advance time without sleeping.
A single lock is simple; per-client locks or striped locks reduce contention.

## Tests and follow-up

Test the first request, exhausting the bucket, refill after time passes, capacity cap after a long idle period, and concurrent calls for one client.
Follow-ups: evicting idle clients to bound memory, different limits per plan, and returning a retry-after time.

# Design a publish-subscribe message broker

## Prompt and scope

Publishers send messages to named topics; subscribers receive every message published to a topic after they subscribe.
Deliver messages to each subscriber in publish order, and keep a slow subscriber from blocking the others.

## Model

```text
Broker: topic name -> Topic
Topic(messages: append-only list with offsets, subscribers)
Subscription(topic, subscriber, offset)   -- next message to deliver
Subscriber.on_message(message)
```

Store messages once per topic and track an offset per subscription, rather than copying messages into per-subscriber queues.

## Delivery

Each subscription has its own delivery worker (or task) that reads from its offset, calls the subscriber, and advances the offset after a successful acknowledgement.
A slow subscriber only delays its own offset.
Retention removes messages below the minimum offset of all subscriptions, or by age with lagging subscribers skipping ahead and being told.

## Invariants and tests

Order per topic is the append order; a subscriber never sees offset k + 1 before k.
At-least-once delivery means a subscriber that crashes before acknowledging sees the message again, so handlers should be idempotent.
Tests: subscribe after messages exist (only new ones delivered), one slow and one fast subscriber, unsubscribe during delivery, and handler failure with retry.
Follow-ups: consumer groups that share a subscription's work, partitions for parallelism, and filtering by message attributes.

# Design an ATM

## Prompt and scope

A customer inserts a card, enters a PIN, and checks a balance, withdraws or deposits.
The ATM dispenses notes from cassettes and talks to the bank over a network that can fail.

## State machine

```text
IDLE -> CARD_INSERTED -> AUTHENTICATED -> (BALANCE | WITHDRAW | DEPOSIT) -> AUTHENTICATED -> ... -> EJECT_CARD -> IDLE
```

Model states explicitly; each state accepts only some inputs, and invalid inputs are rejected rather than silently ignored.
Three wrong PINs retain the card.

## Withdrawal transaction

1. Check the ATM can make the amount from its cassettes (a greedy note selection works for standard denominations; verify it).
2. Ask the bank to authorize and place a hold, with a transaction id.
3. Dispense.
4. Confirm the transaction with the bank.

If dispensing fails after authorization, reverse the hold with the same transaction id.
If the network drops after dispensing but before confirmation, the ATM journals the dispense locally and retries the confirmation later; the bank treats the transaction id idempotently.

## Tests and follow-up

Test insufficient notes, insufficient funds, a jam during dispensing, and a lost confirmation.
Follow-ups: cassette replenishment, daily withdrawal limits, and a maintenance mode.

# Design a meeting room scheduler

## Prompt and scope

Book meeting rooms for time intervals.
`book(room, start, end)` succeeds if the room is free; `find(start, end, capacity)` returns a free room with enough seats.

## Model and invariants

```text
Room(id, capacity, features)
Booking(id, room_id, start, end, organizer)     -- half-open interval [start, end)
Per room: bookings sorted by start
```

Two bookings in the same room never overlap: for [a, b) and [c, d), overlap means a < d and c < b.

## Booking efficiently

Keep each room's bookings in a sorted structure.
To check [s, e), find the booking with the greatest start below e and confirm its end is at most s; a balanced tree or sorted list with binary search makes this O(log n).
Hold a per-room lock around check and insert so concurrent bookings cannot both succeed.

## Walkthrough and tests

Room A has [9:00, 10:00) and [11:00, 12:00).
A request for [10:00, 11:00) fits exactly between them because intervals are half-open.
A request for [9:30, 10:30) overlaps the first booking and fails.
Tests: back-to-back meetings, a booking that spans an existing one, recurring meetings expanded to occurrences, and time zones (store UTC).
Follow-up: suggest the earliest slot when all attendees are free by merging their busy intervals and scanning for a gap.
