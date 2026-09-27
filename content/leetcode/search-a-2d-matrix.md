# Search a 2D Matrix

Each row of `matrix` is sorted in nondecreasing order, and the first value of each row is greater than the last value of the previous row.
Return whether `target` occurs in the matrix.
Use O(log(m * n)) time for an m by n matrix.

## Examples

### Example 1

```text
Input: matrix = [[1, 3, 5], [7, 9, 11]], target = 9
Output: true
Explanation: The second row contains 9.
```

### Example 2

```text
Input: matrix = [[1, 3, 5], [7, 9, 11]], target = 6
Output: false
Explanation: 6 lies between rows but is absent.
```

## Constraints

- 1 <= rows, columns <= 100.
- -10000 <= matrix[row][column], target <= 10000.
