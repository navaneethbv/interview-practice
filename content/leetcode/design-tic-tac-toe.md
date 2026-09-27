# Design Tic-Tac-Toe

Track a two-player game on an n by n board.
`move(row, col, player)` places the player's mark in an empty cell and returns that player's number if the move completes an entire row, column, or diagonal; otherwise it returns 0.
Inputs contain only legal moves, and play stops when someone wins.
Aim for O(1) work per move.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation; void methods produce null, and constructor output is omitted.

## Examples

### Example 1

```text
Input: ctor = [3], ops = ["move", "move", "move", "move", "move"], args = [[0, 0, 1], [1, 0, 2], [0, 1, 1], [1, 1, 2], [0, 2, 1]]
Output: [0, 0, 0, 0, 1]
Explanation: Player 1 completes the top row on the fifth move.
```

### Example 2

```text
Input: ctor = [1], ops = ["move"], args = [[0, 0, 1]]
Output: [1]
Explanation: On a one-cell board, the first move completes a row, column, and diagonal.
```

## Constraints

- 1 <= n <= 100.
- 0 <= row, col < n.
- player is 1 or 2.
- At most n * n moves occur, and no occupied cell is reused.
