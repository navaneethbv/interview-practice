# Boundary of Binary Tree

Return the boundary in counterclockwise order: root, left boundary excluding leaves, all leaves from left to right, then right boundary excluding leaves in reverse.
For a boundary path, prefer the outward child and use the other child only when needed.
The left boundary starts at root.left and the right boundary starts at root.right; do not repeat any node.

## Examples

### Example 1

```text
Input: root = [1, null, 2, 3, 4]
Output: [1, 3, 4, 2]
Explanation: There is no left boundary; list the leaves before the reversed right boundary.
```

### Example 2

```text
Input: root = [1, 2, 3, 4, 5, 6, 7]
Output: [1, 2, 4, 5, 6, 7, 3]
Explanation: Visit the outside nodes counterclockwise.
```

## Constraints

- The tree contains 1 through 10,000 nodes.
- -1,000 <= Node.val <= 1,000
