# Minesweeper

Update a Minesweeper board after clicking one unrevealed cell.
M is a hidden mine and E is an unrevealed empty cell.
Clicking M changes it to X.
An empty cell adjacent to mines becomes a digit counting mines in its eight neighboring positions.
An empty cell with no neighboring mines becomes B and reveals its unrevealed neighbors recursively.
Return the updated board.

## Examples

### Example 1

```text
Input: board = [["E", "E"], ["E", "E"]], click = [0, 0]
Output: [["B", "B"], ["B", "B"]]
Explanation: With no mines, revealing one cell exposes the whole board.
```

### Example 2

```text
Input: board = [["M", "E"], ["E", "E"]], click = [0, 0]
Output: [["X", "E"], ["E", "E"]]
Explanation: Clicking a mine marks it X.
```

## Constraints

- 1 <= board.length, board[i].length <= 50
- Cells are M, E, B, or digits 1 through 8; click selects an M or E cell.
