# Shortest Bridge

A square binary grid contains exactly two islands connected internally through shared edges.
Return the fewest 0 cells that must become 1 to connect those islands.

## Examples

### Example 1

```text
Input: grid = [[0, 1], [1, 0]]
Output: 1
Explanation: Changing either zero joins the diagonal islands.
```

### Example 2

```text
Input: grid = [[0, 1, 0], [0, 0, 0], [0, 0, 1]]
Output: 2
Explanation: Two water cells are needed to connect the islands.
```

## Constraints

- 2 <= grid.length == grid[i].length <= 100
- Each cell is 0 or 1; exactly two islands exist.
