# Maximize Spanning Tree Stability with Upgrades

Each undirected edge is [u,v,strength,must].
Edges marked must=1 belong in the chosen spanning tree and cannot be upgraded.
You may double the strength of at most k optional edges, once each.
Maximize the smallest edge strength in a spanning tree, or return -1 when no valid spanning tree exists.

## Examples

### Example 1

```text
Input: n = 3, edges = [[0, 1, 4, 0], [1, 2, 3, 0], [0, 2, 1, 0]], k = 2
Output: 6
Explanation: Upgrade the edges with strengths 4 and 3, obtaining minimum strength 6.
```

### Example 2

```text
Input: n = 3, edges = [[0, 1, 8, 1], [1, 2, 5, 1], [0, 2, 9, 1]], k = 0
Output: -1
Explanation: The mandatory edges already form a cycle.
```

## Constraints

- 2 <= n <= 100000
- 1 <= edges.length <= 100000
- Endpoints are distinct nodes from 0 through n-1; no duplicate edges.
- 1 <= strength <= 100000; must is 0 or 1.
- 0 <= k <= n
