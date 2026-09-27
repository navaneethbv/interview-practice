# Find a Peak Element II

Return `[row, column]` for any cell strictly larger than each of its existing horizontal and vertical neighbors.
Treat the outside boundary as having value -1.
Adjacent cells never have equal values.
Target O(rows * log(columns)) or O(columns * log(rows)) time.

## Examples

### Example 1

```text
Input: mat = [[1, 4], [3, 2]]
Output: [0, 1]
Explanation: 4 exceeds both of its neighbors.
```

### Example 2

```text
Input: mat = [[7]]
Output: [0, 0]
Explanation: The only cell exceeds the outside boundary.
```

## Constraints

- 1 <= rows, columns <= 500.
- 1 <= mat[row][column] <= 100000.
