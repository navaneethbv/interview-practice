# Rotting Oranges

Grid cells contain 0 for empty space, 1 for a fresh orange, or 2 for a rotten orange.
Each minute, every currently rotten orange simultaneously rots its edge-adjacent fresh neighbors.
Return the minutes until no fresh oranges remain, or -1 if some can never rot.

## Examples

### Example 1

```text
Input: grid = [[2, 1, 1]]
Output: 2
Explanation: Rot spreads one position to the right per minute.
```

### Example 2

```text
Input: grid = [[2, 0, 1]]
Output: -1
Explanation: The empty cell isolates the fresh orange.
```

## Constraints

- 1 <= grid.length, grid[i].length <= 10
- The rectangular grid contains only 0, 1, and 2.
