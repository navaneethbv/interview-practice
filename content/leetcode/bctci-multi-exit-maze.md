# Multi-Exit Maze

`maze` is a grid of strings where `X` is a wall, `O` is an exit, and `.` is open floor.
Moves go up, down, left, or right through non-wall cells.
Return a grid of the same size holding, for each cell, the fewest steps to the nearest exit, or `-1` for walls.
Every open cell can reach an exit.

## Examples

### Example 1

```text
Input: maze = ["...X.O", "OX.X..", "...X..", ".X....", "XOX.XX"]
Output: [[1, 2, 3, -1, 1, 0], [0, -1, 4, -1, 2, 1], [1, 2, 3, -1, 3, 2], [2, -1, 4, 5, 4, 3], [-1, 0, -1, 6, -1, -1]]
```

### Example 2

```text
Input: maze = ["...", ".O.", "..."]
Output: [[2, 1, 2], [1, 0, 1], [2, 1, 2]]
```

## Constraints

- `1 <= rows, columns <= 1,000`
