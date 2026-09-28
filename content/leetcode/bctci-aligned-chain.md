# Aligned Chain

A node is aligned when its value equals its depth, with the root at depth 0.
A descendant chain is a sequence of nodes in which each node is the parent of the next.
Return the length, in nodes, of the longest descendant chain made only of aligned nodes; it need not start at the root.

## Examples

### Example 1

```text
Input: root = [7, 1, 3, 2, 8, null, 2, 4, 3, null, null, 3, 3]
Output: 3
Explanation: 1, 2, 3 down the left side is the longest aligned chain.
```

### Example 2

```text
Input: root = [0]
Output: 1
```

## Constraints

- `0 <= number of nodes <= 10^5` and the height is at most 500.
- `0 <= Node.val <= 10^9`
