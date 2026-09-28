# Edge In MST

The undirected graph uses vertices `0` through `V - 1` and weighted edges `[u, v, weight]`.
A spanning tree connects all vertices without cycles; its cost is the sum of its edge weights.
Return whether the edge at index `i` belongs to every minimum spanning tree.
The graph is connected and V >= 2.

## Constraints

- V <= 1,000; each pair of distinct vertices has at most one edge.
- Edge endpoints are valid; weights are between -1,000,000 and 1,000,000.
- 0 <= i < edges.length.


## Examples

### Example 1

```text
Input: [3, [[0, 1, 1], [1, 2, 1], [0, 2, 1]], 0]
Output: false
```

### Example 2

```text
Input: [3, [[0, 1, 1], [1, 2, 2], [0, 2, 3]], 1]
Output: true
```
