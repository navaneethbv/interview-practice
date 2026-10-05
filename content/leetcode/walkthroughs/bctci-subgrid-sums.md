## Intuition

Every suffix subgrid includes the cell below and the cell to the right, with the diagonally opposite suffix counted twice.
That gives a two-dimensional suffix-sum recurrence that computes each answer from already completed neighbors.
Padding the matrix with a zero row and zero column removes boundary branches.

## Approach

Allocate `sums` with one extra row and column.
Visit rows and columns from bottom right toward top left.
For each cell, set `sums[r][c]` to the original value plus `sums[r + 1][c]` plus `sums[r][c + 1]` minus `sums[r + 1][c + 1]`.
Return the top-left `rows x cols` portion of the padded matrix.

## Walkthrough

For Example 1, the bottom-right value nine has suffix sum nine because its suffix contains only itself.
At row two and column zero, the recurrence adds negative two to the suffix at column one and obtains seven.
At row zero and column two, it combines three, the suffix below, and the zero padding to obtain twelve.
Finally, the top-left cell combines its own negative one with the right and below suffixes and subtracts their overlap, producing fifteen.

## Complexity

Each of the `R * C` cells is processed once, so the running time is `O(RC)`.
The padded `sums` matrix uses `O(RC)` auxiliary space, and the returned rows are copied or sliced from it.

## Edge cases

A one-cell grid returns that cell because all padded neighbors are zero.
A single row or single column still works because the extra padding supplies the missing direction.
Negative values require the inclusion-exclusion subtraction to remain exact rather than relying on monotonic sums.

## Common mistakes

Scanning from the top left leaves the needed suffix values unavailable.
Adding both neighboring suffixes without subtracting their overlap double-counts the bottom-right region.
Returning the padded boundary would add an unwanted extra row and column.

## Language notes

Python slices every padded row to the original column count and returns the original row count.
Java uses `Arrays.copyOf` to remove the padding from each row.
Both references use integer sums, which are sufficient for the supplied input bounds and contract.
