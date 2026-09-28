# BST Merge Into Array

In this chapter a binary search tree may contain duplicates: every value in a node's left subtree is at most the node's value, and every value in its right subtree is at least the node's value.
Given the roots of two such trees, return all of their values in one sorted array, keeping duplicates.

## Examples

### Example 1

```text
Input: root1 = [5, 2, 9, null, 4, 9, 11, null, null, null, 9], root2 = [3, 1, 6]
Output: [1, 2, 3, 4, 5, 6, 9, 9, 9, 11]
```

### Example 2

```text
Input: root1 = [], root2 = [2]
Output: [2]
```

## Constraints

- Each tree has at most `10^5` nodes.
