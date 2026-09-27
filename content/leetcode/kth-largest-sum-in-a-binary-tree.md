# Kth Largest Sum in a Binary Tree

Sum the node values independently at each depth of the tree.
Return the kth largest level sum, counting equal sums separately, or -1 if there are fewer than k levels.

## Examples

### Example 1

```text
Input: root = [5, 8, 9, 2, 1, 3, 7, 4, 6], k = 2
Output: 13
Explanation: The level sums are 5, 17, 13, and 10.
```

### Example 2

```text
Input: root = [1], k = 2
Output: -1
Explanation: The tree has only one level.
```

## Constraints

- The tree contains 1 through 100,000 nodes.
- 1 <= Node.val <= 10^6
- 1 <= k <= 100,000
