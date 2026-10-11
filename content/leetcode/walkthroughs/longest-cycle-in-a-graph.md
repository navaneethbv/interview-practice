## Intuition

With at most one outgoing edge per node, following edges from any node traces a single path that either stops or enters a cycle. Stamping each node with the time it was first visited lets one walk detect its cycle and measure it: if the walk stops at a node stamped during this same walk, the cycle length is the current time minus that node's stamp.

## Approach

1. Give every node a first-visit time, 0 meaning unvisited.
2. From each unvisited node, follow edges, stamping new nodes with increasing times, until reaching -1 or a stamped node.
3. If that stamped node was stamped during this walk, record the cycle length `clock - stamp`.
4. Nodes visited in earlier walks are never walked again.

## Walkthrough

In Example 1, the walk from 0 stamps 0, 3, 2 and 4 with times 1 to 4, then reaches 3, stamped at 2 in this walk. The cycle length is 5 - 2 = 3.

## Complexity

- Time: O(n).
- Space: O(n).

## Edge cases

- A walk that runs into a node from an earlier walk found no new cycle.
- Each node is stamped once, so the total work is linear.

## Common mistakes

- Running a full search from every node, which is quadratic.
- Counting a cycle found through a node from an earlier walk.
