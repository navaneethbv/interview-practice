# Binary Tree Vertical Order Traversal

Assign the root column 0, each left child its parent's column minus one, and each right child its parent's column plus one.
Return node values grouped by column from left to right.
Within a column, list nodes from top to bottom, and break ties at the same depth from left to right.

## Examples

### Example 1

```text
Input: root = [3, 9, 20, null, null, 15, 7]
Output: [[9], [3, 15], [20], [7]]
Explanation: Node 15 shares the root column at a deeper level.
```

### Example 2

```text
Input: root = [1, 2, 3, 4, 5, 6, 7]
Output: [[4], [2], [1, 5, 6], [3], [7]]
Explanation: Nodes 5 and 6 share a depth and column, so 5 comes first.
```

## Constraints

- The tree contains 0 to 100 nodes.
- -100 <= node.val <= 100.
