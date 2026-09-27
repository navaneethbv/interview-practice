# Maximum Side Length of a Square With Sum Less Than or Equal to Threshold

Find the largest side length of an axis-aligned square submatrix whose entries sum to at most threshold.
Return 0 if no nonempty square qualifies.

## Examples

### Example 1

```text
Input: mat = [[1, 1, 1], [1, 1, 1], [1, 1, 1]], threshold = 4
Output: 2
Explanation: A side-2 square sums to 4, while the side-3 square sums to 9.
```

### Example 2

```text
Input: mat = [[5]], threshold = 4
Output: 0
Explanation: The only cell exceeds the threshold.
```

## Constraints

- 1 <= rows, columns <= 300.
- 0 <= mat[i][j] <= 10000.
- 0 <= threshold <= 100000.
