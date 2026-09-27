# Redundant Connection

An undirected graph was a tree on nodes 1 through n before one extra edge was added.
Return an edge whose removal restores a tree.
If multiple removals work, return the edge appearing latest in edges, preserving its endpoint order.

## Examples

### Example 1

```text
Input: edges = [[1, 2], [1, 3], [2, 3]]
Output: [2, 3]
Explanation: Removing the final edge breaks the only cycle.
```

### Example 2

```text
Input: edges = [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]
Output: [1, 4]
Explanation: The edge to node 5 is outside the cycle.
```

## Constraints

- 3 <= edges.length == n <= 1000
- 1 <= edges[i][0] < edges[i][1] <= n
- There are no repeated edges; the graph is a tree plus one extra edge.
