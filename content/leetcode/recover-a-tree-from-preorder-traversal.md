# Recover a Tree From Preorder Traversal

The string records a binary tree in preorder.
Each node is written as its depth in hyphens followed by its positive integer value.
A node with only one child always has a left child.
Reconstruct and return the tree.

## Examples

### Example 1

```text
Input: traversal = "1-2--3--4-5--6--7"
Output: [1, 2, 5, 3, 4, 6, 7]
Explanation: Depth markers distinguish the children of nodes 2 and 5.
```

### Example 2

```text
Input: traversal = "1-2--3"
Output: [1, 2, null, 3]
Explanation: Single children are placed on the left.
```

## Constraints

- The encoding is valid and describes 1 through 1,000 nodes.
- 1 <= Node.val <= 10^9
