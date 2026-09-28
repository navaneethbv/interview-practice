# Hilliest Connected Component

The graph is given as an adjacency list: `graph[i]` lists the neighbors of node `i`, and nodes are numbered from 0.
The graph is undirected and `heights[i]` is the height of node `i`.
The gain of an edge is the absolute height difference of its endpoints.
The hilliness of a connected component is the average gain of its edges, or 0 if it has no edges.
Return the largest hilliness of any component; answers within `10^-6` are accepted.

## Examples

### Example 1

```text
Input: graph = [[1, 3], [0, 2], [1, 3], [0, 2]], heights = [4.0, 1.0, 3.0, 2.0]
Output: 2.0
```

### Example 2

```text
Input: graph = [[1], [0], [3], [2]], heights = [1.5, 5.5, 0.0, 5.0]
Output: 5.0
```

## Constraints

- `1 <= graph.length <= 1,000`
- `0 <= heights[i] < 10^9`
