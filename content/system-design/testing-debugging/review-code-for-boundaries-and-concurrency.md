## Review prompt

A service must allow at most one successful reservation for a seat.
Assume two callers can execute concurrently.
Review this pseudocode without changing it first.

```text
reserve(seatId, customerId):
    if not store.isReserved(seatId):
        store.saveReservation(seatId, customerId)
        return success
    return unavailable
```

## Concrete failure

Caller A observes an unreserved seat.
Caller B observes the same state before A saves.
Both callers then save and may both receive success.
A single-threaded unit test will not reproduce this interleaving.
The defect is the gap between checking the condition and enforcing it.

## Proposed correction

Make claiming the seat an atomic storage operation.
For a relational model, a unique constraint on the seat's active ownership plus a transaction can enforce the rule.
Handle the losing claim as an expected unavailable result, and distinguish it from a connection failure.
For an in-memory exercise, a shared lock around the check and update is sufficient only within the process that owns that lock.

## Regression design

Coordinate two callers with a barrier so both attempt to claim the same seat.
Assert one success, one unavailable result, and one stored owner.
Do not assert only that an exception happened.
Also test different seats to ensure the correction has not accidentally forbidden unrelated reservations.

## Review checklist

- Does the code enforce the documented ownership boundary?
- Can a retry repeat a completed action?
- Are errors distinguishable from ordinary business outcomes?
- What happens between an external effect and the local success record?
- Does the test observe stored state as well as the returned response?

## Follow-up

Add a reservation expiry time.
Explain which clock determines expiration and how an old holder is prevented from releasing a newer reservation.
An identifier or generation number ties the release to the ownership it is allowed to modify.
The model must distinguish “this seat was once mine” from “this reservation still owns it.”
