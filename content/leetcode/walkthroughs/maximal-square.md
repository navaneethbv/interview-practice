## Intuition

For a cell containing `1`, the largest square ending there is one larger than the smallest square ending above, above-right, or to the left.
The dynamic programming value is therefore a side length, not an area.
Keeping only the previous row and the current row is enough to compute every transition.

## Brute force

Trying every top-left corner and expanding every possible square can take O(RC min(R,C)^2) time.
Checking each candidate's cells adds another factor, while the recurrence summarizes all smaller squares once.

## Approach

1. Initialize `previous_row` with a leading zero column.
2. For each matrix row, build `current_row` with its own leading zero.
3. Set a cell's `side` to zero for `0`, otherwise one plus the minimum of the three neighboring side lengths.
4. Track `largest_side` and replace `previous_row` after the row finishes.
5. Return `largest_side * largest_side`.

## Walkthrough

Example 1 is a 2 by 2 matrix of ones.

| row | `current_row` side lengths | `largest_side` |
| --- | --- | ---: |
| first `1,1` | `[0,1,1]` | 1 |
| second `1,1` | `[0,1,2]` | 2 |

The bottom-right cell sees side lengths 1 above, 1 diagonally above-left, and 1 to the left, so its side is 2 and the area is 4.

## Complexity

- Time: O(RC), because each cell performs constant-time work.
- Space: O(C), for two rows of dynamic programming values, excluding the returned scalar.

## Edge cases

An all-zero matrix leaves `largest_side` at zero.
A one-cell one produces area one.
Zeros reset the square side at their position.
The recurrence handles rectangular matrices because it uses the row length for the columns.

## Common mistakes

- Using the maximum neighboring side allows a square with a missing corner.
- Returning the side instead of its square violates the area contract.
- Reusing the current row without a fresh leading zero leaks values from the previous row.

## Language notes

Python creates a fresh list for each row and keeps `previous_row` as the prior state.
Java uses two integer arrays and writes only cells containing `'1'`.
Both references store side lengths and square only at the end.
