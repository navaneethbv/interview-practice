# Cyclically Rotating a Grid

Rotate every rectangular layer of the grid counterclockwise by k positions.
A layer follows the perimeter of its rectangle, and all layers rotate independently.
Return the resulting grid.

## Examples

### Example 1

```text
Input: grid = [[1, 2], [3, 4]], k = 1
Output: [[2, 4], [1, 3]]
Explanation: Each perimeter value moves one position counterclockwise.
```

### Example 2

```text
Input: grid = [[1, 2], [3, 4]], k = 4
Output: [[1, 2], [3, 4]]
Explanation: Four steps make a complete rotation.
```

## Constraints

- 2 <= grid.length, grid[0].length <= 50; both dimensions are even.
- 1 <= grid[i][j] <= 5000
- 1 <= k <= 1000000000
