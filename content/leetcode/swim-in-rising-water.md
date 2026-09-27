# Swim in Rising Water

Each cell of an `n` by `n` grid has a distinct elevation.
At time t, you can occupy and move between edge-adjacent cells whose elevations are at most t.
Movement itself takes no time.
Return the earliest time at which you can travel from the top-left cell to the bottom-right cell.

## Examples

### Example 1

```text
Input: grid = [[0, 2], [1, 3]]
Output: 3
Explanation: The destination itself is unavailable until time 3.
```

### Example 2

```text
Input: grid = [[3, 2], [0, 1]]
Output: 3
Explanation: The starting cell is unavailable until time 3.
```

## Constraints

- 1 <= n <= 50
- grid contains every integer from 0 through n*n - 1 exactly once.
