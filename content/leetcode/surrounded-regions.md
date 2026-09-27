# Surrounded Regions

Replace every O region that cannot reach the edge of the board with X, modifying `board` in place.
A region connects O cells through shared edges.
Any O connected to a boundary O must be preserved.
The displayed output is the updated board.

## Examples

### Example 1

```text
Input: board = [["X", "X", "X"], ["X", "O", "X"], ["X", "X", "X"]]
Output: [["X", "X", "X"], ["X", "X", "X"], ["X", "X", "X"]]
Explanation: The center O has no path to a boundary.
```

### Example 2

```text
Input: board = [["X", "O", "X"], ["X", "O", "X"], ["X", "X", "X"]]
Output: [["X", "O", "X"], ["X", "O", "X"], ["X", "X", "X"]]
Explanation: The middle O connects to the top boundary.
```

## Constraints

- 1 <= board.length, board[i].length <= 200
- The rectangular board contains only X and O.
