## Intuition

Among available compatible intervals, finishing earliest leaves the most room for future choices.
Replacing an optimal solution's first interval with the earliest finishing interval cannot reduce the number of later intervals it can accommodate.

## Brute force

Checking every subset of intervals is exponential.
Sorting by start time alone does not work, because a long early interval may block several shorter ones that together produce a larger selected count.

## Approach

Sort by right endpoint.
Maintain `last_end`, initialized to -1 under the nonnegative coordinate constraint, and `chosen`.
Accept an interval only when `start > last_end`, then set `last_end` to its end.
Skipped intervals do not change the current endpoint.

## Walkthrough

Example 1 first selects an interval `[2, 3]`.
Its duplicate and `[1, 4]` overlap it.
The interval `[3, 6]` also overlaps because both include point 3.
The final `[8, 9]` is compatible, so the answer is 2.

## Complexity

Sorting n intervals takes O(n log n), and the greedy scan takes O(n).
Both references allocate an ordered copy of the interval collection, requiring O(n) auxiliary space.
Only a count and the last selected endpoint are retained during scanning.

## Edge cases

An empty list returns zero.
Point intervals with identical start and end are valid, but two sharing that point conflict.
Duplicate intervals cannot both be selected.
Equal end times do not require a special tie break for the maximum count.

## Common mistakes

The intervals are closed, so `start >= last_end` is incorrect.
Do not sort by interval length or always choose the earliest start.
Compare against the end of the last selected interval, not the immediately previous interval in sorted order.

## Language notes

Python uses `sorted` with an endpoint key.
Java shallow clones the outer array before sorting, leaving the caller's order intact.
Neither implementation changes inner endpoint arrays, and the Java `lastEnd` variable uses `long`.
