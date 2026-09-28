# BST Kth Element

In this chapter a binary search tree may contain duplicates: every value in a node's left subtree is at most the node's value, and every value in its right subtree is at least the node's value.
Return the `k`-th smallest value in the tree, counting from 0 and including duplicates.

## Examples

### Example 1

```text
Input: root = [5, 2, 9, null, 4, 9, 11], k = 4
Output: 9
```

### Example 2

```text
Input: root = [5, 2, 9, null, 4, 9, 11], k = 0
Output: 2
```

## Constraints

- `1 <= n <= 10^5` and `0 <= k <= n - 1`
