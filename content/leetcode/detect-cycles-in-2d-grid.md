# Detect Cycles in 2D Grid

Return whether the grid contains a cycle of at least four cells with the same character.
Each move uses a shared edge, and the path may not immediately return to the cell it just left.

## Examples

### Example 1

```text
Input: grid = [["a", "a"], ["a", "a"]]
Output: true
Explanation: The four cells form a loop.
```

### Example 2

```text
Input: grid = [["a", "b"], ["b", "a"]]
Output: false
Explanation: Equal characters touch only diagonally.
```

## Constraints

- 1 <= grid.length, grid[i].length <= 500
- The rectangular grid contains lowercase English letters.
