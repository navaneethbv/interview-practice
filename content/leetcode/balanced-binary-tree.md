# Balanced Binary Tree

Determine whether every node's left and right subtrees differ in height by at most one.
The height of an empty subtree is zero.
The empty tree is balanced.

## Examples

### Example 1

```text
Input: root = [3, 9, 20, null, null, 15, 7]
Output: true
Explanation: Each node has child subtree heights differing by at most one.
```

### Example 2

```text
Input: root = [1, 2, null, 3]
Output: false
Explanation: The root has subtree heights 2 and 0.
```

## Constraints

- The tree contains 0 to 5000 nodes.
- -10000 <= node.val <= 10000.
