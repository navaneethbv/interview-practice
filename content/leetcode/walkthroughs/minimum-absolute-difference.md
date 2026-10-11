## Intuition

In sorted order, any non-adjacent pair is at least as far apart as the adjacent pairs between them, so the minimum difference is always between neighbours.

## Approach

1. Sort.
2. Find the smallest difference between neighbours.
3. Collect every neighbour pair with that difference, which comes out in ascending order.

## Walkthrough

Sorted, Example 2 is -14 -10 -4 3 8 19 23 27. The smallest gap, 4, appears three times.

## Complexity

- Time: O(n log n).
- Space: O(n) for the output.

## Edge cases

- Two elements always form the only pair.
- Differences fit in 32-bit integers for these bounds.

## Common mistakes

- Comparing all pairs in O(n^2).
- Returning pairs in input order instead of ascending order.
