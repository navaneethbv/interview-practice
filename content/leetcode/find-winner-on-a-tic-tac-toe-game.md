# Find Winner on a Tic Tac Toe Game

Players A and B alternate moves on an initially empty three-by-three board, with A first.
Return the winner after the listed moves, `Draw` if all cells are occupied without a winner, or `Pending` otherwise.
Three marks in one row, column, or diagonal win.

## Constraints

- There are 1 to 9 valid moves on distinct cells.
- Play stops immediately after a win.

## Examples

### Example 1

```text
Input: moves = [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2]]
Output: "A"
Explanation: A fills the top row.
```

### Example 2

```text
Input: moves = [[1, 1]]
Output: "Pending"
Explanation: No line is complete and empty cells remain.
```
