# Unique Paths II

Count paths from the top-left cell to the bottom-right cell that only move right or down.
A cell containing 1 is blocked and cannot be entered; a cell containing 0 is open.
A blocked start or destination permits no path.

## Examples

### Example 1

```text
Input: obstacleGrid = [[0, 0, 0], [0, 1, 0], [0, 0, 0]]
Output: 2
Explanation: The blocked center leaves one path around each side.
```

### Example 2

```text
Input: obstacleGrid = [[1]]
Output: 0
Explanation: The starting cell is blocked.
```

## Constraints

- 1 <= rows, columns <= 100.
- Cells contain 0 or 1.
- The answer is at most 2000000000.
