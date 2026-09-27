# Inorder Successor in BST

Return the node immediately after p in the binary search tree's inorder traversal, or null if p is the final node.
All values are distinct, so the successor is the node with the smallest value greater than p.val.
A testcase identifies p by value; the function receives that actual node.
The displayed output is the successor value or null.

## Examples

### Example 1

```text
Input: root = [2, 1, 3], p = 1
Output: 2
Explanation: Node 2 follows node 1 in sorted order.
```

### Example 2

```text
Input: root = [2, 1, 3], p = 3
Output: null
Explanation: The largest node has no successor.
```

## Constraints

- The tree contains 1 through 10,000 nodes with distinct values.
- p belongs to the tree.
