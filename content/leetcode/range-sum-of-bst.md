# Range Sum of BST

Return the sum of all node values in the binary search tree that lie in the inclusive interval [low,high].

## Examples

### Example 1

```text
Input: root = [10, 5, 15, 3, 7, null, 18], low = 7, high = 15
Output: 32
Explanation: Include 7, 10, and 15.
```

### Example 2

```text
Input: root = [2, 1, 3], low = 2, high = 2
Output: 2
Explanation: The bounds select only the value 2.
```

## Constraints

- The tree contains 1 through 20,000 nodes with distinct values.
- 1 <= Node.val, low, high <= 100,000
- low <= high
