# Remove Max Number of Edges to Keep Graph Fully Traversable

Each undirected edge is `[type, u, v]` on nodes 1 through n.
Type 1 is usable only by Alice, type 2 only by Bob, and type 3 by both.
Remove as many edges as possible while leaving both Alice and Bob able to reach every node from every other node.
Return the maximum removal count, or -1 when even the full graph is insufficient.

## Examples

### Example 1

```text
Input: n = 4, edges = [[3, 1, 2], [3, 2, 3], [1, 1, 3], [1, 2, 4], [1, 1, 2], [2, 3, 4]]
Output: 2
Explanation: Keep two shared edges and one exclusive edge for each traveler.
```

### Example 2

```text
Input: n = 3, edges = [[1, 1, 2], [1, 2, 3], [2, 1, 2]]
Output: -1
Explanation: Bob cannot reach node 3.
```

## Constraints

- 1 <= n <= 100000.
- Edges contain valid endpoints and types 1 through 3.
- No identical typed edge occurs twice.
- 0 <= edges.length <= 100000.
