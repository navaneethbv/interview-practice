# Longest Cycle in a Graph

A directed graph has `n` nodes, and each node has at most one outgoing edge: `edges[i]` is the target of node `i`, or -1 if there is none.
Return the length of the longest cycle, or -1 if the graph has no cycle.

## Constraints

- 2 <= n <= 10^5
- -1 <= edges[i] < n and edges[i] != i

## Examples

### Example 1

```text
Input: edges = [3, 3, 4, 2, 3]
Output: 3
Explanation: The cycle 2 -> 4 -> 3 -> 2 has length 3.
```

### Example 2

```text
Input: edges = [2, -1, 3, 1]
Output: -1
Explanation: Every walk ends at node 1, which has no outgoing edge.
```
