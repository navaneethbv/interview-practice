# Binary Tree Level Order Traversal II

Return node values level by level from the deepest level up to the root.
Within each level, retain left-to-right order.

## Examples

### Example 1

```text
Input: root = [3, 9, 20, null, null, 15, 7]
Output: [[15, 7], [9, 20], [3]]
Explanation: Read the usual levels in reverse level order.
```

### Example 2

```text
Input: root = []
Output: []
Explanation: An empty tree has no levels.
```

## Constraints

- The tree contains 0 through 2,000 nodes.
- -1,000 <= Node.val <= 1,000
