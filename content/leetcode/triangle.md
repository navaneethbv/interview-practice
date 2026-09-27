# Triangle

Start at the top of a triangle of numbers.
From index i on one row, move to index i or i+1 on the next row.
Return the smallest total along a path ending on the bottom row.

## Examples

### Example 1

```text
Input: triangle = [[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]
Output: 11
Explanation: The path 2, 3, 5, 1 totals 11.
```

### Example 2

```text
Input: triangle = [[-10]]
Output: -10
Explanation: The only path contains the top entry.
```

## Constraints

- 1 <= triangle.length <= 200
- Row i contains i+1 integers.
- -10,000 <= triangle[i][j] <= 10,000
