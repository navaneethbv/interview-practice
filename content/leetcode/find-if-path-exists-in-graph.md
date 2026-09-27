# Find if Path Exists in Graph

An undirected graph has vertices 0 through n-1.
Return whether some path connects source to destination.
A vertex can reach itself without traversing an edge.

## Examples

### Example 1

```text
Input: n = 3, edges = [[0, 1], [1, 2]], source = 0, destination = 2
Output: true
Explanation: The route passes through vertex 1.
```

### Example 2

```text
Input: n = 4, edges = [[0, 1], [2, 3]], source = 0, destination = 3
Output: false
Explanation: The endpoints belong to different components.
```

## Constraints

- 1 <= n <= 200,000
- 0 <= edges.length <= 200,000
- Edges join distinct valid vertices without duplicates.
- source and destination are valid vertex indices.
