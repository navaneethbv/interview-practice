## Intuition

The covered portions can be represented as sorted, disjoint half-open intervals.
Adding merges every overlap, while removal cuts away the requested range and keeps the remaining pieces.

## Brute force

Marking every integer point covered would use up to a billion positions under the constraints.
A point-by-point representation is also wasteful when one interval covers a large continuous range.

## Approach

1. Store covered intervals in increasing order.
2. For addRange, copy intervals before the request, merge every interval that touches or overlaps it, and append the suffix.
3. For removeRange, preserve intervals that end before the request and split overlapping intervals around the removed section.
4. For queryRange, find whether one stored interval contains both endpoints.

## Walkthrough

Example 1:

addRange(10,20) stores [10,20).
removeRange(14,16) replaces it with [10,14) and [16,20).
queryRange(10,14) succeeds because the first interval contains that half-open range.
queryRange(13,15) fails because the removed gap is inside the request.
queryRange(16,20) succeeds using the second interval.

## Complexity

With r stored intervals, each operation takes O(r) time because it scans the list.
Each update builds a new list and therefore uses O(r) temporary space for interval objects and references.
The interval representation itself uses O(r) space.

## Edge cases

Touching intervals can be merged because the covered union remains continuous.
Removing an interval that crosses both ends of a stored interval deletes that interval entirely.
Half-open endpoints mean the point at right is excluded from that stored range, though another range can cover that coordinate.

## Common mistakes

Do not merge intervals separated by a positive gap.
Do not remove an endpoint that lies outside the half-open request.
Keep the stored intervals sorted after every update.

## Language notes

Python list construction copies interval references, while Java creates new interval arrays.
Both references preserve the required RangeModule method names and half-open semantics.
