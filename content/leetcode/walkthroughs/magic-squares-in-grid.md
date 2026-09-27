## Intuition

A valid 3 by 3 magic square must contain exactly the values 1 through 9, so uniqueness and range can be checked before sums.
After that filter, every row, column, and diagonal must total 15.

## Brute force

Checking every possible 3 by 3 placement is already required, but repeatedly sorting or rebuilding unrelated grid regions adds unnecessary work.
The local window is constant size, so direct checks are simple and bounded.

## Approach

1. Visit every 3 by 3 window.
2. Mark its nine values in a boolean array, rejecting values outside 1 through 9 or duplicates.
3. Sum its three rows, three columns, and two diagonals.
4. Count the window only when every sum equals 15.

## Walkthrough

This is Example 1 from the local statement.
The left window of `[[4,3,8],[9,5,1],[2,7,6]]` contains every value from 1 through 9 once.
Its rows, columns, and diagonals all sum to 15, so the count becomes 1.
The neighboring right window also contains 1 through 9 exactly once and its rows and columns sum to 15, but its diagonals sum to 6 and 12.
It therefore fails the diagonal checks, leaving the answer at 1.

## Complexity

For an r by c grid, there are O(rc) windows and each constant-size window costs O(1), so time is O(rc).
The seen array uses O(1) auxiliary space.

## Edge cases

Grids smaller than 3 in either dimension contain no candidate window.
Repeated 1 through 9 values fail even if all sums happen to match.
Values outside 1 through 9 are rejected before indexing the seen array.

## Common mistakes

Equal line sums alone do not prove a magic square.
Check both diagonals as well as rows and columns.
Use a fresh seen array for every window.

## Language notes

Python sorts the nine extracted values, while Java uses a fixed boolean array.
Both exploit the constant window size and keep the result as an integer count.
