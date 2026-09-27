# Sliding Puzzle

A two-by-three board contains tiles 1 through 5 and one blank 0.
A move exchanges the blank with a horizontally or vertically adjacent tile.
Return the fewest moves to reach `[[1,2,3],[4,5,0]]`, or -1 if impossible.

## Constraints

- Each number from 0 through 5 occurs exactly once.

## Examples

### Example 1

```text
Input: board = [[1, 2, 3], [4, 0, 5]]
Output: 1
Explanation: Move tile 5 left into the blank.
```

### Example 2

```text
Input: board = [[1, 2, 3], [5, 4, 0]]
Output: -1
Explanation: This arrangement cannot reach the target.
```
