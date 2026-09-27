## Intuition

Two neighboring cells on the same descending diagonal must be equal.
If every cell with an upper-left neighbor matches that neighbor, equality propagates along the entire diagonal.
This local condition is enough to verify the global Toeplitz property without collecting any diagonals.

## Approach

1. Iterate `row` from 1 through the final row.
2. Within that row, iterate `column` from 1 through the final column.
3. Compare `matrix[row][column]` with `matrix[row - 1][column - 1]`.
4. Return false immediately when a comparison fails.
5. Return true after all eligible pairs match.

The first row and first column start diagonals, so they do not have an upper-left predecessor to check.
Every other cell appears in exactly one comparison with its predecessor.

## Walkthrough

Example 1 uses `[[1,2,3],[4,1,2],[5,4,1]]`.

| Current position | Upper-left position | Values |
| --- | --- | --- |
| `(1,1)` | `(0,0)` | `1 == 1` |
| `(1,2)` | `(0,1)` | `2 == 2` |
| `(2,1)` | `(1,0)` | `4 == 4` |
| `(2,2)` | `(1,1)` | `1 == 1` |

All four comparisons succeed, so the method returns true.
The corner values 3 and 5 each form a one-cell diagonal and require no comparison.
The main diagonal is verified through two adjacent comparisons rather than by constructing `[1,1,1]` separately.

## Complexity

- Time: O(rows × columns), with exactly `(rows - 1) × (columns - 1)` comparisons when no mismatch occurs.
- Space: O(1), since the implementation retains only loop indices.

## Edge cases

A single row or single column is always Toeplitz because each descending diagonal contains just one cell.
A rectangular matrix works without needing equal row and column counts.
Repeated values on different diagonals are allowed, but not required.
A mismatch near the beginning ends the scan early.
The statement guarantees a nonempty rectangular matrix.

## Common mistakes

- Comparing with the upper-right cell checks the other diagonal direction.
- Requiring each row to be constant confuses rows with diagonals.
- Starting either index at zero attempts to inspect a nonexistent predecessor.

## Language notes

Both references use explicit nested loops and the same predecessor comparison.
Python and Java index rows first and columns second.
The input remains unchanged, and no temporary lists, arrays, or hash maps are needed.
