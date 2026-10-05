## Intuition

The last value of every row precedes the first value of the next row, so row-major order is one globally sorted sequence.
Binary search can operate on that virtual sequence without flattening the matrix.
Division and remainder translate virtual positions back to coordinates.

## Brute force

Inspect every cell until finding target.
This takes O(rows × columns) time in the worst case and ignores the global ordering guarantee.

## Approach

Let `cols` be the row width and search flat indices from zero through `rows * cols - 1`.
For midpoint mid, compute `row = mid // cols` and `col = mid % cols`.
If that cell equals target, return its coordinates.
If it is smaller, discard all virtual indices through mid by setting low to mid + 1.
Otherwise set high to mid - 1.
Global sorted order ensures every discarded value lies on the wrong side of target.
When the interval becomes empty, return `[-1, -1]`.

## Walkthrough

Example 1 has two rows and four columns, so the virtual range is 0 through 7.
Midpoint 3 maps to `(0, 3)` with value 5, so high becomes 2.
Midpoint 1 maps to `(0, 1)` with value 2, so low becomes 2.
Midpoint 2 maps to `(0, 2)` with value 4.
That matches target and returns `[0, 2]`.

## Complexity

Binary search takes O(log(rows × columns)) time and O(1) auxiliary space.
No O(rows × columns) flattened copy is created.

## Edge cases

Single-row and single-column grids use the same mapping.
Targets outside the full value range or between existing values return the absent-coordinate pair.

## Common mistakes

Divide and take remainder by the number of columns, not rows.
Use an inclusive search interval consistently so the final remaining cell is examined.

## Language notes

Python's `divmod` returns both coordinates.
Java uses long flat indices and a long dimension product, then converts bounded row and column coordinates to int.
