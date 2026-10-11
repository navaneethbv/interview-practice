## Intuition

Each output cell is the maximum of a fixed 3 x 3 window, and the window is constant size, so scanning its nine cells directly is already linear in the grid size.

## Approach

1. For each top-left corner from (0, 0) to (n - 3, n - 3), take the maximum of the nine cells below and to the right.

## Walkthrough

In Example 1 the top-left block contains 9, 9, 8, 5, 6, 2, 8, 2 and 6, so its maximum is 9.

## Complexity

- Time: O(n^2).
- Space: O(n^2) for the output.

## Edge cases

- The output is (n - 2) x (n - 2).

## Common mistakes

- Centring the block at (i, j) instead of using (i, j) as its top-left corner.
