# Spiral Matrix III

Starting at `(rStart,cStart)`, walk east, south, west, and north in an expanding clockwise spiral.
The walk may go outside the rows-by-cols grid.
Return the grid coordinates in the order they are first visited, stopping when all grid cells have been listed.

## Constraints

- `1 <= rows, cols <= 100`.
- The starting coordinates are inside the grid.

## Examples

### Example 1

```text
Input: rows = 1, cols = 3, rStart = 0, cStart = 0
Output: [[0, 0], [0, 1], [0, 2]]
Explanation: The spiral visits the only row from left to right.
```

### Example 2

```text
Input: rows = 2, cols = 2, rStart = 0, cStart = 0
Output: [[0, 0], [0, 1], [1, 1], [1, 0]]
Explanation: The first four positions lie inside the grid.
```
