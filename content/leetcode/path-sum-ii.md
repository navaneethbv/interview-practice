# Path Sum II

Return every root-to-leaf path whose node values sum to `targetSum`.
A leaf has no children.
Keep values in root-to-leaf order within each path; the paths may appear in any order.

## Examples

### Example 1

```text
Input: root = [1, 2, 3], targetSum = 3
Output: [[1, 2]]
Explanation: Only the path to leaf 2 has the desired sum.
```

### Example 2

```text
Input: root = [1, 2], targetSum = 1
Output: []
Explanation: The root alone is not a root-to-leaf path.
```

## Constraints

- The tree contains 0 through 5,000 nodes.
- -1,000 <= Node.val, targetSum <= 1,000
