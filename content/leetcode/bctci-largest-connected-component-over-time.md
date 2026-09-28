# Largest Connected Component Over Time

There are `V` initially isolated vertices numbered from 0.
Each undirected edge `[u, v, time]` becomes available at that time and remains available afterward.
For every query in the nondecreasing array `times`, return the largest component size.
Edges whose timestamp equals the query are already present.

## Constraints

- 1 <= V <= 1,000; no self-loops or repeated undirected edges.
- 0 <= edges.length <= V * (V - 1) / 2.
- 1 <= times.length <= 1,000,000.
- Timestamps and query times are between 1 and 1,000,000,000.


## Examples

### Example 1

```text
Input: [3, [[0, 1, 2], [1, 2, 4]], [1, 2, 4]]
Output: [1, 2, 3]
```

### Example 2

```text
Input: [1, [], [1, 9]]
Output: [1, 1]
```
