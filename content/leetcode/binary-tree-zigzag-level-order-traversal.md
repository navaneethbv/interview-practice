# Binary Tree Zigzag Level Order Traversal

Return the tree values one level at a time.
List the root level left to right, the next level right to left, and keep alternating direction.

## Examples

### Example 1

```text
Input: root = [3, 9, 20, null, null, 15, 7]
Output: [[3], [20, 9], [15, 7]]
Explanation: Reverse the order of the second level only.
```

### Example 2

```text
Input: root = []
Output: []
Explanation: An empty tree has no levels.
```

## Constraints

- The tree contains 0 through 2,000 nodes.
- -100 <= Node.val <= 100
