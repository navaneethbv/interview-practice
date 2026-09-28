# Queen's Reach

`board` is an `n x n` grid where `1` marks a queen and `0` an empty cell.
A queen attacks every cell it can reach in one move: any distance horizontally, vertically, or diagonally, stopping at the edge or at another queen.
Return a grid of the same size where a cell is `0` if it is safe and `1` if it holds a queen or is attacked by one.

## Examples

### Example 1

```text
Input: board = [[0, 0, 0, 1], [0, 0, 0, 0], [0, 0, 0, 0], [1, 0, 0, 0]]
Output: [[1, 1, 1, 1], [1, 0, 1, 1], [1, 1, 0, 1], [1, 1, 1, 1]]
```

### Example 2

```text
Input: board = [[0]]
Output: [[0]]
```

## Constraints

- `1 <= n <= 100`
