## Intuition
For each cell, the cheapest path reaching it comes from one of at most three cells in the previous row.
Keep only the previous row's dynamic-programming values because older rows are already summarized.

## Brute force
Enumerating every path branches up to three ways per row and can take O(3^n) time for an n by n matrix.
Memoization reduces repeated subproblems, while rolling rows use less storage.

## Approach
1. Copy the first row into `previous`.
2. For each later row, choose the minimum valid value directly above or diagonally above.
3. Add the current cell and place the result in a fresh row.
4. Return the minimum value in the final row.

## Walkthrough
Example 1 is `[[2,1],[3,4]]`.
The initial dynamic row is `[2,1]`.
For cell 3, the valid predecessors are 2 and 1, so its cost is 4.
For cell 4, the valid predecessors are also 2 and 1, so its cost is 5.
The final row is `[4,5]`, and the minimum path sum is 4.

## Complexity
For an n by n matrix, each cell is examined once, so time is O(n^2).
The rolling rows use O(n) auxiliary space.
Both languages copy the first row and allocate a fresh dynamic-programming row for each later input row.

## Edge cases
A one-cell matrix returns that cell.
Negative values are handled by minimum comparisons without sentinel assumptions.
Boundary columns have only two or one valid predecessors.

## Common mistakes
Allowing a two-column jump creates invalid paths.
Updating a row in place can reuse values from the current row.
Returning the last cell instead of the minimum final-row value misses other endpoints.

## Language notes
Python's `matrix[0][:]` copies the initial row.
Java uses `clone` for that row and indexed arrays thereafter, avoiding slices.
