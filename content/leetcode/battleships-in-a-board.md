# Battleships in a Board

Count the battleships on a board where X marks a ship cell and a period marks empty water.
Each ship is a straight horizontal or vertical run of one or more X cells.
Distinct ships never touch horizontally or vertically.
Use one pass with constant extra space and leave the board unchanged.

## Examples

### Example 1

```text
Input: board = [["X", ".", ".", "X"], [".", ".", ".", "X"], [".", ".", ".", "X"]]
Output: 2
Explanation: There is one single-cell ship and one vertical ship.
```

### Example 2

```text
Input: board = [[".", ".", ".", "."]]
Output: 0
Explanation: Every cell is water.
```

## Constraints

- 1 <= rows, columns <= 200.
- The board contains only X and periods and satisfies the ship rules.
