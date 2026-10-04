## Intuition

At each restaurant, either skip it and keep the previous optimum, or choose it and combine its rating with the optimum that excludes the immediately preceding restaurant.
These are the only possibilities for an optimal nonadjacent selection.
Only the previous two prefix answers are needed.

## Brute force

Enumerate all subsets of restaurants, reject adjacent selections, and maximize the sum.
This takes exponential time and repeatedly solves the same prefix decision.

## Approach

Maintain `with_best`, the best total for the processed prefix, and `without_last`, the best total before that prefix's last restaurant.
For a new `rating`, compare skipping it with adding it to `without_last`.
The larger value becomes the next best total.
At the same time, shift the old best into the older-prefix variable for the following iteration.
Both begin at zero, representing empty prefixes and the valid choice to make no stops.
The recurrence preserves optimality because choosing the current restaurant forbids only its immediate predecessor, not any earlier nonadjacent choice.

## Walkthrough

Example 1 has ratings `[8, 1, 3, 9, 5, 2, 1]`.
The successive best totals are 8, 8, 11, 17, 17, 19, and 19.
When rating 9 arrives, choosing it combines with the earlier best 8 to beat the previous 11.
Later rating 2 combines with 17 for 19.
A valid optimal selection is ratings 8, 9, and 2 at indices 0, 3, and 5, so the result is 19.0.

## Complexity

Both references process n ratings once, giving O(n) time.
They use only two rolling totals, so auxiliary space is O(1).
They return the maximum sum without reconstructing restaurant indices.

## Edge cases

Empty input returns zero.
A singleton returns its rating, and all-zero input remains zero.
Fractional ratings follow the same recurrence.

## Common mistakes

Overwriting the older prefix value too early can accidentally allow adjacent selections.
Do not greedily select every locally higher rating; future choices interact through adjacency.

## Language notes

Python's simultaneous assignment preserves both old totals.
Java calculates `next` first, then shifts state explicitly using `double` arithmetic.
