# BST Validation

In this chapter a binary search tree may contain duplicates: every value in a node's left subtree is at most the node's value, and every value in its right subtree is at least the node's value.
Return whether the given binary tree is a valid binary search tree under that definition.

## Examples

### Example 1

```text
Input: root = [5, 2, 9, null, 4, 9, 11, null, null, null, 9]
Output: true
```

### Example 2

```text
Input: root = [5, 2, 12, null, 4, 10, 13, null, null, null, 9]
Output: false
Explanation: 9 is in the right subtree of 10 but is smaller than 10.
```

## Constraints

- `0 <= number of nodes <= 10^5` and the height is at most 500.
