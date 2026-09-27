# Path Sum

Return whether a root-to-leaf path has node values summing to `targetSum`.
A leaf has no children, and an empty tree contains no such path.

## Examples

### Example 1

```text
Input: root = [1, 2, 3], targetSum = 3
Output: true
Explanation: The path from 1 to leaf 2 sums to 3.
```

### Example 2

```text
Input: root = [1, 2], targetSum = 1
Output: false
Explanation: The root alone is not a complete path to a leaf.
```

## Constraints

- The tree contains 0 through 5,000 nodes.
- -1,000 <= Node.val, targetSum <= 1,000
