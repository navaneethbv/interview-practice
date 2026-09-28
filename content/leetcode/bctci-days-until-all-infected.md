# Days Until All Infected

The graph is given as an adjacency list: `graph[i]` lists the neighbors of node `i`, and nodes are numbered from 0.
The graph is undirected and connected, and `infected` lists the initially infected nodes.
Each day, every node adjacent to an infected node becomes infected.
Return the number of days until every node is infected.

## Examples

### Example 1

```text
Input: graph = [[1, 2], [0, 2], [0, 1, 3], [2]], infected = [0]
Output: 2
```

### Example 2

```text
Input: graph = [[1], [0, 2], [1, 3], [2, 4], [3]], infected = [0, 4]
Output: 2
```

## Constraints

- `1 <= graph.length <= 10^4`
- `1 <= infected.length <= graph.length` with no duplicates.
