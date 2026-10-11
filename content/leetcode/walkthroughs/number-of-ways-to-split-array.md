## Intuition

The right part's sum is the total minus the left part's sum, so a single running prefix sum decides every split.

## Approach

1. Compute the total.
2. Walk the first n - 1 positions, adding to a running left sum.
3. Count positions where left >= total - left.

## Walkthrough

In Example 1 the total is 13. Left sums are 10, 14 and 6 against right sums 3, -1 and 7, so two splits are valid.

## Complexity

- Time: O(n).
- Space: O(1).

## Edge cases

- The right part must be non-empty, so the last index is not a split point.
- Sums can exceed 32-bit range in Java and C++; use 64-bit integers.

## Common mistakes

- Including the final index as a split.
- Overflowing a 32-bit total.
