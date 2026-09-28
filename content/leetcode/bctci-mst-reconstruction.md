# MST Reconstruction

The undirected graph uses vertices `0` through `V - 1` and weighted edges `[u, v, weight]`.
A spanning tree connects all vertices without cycles; its cost is the sum of its edge weights.
Return the selected edges, or `[]` if no spanning tree exists.
For reproducible results, use this tie rule: process edges by increasing weight, breaking equal-weight ties by their original input index, and take each edge that joins two separate components.
Return selected edges in that processing order, preserving each input edge's endpoint order.
For V = 0 or V = 1, return `[]`.

## Constraints

- V <= 1,000; each pair of distinct vertices has at most one edge.
- Edge endpoints are valid; weights are between -1,000,000 and 1,000,000.


## Examples

### Example 1

```text
Input: [3, [[0, 1, 4], [0, 2, 1], [1, 2, 2]]]
Output: [[0, 2, 1], [1, 2, 2]]
```

### Example 2

```text
Input: [3, [[0, 1, 1]]]
Output: []
```
