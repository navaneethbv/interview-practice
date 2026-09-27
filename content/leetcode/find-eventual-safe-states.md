# Find Eventual Safe States

`graph[i]` lists directed neighbors of vertex i.
A vertex is safe when every possible path starting there eventually reaches a vertex with no outgoing edges.
Return all safe vertex indices in ascending order.

## Examples

### Example 1

```text
Input: graph = [[1, 2], [2, 3], [5], [0], [5], [], []]
Output: [2, 4, 5, 6]
Explanation: These vertices cannot lead into the cycle involving 0, 1, and 3.
```

### Example 2

```text
Input: graph = [[]]
Output: [0]
Explanation: A terminal vertex is safe.
```

## Constraints

- 1 <= graph.length <= 10,000
- Neighbor indices are valid and distinct within each list.
- At most 40,000 edges exist; self-loops are allowed.
