## Intuition

Once cuts are sorted and endpoints 0 and n are added, an interval's first cut costs its whole current length.
The remaining cuts split it into independent left and right intervals, so interval dynamic programming considers every possible first cut.

## Brute force

Trying every cut order is factorial.
The interval state remembers exactly which cuts remain inside each segment.

## Approach

1. Sort cut positions and add 0 and n.
2. For each interval containing at least one cut, try every internal cut as first.
3. Add the interval length to the two subinterval costs.
4. Fill intervals by increasing gap and return the full interval cost.

## Walkthrough

For Example 1, positions are `[0,1,3,4,5,7]`.
The optimal first cut is 3 and costs 7.
The left interval costs 3, and the right interval from 3 to 7 costs 6, so the total is `7 + 3 + 6 = 16`.
Inside that right interval, cutting 5 before 4 gives costs 4 and 2.

## Complexity

With c requested cuts, the interval table has O(c²) cells and each tries O(c) first cuts, for O(c³) time and O(c²) space.
Python uses nested lists and `float('inf')` during minimization.
Java uses an `int[][]` table and `Integer.MAX_VALUE` as the initial interval cost.

## Edge cases

One cut costs the full stick length.
Cuts near an endpoint create short subintervals after the first split.
The input cuts are distinct and strictly internal.

## Common mistakes

Add the current interval length once per interval, not once per recursive child.
Sort cuts before indexing intervals.
Fill shorter gaps before longer intervals.

## Language notes

Python leaves the original cuts list unchanged through `sorted`.
Java sorts the supplied cut array in place and copies it into an endpoint-padded array.
