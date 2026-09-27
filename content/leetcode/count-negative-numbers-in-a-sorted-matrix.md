# Count Negative Numbers in a Sorted Matrix

Rows and columns of grid are sorted in nonincreasing order.
Count entries strictly less than zero.
Zero does not count as negative.

## Examples

### Example 1

```text
Input: grid = [[4, 3, -1], [2, 0, -2], [-1, -2, -3]]
Output: 5
Explanation: There are five entries below zero.
```

### Example 2

```text
Input: grid = [[3, 2], [1, 0]]
Output: 0
Explanation: All entries are nonnegative.
```

## Constraints

- 1 <= rows, columns <= 100.
- -100 <= grid[i][j] <= 100.
