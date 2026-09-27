# Diameter of Binary Tree

Return the largest number of edges on a path between any two nodes in the binary tree.
The path may pass through the root, but does not have to.
Trees are encoded in level order, using null for a missing child.

## Examples

### Example 1

```text
Input: root = [1, 2, 3, 4, 5]
Output: 3
Explanation: The path from node 4 through 2 and 1 to 3 uses three edges.
```

### Example 2

```text
Input: root = [8]
Output: 0
Explanation: A single node has no edges.
```

## Constraints

- The tree contains 1 to 10000 nodes.
- -100 <= node.val <= 100.
