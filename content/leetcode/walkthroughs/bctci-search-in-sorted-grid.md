## Intuition

The row-order guarantee makes the entire grid sorted when read row by row.
Treat it as a virtual one-dimensional array without physically flattening it.
Division and remainder translate each binary-search index back into a grid coordinate.

## Brute force

Inspect every cell until finding target.
This takes O(r times c) time for r rows and c columns, ignoring the total ordering supplied by the contract.

## Approach

Let `cols` be the number of columns and search virtual indices zero through `rows * cols - 1` inclusively.
For midpoint `mid`, calculate row as `mid // cols` and column as `mid % cols`.
If that cell equals target, return its coordinate pair.
If it is smaller, discard the midpoint and all earlier virtual positions by moving low to `mid + 1`.
Otherwise discard the midpoint and later positions by moving high to `mid - 1`.
If the interval becomes empty, return `[-1, -1]`.
No row boundaries need special search branches because the virtual ordering already includes them.

## Walkthrough

Example 1 has two rows and four columns, so virtual indices range from zero through seven.
The first midpoint is three, containing 5 at `(0, 3)`, so high moves to two for target 4.
The next midpoint is one, containing 2, so low moves to two.
Virtual index two maps to `(0, 2)` and contains 4.
The method returns `[0, 2]`.

## Complexity

Both references take O(log(r times c)) time and O(1) auxiliary space.
The returned pair uses constant storage, and the grid is neither copied nor modified.

## Edge cases

Single-row and single-column grids use the same mapping.
A target between adjacent stored values eventually empties the search interval.
The grid is guaranteed nonempty.

## Common mistakes

This flattening works because each row ends before the next row begins.
Independently sorted rows without that cross-row ordering would not justify this binary search.

## Language notes

Python uses `divmod` to calculate both coordinates.
Java uses `long` virtual indices and casts only the derived row and column back to `int`.
