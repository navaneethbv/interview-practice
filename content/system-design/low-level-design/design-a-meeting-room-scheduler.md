## Prompt and scope

Book meeting rooms for time intervals.
`book(room, start, end)` succeeds if the room is free; `find(start, end, capacity)` returns a free room with enough seats.

## Model and invariants

```text
Room(id, capacity, features)
Booking(id, room_id, start, end, organizer)     -- half-open interval [start, end)
Per room: bookings sorted by start
```

Two bookings in the same room never overlap: for [a, b) and [c, d), overlap means a &lt; d and c &lt; b.

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
