# Kth Smallest Element in a Sorted Matrix

Return the kth smallest value in a square matrix whose rows and columns are each sorted in nondecreasing order.
Count duplicate entries separately.

## Examples

### Example 1

```text
Input: matrix = [[1, 3], [2, 4]], k = 3
Output: 3
Explanation: The sorted entries are 1, 2, 3, 4.
```

### Example 2

```text
Input: matrix = [[1, 1], [1, 2]], k = 3
Output: 1
Explanation: The three occurrences of 1 occupy the first three ranks.
```

## Constraints

- The matrix is n by n, with 1 <= n <= 300.
- 1 <= k <= n * n.
- -1000000000 <= entries <= 1000000000.
