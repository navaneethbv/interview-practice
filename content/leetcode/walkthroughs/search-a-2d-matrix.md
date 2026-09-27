## Intuition

The row-order guarantee makes the entire matrix sorted when read row by row.
Treat those entries as one virtual array without actually flattening them.
A virtual index maps back to its row by division and its column by remainder.

## Brute force

Inspect every cell until finding the target.
That takes O(RC) time for R rows and C columns, exceeding the required logarithmic bound.
Physically flattening the matrix before binary search also costs O(RC) time and storage unnecessarily.

## Approach

1. Use binary search over virtual indices from zero to `rows * columns - 1`.
2. Compute `middle` between the inclusive bounds `left` and `right`.
3. Read `value = matrix[middle // columns][middle % columns]`.
4. If value equals target, return true.
5. If value is smaller, move `left` to `middle + 1`; otherwise move `right` to `middle - 1`.
6. Return false after the candidate interval becomes empty.

Rows are internally sorted, and every row starts after the preceding row ends, so the virtual sequence is globally sorted.
That invariant justifies discarding half the positions after each comparison.
The matrix remains unchanged throughout the search.

## Walkthrough

Example 1 searches for 9 in `[[1, 3, 5], [7, 9, 11]]`.
There are three columns and six virtual positions.

| Bounds | `middle` | Row, column | `value` | Decision |
| --- | --- | --- | --- | --- |
| 0 to 5 | 2 | 0, 2 | 5 | Set `left = 3` |
| 3 to 5 | 4 | 1, 1 | 9 | Return true |

Virtual position 4 maps to row `4 // 3 = 1` and column `4 % 3 = 1`.
No flattened array is allocated.

## Complexity

- Time: O(log(RC)), because each iteration halves the virtual search interval.
- Space: O(1), storing only index bounds and the current value.

## Edge cases

A single row behaves like ordinary binary search.
A single column uses the same index mapping with remainder zero.
An absent value between two rows eventually empties the interval.
The statement requires at least one row and column, so reading `matrix[0]` is valid.

## Common mistakes

- Dividing by the number of rows instead of columns produces incorrect coordinates.
- Applying this algorithm to a matrix with only row-local ordering is invalid.
- Using a strict loop condition can skip the last candidate.

## Language notes

Python uses `//` for row selection and `%` for the column.
Java's integer `/` and `%` perform the same mapping for nonnegative indices.
The stated dimensions keep `rows * columns` safely within Java's integer range.
