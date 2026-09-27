# Number of Operations to Make Network Connected

Computers 0 through n - 1 are joined by undirected cables.
In one operation, unplug one existing cable and reconnect it between any two computers.
Return the fewest operations needed to connect the entire network, or -1 if there are not enough cables.

## Examples

### Example 1

```text
Input: n = 4, connections = [[0, 1], [0, 2], [1, 2]]
Output: 1
Explanation: Move one redundant triangle edge to computer 3.
```

### Example 2

```text
Input: n = 4, connections = [[0, 1], [2, 3]]
Output: -1
Explanation: At least three cables are needed for four computers.
```

## Constraints

- 1 <= n <= 100000.
- Connections contain distinct pairs of different valid computers.
- 0 <= connections.length <= min(100000, n * (n - 1) / 2).
