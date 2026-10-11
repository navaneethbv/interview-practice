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
