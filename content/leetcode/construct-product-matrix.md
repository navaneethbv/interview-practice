# Construct Product Matrix

Create a matrix of the same shape in which each cell is the product of every input cell except itself, taken modulo 12345.

## Examples

### Example 1

```text
Input: grid = [[2, 3], [4, 5]]
Output: [[60, 40], [30, 24]]
Explanation: For example, omitting 2 leaves product 3*4*5 = 60.
```

### Example 2

```text
Input: grid = [[12345, 7]]
Output: [[7, 0]]
Explanation: The product containing 12345 is zero modulo 12345.
```

## Constraints

- 2 <= total number of cells <= 100000
- 1 <= grid[i][j] <= 1000000000
