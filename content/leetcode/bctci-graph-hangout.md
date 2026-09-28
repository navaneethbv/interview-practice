# Graph Hangout

The graph is given as an adjacency list: `graph[i]` lists the neighbors of node `i`, and nodes are numbered from 0.
The graph is undirected and connected.
Three friends start at `node1`, `node2`, and `node3` and want to meet at one node.
Return the minimum total number of edges the three of them traverse.

## Examples

### Example 1

```text
Input: graph = [[1, 4], [0, 2], [1, 3], [2, 4], [0, 3]], node1 = 0, node2 = 2, node3 = 4
Output: 3
```

### Example 2

```text
Input: graph = [[1, 2, 3], [0, 2, 3], [0, 1, 3], [0, 1, 2]], node1 = 0, node2 = 1, node3 = 2
Output: 2
```

## Constraints

- `1 <= graph.length <= 10^4`
