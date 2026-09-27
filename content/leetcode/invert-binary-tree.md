# Invert Binary Tree

Mirror the tree by exchanging the left and right children of every node.
Return the resulting root.
The editor represents trees in level order and omits trailing nulls.

## Constraints

- The tree contains 0 to 100 nodes.
- Node values range from -100 to 100.

## Examples

### Example 1

```text
Input: root = [5, 2, 9, 1, null, 7, 10]
Output: [5, 9, 2, 10, 7, null, 1]
Explanation: Every left child becomes a right child and vice versa.
```

### Example 2

```text
Input: root = []
Output: null
Explanation: The empty tree remains empty.
```
