## Intuition

Bookings are half-open intervals, so two bookings conflict exactly when their intersection has positive length.
With at most 1000 requests, storing accepted intervals and checking each one is clear and fast enough.

## Brute force

The reference is the direct interval-list method, checking every accepted booking for each request.
A balanced tree could find neighboring intervals faster, but it is unnecessary for the stated small limit.

## Approach

1. Keep accepted intervals in `bookings`.
2. For a request, test every previous interval with `max(starts) < min(ends)`.
3. Return false immediately on a conflict.
4. Append the interval only when every check passes, then return true.

## Walkthrough

For Example 1, the first request `[10, 20)` has no predecessor and is accepted.
The second request `[15, 25)` intersects it because `max(10, 15) = 15` is less than `min(20, 25) = 20`, so it is rejected.
The third request `[20, 30)` has no positive-width intersection with `[10, 20)`, so it is accepted.
The outputs are `[true, false, true]`.

## Complexity

With `b` accepted bookings, one request costs `O(b)` time and the stored calendar uses `O(b)` space.
Across `q` requests, the total time is `O(q^2)` in the worst case.

## Edge cases

Adjacent intervals sharing an endpoint are allowed because the overlap test is strict.
A duplicate interval conflicts with the retained original, and a rejected request does not change the list.

## Common mistakes

- Using closed-interval comparisons rejects legal adjacent bookings.
- Appending before checking all intervals leaves a rejected booking in the calendar.
- Comparing only starts misses containment and partial overlaps.

## Language notes

Python stores tuples, while Java stores two-element arrays inside the `MyCalendar` object's list.
Both classes preserve state across method calls and use a fresh instance per test as required by the design spec.
