## Intuition

The suffix rectangle below a cell and the suffix rectangle to its right jointly cover the desired rectangle except for the current cell.
They also overlap in the diagonal suffix rectangle.
Add both sums and the current value, then subtract that overlap once.

## Brute force

Independently sum the bottom-right rectangle for every starting cell.
This repeatedly visits the same entries and can take O(r squared times c squared) time.

## Approach

Allocate `sums` with one extra zero row and column.
Process real rows and columns in reverse order.
Set each entry to the current grid value plus the suffix below plus the suffix to the right minus the diagonal suffix.
The padding makes boundary cases use the same formula without separate checks.
Every dependency lies below or to the right, so the backward traversal guarantees it has already been computed.
Afterward, copy only the real r by c portion into the returned grid, excluding the padding.
Inclusion-exclusion ensures every cell of the requested rectangle contributes exactly once.

## Walkthrough

Example 1's bottom row `[-2, 0, 9]` produces suffix sums `[7, 9, 9]`.
The middle row `[4, 0, 0]` produces `[11, 9, 9]`.
At the top-left cell, combine its value -1 with below 11 and right 14, then subtract diagonal 9.
The result is `-1 + 11 + 14 - 9 = 15`.
The complete top row becomes `[15, 14, 12]`, matching the example.

## Complexity

Both references fill and copy O(r times c) entries, giving O(r times c) time.
The padded table and returned grid each occupy O(r times c) space.
They retain both arrays during result construction rather than reusing the original input.

## Edge cases

Negative values require no special treatment because the recurrence is additive.
A single row reduces to a rightward suffix sum, and a single column reduces to a downward suffix sum.

## Common mistakes

Omitting diagonal subtraction counts the overlapping rectangle twice.
Do not expose the extra padding row or column in the result.

## Language notes

Python slices real rows from its padded table.
Java uses `Arrays.copyOf`; the stated million-cell and value bounds keep these signed totals within `int` capacity.
