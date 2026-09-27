## Intuition

If m bouquets can be made by a day, every later day can also make them.
That monotonic predicate supports binary search over the bloom-day range.

## Brute force

Testing every day and scanning the garden each time costs O(nD), where D is the day range.
The feasibility result changes only monotonically, so most day checks are unnecessary.

## Approach

1. Return -1 when m times k exceeds the number of flowers.
2. Binary search the minimum possible day.
3. For a candidate day, count consecutive bloomed flowers and form a bouquet whenever k are reached.
4. Keep the lower half when enough bouquets exist.

## Walkthrough

Example 1:

For [1,10,3,10,2], m 3, and k 1, the initial search checks day 5.
Day 5 is feasible, so the next check is day 3, which is also feasible.
Day 2 is infeasible because only indices 0 and 4 have bloomed, so the lower bound becomes day 3.
Binary search therefore returns 3.

## Complexity

Each feasibility check scans n flowers and binary search performs O(log D) checks.
Time is O(n log D) and auxiliary space is O(1).
Java multiplies m and k in long before comparing with n to avoid overflow.

## Edge cases

An impossible required flower count returns -1 before searching.
When k is one, every bloomed flower can form a bouquet.
The answer is the first feasible day, not merely any feasible day.

## Common mistakes

Reset the consecutive run after forming a bouquet so flowers cannot be reused.
Do not combine nonadjacent bloomed flowers in one bouquet.
Use a lower-bound binary search to retain a feasible candidate.

## Language notes

Python integers naturally handle m times k.
Java explicitly widens that product and uses int for day values under the stated bound.
