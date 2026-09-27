# Making A Large Island

You may change at most one 0 cell to 1 in a square binary grid.
Return the largest possible island area after the change.
Islands connect 1 cells through shared edges.

## Examples

### Example 1

```text
Input: grid = [[1, 0], [0, 1]]
Output: 3
Explanation: One change joins both original islands into an area of three.
```

### Example 2

```text
Input: grid = [[1, 1], [1, 1]]
Output: 4
Explanation: No change is needed.
```

## Constraints

- 1 <= grid.length == grid[i].length <= 500
- Each cell is 0 or 1.
