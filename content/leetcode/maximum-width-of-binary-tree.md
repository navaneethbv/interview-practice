# Maximum Width of Binary Tree

Return the largest width among all levels of a binary tree.
Width counts the complete-tree positions from the leftmost real node to the rightmost real node on a level, including missing nodes between them.

## Examples

### Example 1

```text
Input: root = [1, 3, 2, 5, 3, null, 9]
Output: 4
Explanation: The last level spans four positions, including one gap.
```

### Example 2

```text
Input: root = [1, 3, null, 5, 3]
Output: 2
Explanation: The two nodes on the last level are adjacent.
```

## Constraints

- The tree contains 1 through 3,000 nodes.
- -100 <= Node.val <= 100
- The answer fits a signed 32-bit integer.
