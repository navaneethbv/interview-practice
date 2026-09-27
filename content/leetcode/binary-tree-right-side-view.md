# Binary Tree Right Side View

Imagine looking at a binary tree from its right side.
Return the value of the rightmost existing node at each depth, from the root downward.
A visible node can belong to a left subtree when no node lies to its right at that depth.

## Examples

### Example 1

```text
Input: root = [1, 2, 3, 4]
Output: [1, 3, 4]
Explanation: At the deepest level, node 4 is visible even though it lies in the left subtree.
```

### Example 2

```text
Input: root = []
Output: []
Explanation: The empty tree has no visible nodes.
```

## Constraints

- The tree contains 0 to 100 nodes.
- -100 <= node.val <= 100.
