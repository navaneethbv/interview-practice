# Count Good Nodes in Binary Tree

A node is good when its value is at least as large as every value on the path from the root to that node.
Count the good nodes in the tree.
The root always qualifies, and equal values do not disqualify a node.

## Examples

### Example 1

```text
Input: root = [3, 1, 4, 3, null, 1, 5]
Output: 4
Explanation: The root, the second 3, the 4, and the 5 qualify.
```

### Example 2

```text
Input: root = [2, 2, 2]
Output: 3
Explanation: Each value equals the largest value on its path.
```

## Constraints

- The tree contains 1 to 100000 nodes.
- -10000 <= node.val <= 10000.
