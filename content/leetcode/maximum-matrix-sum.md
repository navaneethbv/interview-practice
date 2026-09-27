# Maximum Matrix Sum

You may repeatedly choose two cells sharing an edge and multiply both values by -1.
Return the largest sum of all matrix entries obtainable through such operations.

## Examples

### Example 1

```text
Input: matrix = [[1, -1], [-1, 1]]
Output: 4
Explanation: An even number of negative entries can all become positive.
```

### Example 2

```text
Input: matrix = [[1, 2], [-3, 4]]
Output: 8
Explanation: Keep only the smallest magnitude negative, for a sum of -1+2+3+4.
```

## Constraints

- matrix is n by n with 2 <= n <= 250.
- -100000 <= matrix[i][j] <= 100000.
