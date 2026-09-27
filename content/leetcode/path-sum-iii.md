# Path Sum III

Count downward paths whose node values sum to `targetSum`.
A path may begin and end at any nodes, but every step must go from parent to child and the path must be nonempty.

## Examples

### Example 1

```text
Input: root = [10, 5, -3, 3, 2, null, 11, 3, -2, null, 1], targetSum = 8
Output: 3
Explanation: The paths are 5 to 3, 5 to 2 to 1, and -3 to 11.
```

### Example 2

```text
Input: root = [0, 0, 0], targetSum = 0
Output: 5
Explanation: Count each single node and both root-to-child paths.
```

## Constraints

- The tree contains 0 through 1,000 nodes.
- -10^9 <= Node.val <= 10^9
- -1,000 <= targetSum <= 1,000
