## Intuition
A new booking is valid when it does not overlap any interval that is already double booked.
Its overlap with every existing single booking becomes a new double-booked interval.

## Brute force
A timeline array could mark every unit time covered by every booking.
That depends on the coordinate range rather than the number of bookings and can be infeasible for large endpoints.
Scanning interval overlaps uses input size instead.

## Approach
1. Reject the request if it overlaps an existing double-booked interval.
2. Intersect it with each accepted booking and append every nonempty intersection to `double_booked`.
3. Append the new booking after validation.

## Walkthrough
Example 1 accepts `[10,20]`, then `[15,25]`.
Their intersection `[15,20]` becomes double booked.
The request `[18,22]` overlaps that interval, so it is rejected and does not mutate the lists.
The request `[20,30]` touches the old overlap only at endpoint 20, which is not an overlap for half-open intervals.
It is accepted, producing the sequence `true, true, false, true`.

## Complexity
For B accepted bookings, the stored double intervals remain disjoint, so there are O(B) of them.
Each booking costs O(B) time, total work is O(B^2), and the interval lists use O(B) space.

## Edge cases
Adjacent intervals sharing an endpoint do not overlap.
A third booking equal to an existing double interval is rejected.
A rejected booking must not add any new double overlaps.

## Common mistakes
Checking only pairwise overlap with the latest booking misses earlier double intervals.
Adding overlaps before validation leaves rejected state behind.
Treating end times as inclusive rejects valid adjacent bookings.

## Language notes
Python stores endpoint pairs as tuples.
Java stores primitive two-element arrays and uses a helper for half-open overlap checks.
