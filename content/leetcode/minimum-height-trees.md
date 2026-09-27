# Minimum Height Trees

The undirected edges form a tree on vertices 0 through `n - 1`.
Choosing a root gives a height equal to its largest edge distance to any vertex.
Return all roots that achieve the smallest possible height, in any order.

## Examples

### Example 1

```text
Input: n = 4, edges = [[1, 0], [1, 2], [1, 3]]
Output: [1]
Explanation: The center reaches every leaf in one edge.
```

### Example 2

```text
Input: n = 2, edges = [[0, 1]]
Output: [0, 1]
Explanation: Either endpoint produces height 1.
```

## Constraints

- 1 <= n <= 20,000
- edges contains exactly n - 1 distinct edges and forms a connected tree.
