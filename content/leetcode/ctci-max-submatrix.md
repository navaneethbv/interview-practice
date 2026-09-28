# Max Submatrix

Given a matrix of positive and negative integers, return the largest sum of any non-empty rectangular submatrix.

## Examples

### Example 1

```text
Input: matrix = [[9, -8, 1, 3, -2], [-3, 7, 6, -2, 4], [6, -4, -4, 8, -7]]
Output: 19
Explanation: Rows 0 to 2 and columns 0 to 3 sum to 19.
```

### Example 2

```text
Input: matrix = [[-3, -1], [-2, -5]]
Output: -1
```

## Constraints

- `1 <= rows, cols <= 100`
- `-10,000 <= matrix[i][j] <= 10,000`
