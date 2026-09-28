# Shortest-Path Queries

The graph is given as an adjacency list: `graph[i]` lists the neighbors of node `i`, and nodes are numbered from 0.
The graph is undirected.
For each node in `queries`, return a shortest path from `start` to it as a list of nodes, or an empty list if it is unreachable.
When several shortest paths exist, any of them is accepted.

## Examples

### Example 1

```text
Input: graph = [[1], [0, 2, 5, 4], [1, 4, 5], [], [5, 2, 1], [1, 2, 4]], start = 0, queries = [1, 0, 3, 4]
Output: [[0, 1], [0], [], [0, 1, 4]]
```

### Example 2

```text
Input: graph = [[1], [0], [3], [2]], start = 0, queries = [1, 2, 3]
Output: [[0, 1], [], []]
```

## Constraints

- `graph.length <= 10^4` and `queries.length <= 1,000`
