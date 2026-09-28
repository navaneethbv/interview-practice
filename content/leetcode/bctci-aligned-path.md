# Aligned Path

A node is aligned when its value equals its depth, with the root at depth 0.
A path may start and end at any nodes and follows parent-child edges without repeating a node.
Return the number of nodes on the longest path made only of aligned nodes.

## Examples

### Example 1

```text
Input: root = [7, 1, 3, 2, 8, null, 2, 4, 3, null, null, 3, 3]
Output: 3
Explanation: 1, 2, 3 on the left and 3, 2, 3 on the right both have 3 nodes.
```

### Example 2

```text
Input: root = [5]
Output: 0
```

## Constraints

- `0 <= number of nodes <= 10^5` and the height is at most 500.
