# All Paths From Source to Target

Given a directed acyclic graph, return all paths from vertex 0 to vertex n-1.
`graph[i]` lists the outgoing neighbors of i.
Keep each path in traversal order; paths may be listed in any order.

## Examples

### Example 1

```text
Input: graph = [[1, 2], [3], [3], []]
Output: [[0, 1, 3], [0, 2, 3]]
Explanation: Both routes from 0 reach the final vertex 3.
```

### Example 2

```text
Input: graph = [[1], []]
Output: [[0, 1]]
Explanation: There is one direct path.
```

## Constraints

- 2 <= graph.length <= 15
- Edges join valid distinct vertices without duplicates; the graph is acyclic.
