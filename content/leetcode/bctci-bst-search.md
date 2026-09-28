# BST Search

In this chapter a binary search tree may contain duplicates: every value in a node's left subtree is at most the node's value, and every value in its right subtree is at least the node's value.
Return whether the tree contains `target`.

## Examples

### Example 1

```text
Input: root = [5, 2, 9, null, 4, 9, 11, null, null, null, 9], target = 4
Output: true
```

### Example 2

```text
Input: root = [5, 2, 9, null, 4, 9, 11, null, null, null, 9], target = 3
Output: false
```

## Constraints

- `0 <= number of nodes <= 10^5`
- `0 <= Node.val, target <= 10^9`
