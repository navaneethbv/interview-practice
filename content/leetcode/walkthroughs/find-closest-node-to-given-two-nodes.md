## Intuition

Each node has at most one outgoing edge, so following edges from a start produces one path until it ends or repeats.
Distance arrays make the common reachable nodes and their worst distance easy to compare.

## Brute force

Following both paths separately for every candidate repeats work.
Two distance passes visit each node at most once.

## Approach

1. Follow edges from each start, recording the first distance to every visited node.
2. Scan node indices in ascending order.
3. For nodes reached from both starts, minimize the larger distance.
4. Keep the first index on equal distance because the scan is ascending.

## Walkthrough

For Example 1, edges `[2,2,3,-1]` send both node 0 and node 1 directly to node 2.
Both distance arrays therefore assign node 2 distance 1.
Node 2 is the first common reachable node with worst distance 1, so the answer is 2.

## Complexity

With n nodes, the two walks and final scan cost O(n) time and the two distance arrays use O(n) space.
Python stores lists; Java stores two `int[]` arrays.

## Edge cases

A start can be the best meeting node when both distance arrays include it.
Cycles stop when a node already has a distance.
No common reachable node returns -1.

## Common mistakes

Minimize the maximum of the two distances, not their sum.
Preserve ascending scan order for ties.
Stop repeated walks instead of looping forever.

## Language notes

Python's `_distances` helper and Java's `distances` method implement the same walk.
The edge array is not mutated.
