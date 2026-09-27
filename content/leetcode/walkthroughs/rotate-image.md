## Intuition

A clockwise rotation sends position `(row, column)` to `(column, size - 1 - row)`.
Transposing first swaps the two coordinates, and reversing each row then performs the remaining horizontal reflection.
Both transformations can be carried out with swaps inside the original square matrix.

## Brute force

Allocate a second matrix and place each original value at its rotated coordinates.
That takes O(n²) time and O(n²) extra space.
The statement requires in-place rotation, so the coordinate transformation must be implemented without that second matrix.

## Approach

1. Use transpose followed by horizontal reflection.
2. For each `row`, swap `matrix[row][column]` with `matrix[column][row]` only where `column > row`.
3. After the transpose, reverse every row in place.
4. Return nothing; the original matrix now holds the rotated image.

Visiting only one side of the diagonal swaps each off-diagonal pair exactly once.
Diagonal values remain in place during transposition and move to their final columns during row reversal.
The composition of these two operations matches the clockwise coordinate mapping.

## Walkthrough

Example 1 begins with `[[1, 2], [3, 4]]`.

| Stage | Matrix |
| --- | --- |
| Original | `[[1, 2], [3, 4]]` |
| Swap positions `(0,1)` and `(1,0)` | `[[1, 3], [2, 4]]` |
| Reverse first row | `[[3, 1], [2, 4]]` |
| Reverse second row | `[[3, 1], [4, 2]]` |

The original first column becomes the new top row in reverse order.
The final matrix is the required clockwise rotation.

## Complexity

- Time: O(n²), for transposition and row reversals of an n by n matrix.
- Space: O(1), because each swap uses only temporary values or references.

## Edge cases

A one-cell matrix remains unchanged.
Odd-sized matrices have a center value that stays at the center after both operations.
Negative and duplicate entries are moved by position and need no value-specific handling.
The square-matrix guarantee is essential to the transpose indexing used here.

## Common mistakes

- Swapping both sides of the diagonal undoes the transpose.
- Reversing columns after transposition produces the opposite rotation direction.
- Rebinding a local matrix variable to a new matrix does not satisfy in-place mutation.

## Language notes

Python uses tuple assignment for symmetric swaps and `row.reverse()` for each row.
Java uses a temporary `saved` value and a two-pointer row-reversal helper.
Neither implementation allocates another row or matrix for the rotated output.
