# Shortest Path to Get Food

A grid contains exactly one starting cell *, food cells #, open cells O, and blocked cells X.
Move through edge-adjacent nonblocked cells.
Return the fewest steps from the start to any food cell, or -1 if no food is reachable.

## Examples

### Example 1

```text
Input: grid = [["*", "O", "#"]]
Output: 2
Explanation: Move right twice to reach food.
```

### Example 2

```text
Input: grid = [["*", "X", "#"]]
Output: -1
Explanation: A wall blocks the only route.
```

## Constraints

- 1 <= grid.length, grid[i].length <= 200
- The grid is rectangular and uses only *, #, O, and X.
- Exactly one cell is *.
