# Binary Tree Paths

Return all root-to-leaf paths as strings joining node values with ->.
A leaf has no children.
Paths may appear in any order.

## Examples

### Example 1

```text
Input: root = [1, 2, 3, null, 5]
Output: ["1->2->5", "1->3"]
Explanation: Each string follows a complete path to a leaf.
```

### Example 2

```text
Input: root = [1]
Output: ["1"]
Explanation: The root itself is a leaf.
```

## Constraints

- The tree contains 1 through 100 nodes.
- -100 <= Node.val <= 100
