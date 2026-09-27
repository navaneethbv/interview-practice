# Find Center of Star Graph

The edges form a star: one center vertex is connected to every other vertex.
Return the center label.

## Examples

### Example 1

```text
Input: edges = [[1, 2], [2, 3], [4, 2]]
Output: 2
Explanation: Vertex 2 is present in every edge.
```

### Example 2

```text
Input: edges = [[1, 2], [1, 3]]
Output: 1
Explanation: Both edges meet at vertex 1.
```

## Constraints

- The star has n vertices labeled 1 through n, with 3 <= n <= 100,000.
- edges contains its n-1 undirected edges.
