## Intuition

Take the tallest cell in a middle column.
If a horizontal neighbor is larger, a peak must exist on that side; otherwise the selected cell is larger than both horizontal neighbors and already dominates its column vertically.

## Brute force

Scanning every cell and checking four neighbors takes `O(rows * columns)` time.
Binary search over columns keeps only one column scan per search level.

## Approach

1. Binary-search the column interval.
2. Find the maximum cell in the middle column.
3. Move left or right if a horizontal neighbor is larger.
4. Return the cell when neither horizontal neighbor is larger, since it is also largest in its column.

## Walkthrough

For Example 1, `mat = [[1, 4], [3, 2]]`.
The middle column is 0, whose tallest cell is 3 at row 1.
Its right neighbor 2 is smaller and its left boundary is outside with value -1, so row 1 column 0 is a peak too.
The validator accepts any peak, although the statement's displayed output is `[0, 1]`.

## Complexity

Each binary-search level scans `rows` cells, giving `O(rows log columns)` time.
The references use `O(1)` extra space beyond the returned pair.

## Edge cases

A one-cell matrix returns its only cell.
The outside boundary is -1, and all actual values are positive, so boundary peaks are valid.

## Common mistakes

- Checking only the middle cell's horizontal neighbors without selecting the column maximum can miss a taller vertical neighbor.
- Using non-strict comparisons contradicts the strict peak definition.
- Returning a fixed corner ignores the binary-search invariant.

## Language notes

Python uses `max` with a row key, while Java extracts that scan into `tallestRow`.
The local validator accepts any valid peak, so an answer may differ from Example 1's representative output.
