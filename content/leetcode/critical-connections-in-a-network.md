# Critical Connections in a Network

A connected undirected network has servers 0 through n - 1.
Find every connection whose removal disconnects the network.
Return those edges in any order, and either endpoint order is accepted.

## Examples

### Example 1

```text
Input: n = 4, connections = [[0, 1], [1, 2], [2, 0], [1, 3]]
Output: [[1, 3]]
Explanation: Only removing the link to server 3 disconnects a server.
```

### Example 2

```text
Input: n = 3, connections = [[0, 1], [1, 2], [2, 0]]
Output: []
Explanation: Every edge has an alternate route.
```

## Constraints

- 2 <= n <= 100000.
- Connections are distinct edges between different servers.
- n - 1 <= connections.length <= 100000.
