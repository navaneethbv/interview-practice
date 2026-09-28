# Escape with All Clues

In `room`, `0` is open floor, `1` is an obstacle, and `2` is a clue; the top-left cell is open and at least one clue exists.
Starting at `[0, 0]` and moving up, down, left, or right without revisiting a cell, collect every clue.
Return the cells of a shortest such path, starting with `[0, 0]` and ending when the last clue is collected, or an empty list if it is impossible.
Any shortest path is accepted.

## Examples

### Example 1

```text
Input: room = [[0, 1, 0], [0, 2, 0], [0, 0, 2]]
Output: [[0, 0], [1, 0], [1, 1], [1, 2], [2, 2]]
```

### Example 2

```text
Input: room = [[0, 0, 0], [2, 1, 2]]
Output: []
```

## Constraints

- `1 <= rows, columns <= 6`
