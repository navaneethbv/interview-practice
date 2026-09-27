# Network Delay Time

There are `n` nodes labeled 1 through `n`.
Each directed edge [u, v, w] in `times` takes w units of time to carry a signal from u to v.
A signal starts at node `k` at time 0 and can propagate along multiple edges.
Return when every node has first received the signal, or -1 if some node is unreachable.

## Examples

### Example 1

```text
Input: times = [[1, 2, 2], [2, 3, 4], [1, 3, 9]], n = 3, k = 1
Output: 6
Explanation: Node 3 receives the signal through node 2 at time 6.
```

### Example 2

```text
Input: times = [[1, 2, 1]], n = 2, k = 2
Output: -1
Explanation: There is no outgoing route from node 2 to node 1.
```

## Constraints

- 1 <= k <= n <= 100
- 0 <= times.length <= 6,000
- Edges connect different nodes; each ordered pair occurs at most once.
- 0 <= w <= 100
