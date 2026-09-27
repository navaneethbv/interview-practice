## Intuition

Every cell on the same diagonal has a common row plus column index.
The algorithm collects one diagonal at a time and reverses alternating diagonals to create the zigzag order.
Boundary formulas identify the valid row range without storing coordinates for the whole matrix.

## Brute force

Grouping every cell into a map keyed by row plus column works in O(R × C) time but uses O(R × C) grouping space.
Walking the bounded row range for each diagonal keeps only the output and a temporary diagonal list in Python.
Java writes directly into the preallocated result array.

## Approach

1. Let diagonal range from zero through rows plus columns minus two.
2. Compute first_row and last_row for that diagonal.
3. Read cells at column equal to diagonal minus row.
4. Reverse the temporary values when diagonal is even.
5. Append or write the values and continue.

## Walkthrough

Example 1 uses the 3 by 3 matrix from the statement.

| diagonal | cells before direction change | output added |
| ---: | --- | --- |
| 0 | [1] | [1] |
| 1 | [2,4] | [2,4] |
| 2 | [3,5,7] | [7,5,3] |
| 3 | [6,8] | [6,8] |
| 4 | [9] | [9] |

The complete output is [1,2,4,7,5,3,6,8,9].

## Complexity

Let R and C be the matrix dimensions and N = R × C.
Each cell is read and emitted once, so time is O(N).
Python's temporary diagonal list is at most O(min(R,C)) and the result is O(N).
Java allocates only the O(N) result array and uses O(1) extra traversal state.

## Edge cases

A one-cell matrix returns that cell.
A single row preserves left-to-right order.
A single column also preserves top-to-bottom order.
Rectangular matrices use the same row bounds even when R and C differ.

## Common mistakes

- Forgetting to reverse alternating diagonals produces diagonal grouping without zigzag order.
- Using an invalid row range reads outside a rectangular matrix.
- Grouping by row minus column changes the diagonal definition.
- Returning temporary groups instead of one flattened result changes the contract.

## Language notes

Python creates a list for each diagonal and reverses it in place when needed.
Java chooses the row direction directly and writes into a fixed int array.
Both use zero-based row plus column diagonal indexes.
