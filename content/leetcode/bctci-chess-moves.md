# Chess Moves

`board` is an `n x n` grid where `0` is an empty cell and `1` is occupied.
A `piece` stands on the empty cell `[r, c]` and is `"king"`, `"knight"`, or `"queen"`.

- A king moves to any of the eight adjacent cells.
- A knight jumps two cells in one direction and one cell in the other, ignoring cells in between.
- A queen moves any number of cells in a straight line horizontally, vertically, or diagonally, but cannot pass through or land on an occupied cell.

Return every empty cell the piece can reach in one move, as `[row, column]` pairs in any order.

## Examples

### Example 1

```text
Input: board = [[0, 0, 0, 1, 0, 0], [0, 1, 1, 1, 0, 0], [0, 1, 0, 1, 1, 0], [1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0]], piece = "king", r = 3, c = 5
Output: [[2, 5], [3, 4], [4, 4], [4, 5]]
```

### Example 2

```text
Input: board = [[0, 0, 0, 1, 0, 0], [0, 1, 1, 1, 0, 0], [0, 1, 0, 1, 1, 0], [1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0]], piece = "knight", r = 4, c = 3
Output: [[2, 2], [3, 5], [5, 5]]
```

## Constraints

- `1 <= n <= 100`
- `board[r][c] == 0`
