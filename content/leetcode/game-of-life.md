# Game of Life

Update a board of live cells (1) and dead cells (0) by one simultaneous generation.
Each cell has up to eight horizontal, vertical, and diagonal neighbors.
A live cell survives with two or three live neighbors; otherwise it dies.
A dead cell becomes live only when it has exactly three live neighbors.
Mutate board without returning a new board; neighbor counts must use the original generation.

## Examples

```text
Input: board = [[0,1,0],[0,1,0],[0,1,0]]
Output: [[0,0,0],[1,1,1],[0,0,0]]
Explanation: The vertical line changes into a horizontal line.
```

```text
Input: board = [[1]]
Output: [[0]]
Explanation: A lone live cell has no neighbors and dies.
```

## Constraints

- 1 <= rows, columns <= 25
- Every entry is 0 or 1.
- Cells outside the finite board are dead.
