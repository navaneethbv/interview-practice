# Minimum Swaps to Arrange a Binary Grid

One operation swaps two neighboring rows of a square binary grid.
Return the fewest operations needed to make every cell strictly above the main diagonal zero, or -1 if impossible.

## Examples

### Example 1

```text
Input: grid = [[0, 0, 1], [1, 1, 0], [1, 0, 0]]
Output: 3
Explanation: Move the last row to the top, then place the middle row second.
```

### Example 2

```text
Input: grid = [[1, 0], [0, 1]]
Output: 0
Explanation: All cells above the diagonal are already zero.
```

## Constraints

- 1 <= grid.length == grid[i].length <= 200
- Each cell is 0 or 1.
