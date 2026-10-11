# Design Snake Game

Play Snake on a `height` by `width` grid. The snake starts as one cell at the top-left corner `(0, 0)`.
`food` lists food cells `[row, col]` in the order they appear; only the next piece is on the board at any time.
`move(direction)` moves the head one cell `"U"`, `"D"`, `"L"` or `"R"`.
If the head reaches the current food, the snake grows by one and the score increases.
The game ends, and `move` returns -1, when the head leaves the grid or runs into the body.
Otherwise `move` returns the score.
The head may move into the cell the tail is leaving in the same move.

Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- 1 <= width, height <= 10
- Food never appears on a cell occupied by the snake.
- No moves are made after the game ends.

## Examples

### Example 1

```text
Input: ctor = [3, 2, [[1, 2], [0, 1]]], ops = ["move", "move", "move", "move", "move", "move"], args = [["R"], ["D"], ["R"], ["U"], ["L"], ["U"]]
Output: [0, 0, 1, 1, 2, -1]
Explanation: The snake eats at (1, 2) and (0, 1); moving up from row 0 leaves the grid.
```

### Example 2

```text
Input: ctor = [2, 2, [[0, 1], [1, 1], [1, 0]]], ops = ["move", "move", "move", "move"], args = [["R"], ["D"], ["L"], ["U"]]
Output: [1, 2, 3, 3]
Explanation: With length 4 on a 2 by 2 grid, moving up enters the cell the tail is leaving, which is allowed.
```
