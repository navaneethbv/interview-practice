# Maximum Path Quality of a Graph

Start at node 0 of an undirected weighted graph, walk for at most maxTime, and finish at node 0.
You may revisit nodes and edges.
A walk's quality is the sum of values of distinct visited nodes, counting each at most once.
Return the maximum quality.

## Constraints

- There are 1 to 1000 nodes with nonnegative values no greater than 100000000.
- Edges are `[u,v,time]`, with times from 10 to 100.
- Each node has degree at most 4; `10 <= maxTime <= 100`.

## Examples

### Example 1

```text
Input: values = [5, 10], edges = [[0, 1, 10]], maxTime = 20
Output: 15
Explanation: Visit node 1 and return, collecting both values.
```

### Example 2

```text
Input: values = [5, 100], edges = [[0, 1, 10]], maxTime = 19
Output: 5
Explanation: There is insufficient time to visit 1 and return.
```
