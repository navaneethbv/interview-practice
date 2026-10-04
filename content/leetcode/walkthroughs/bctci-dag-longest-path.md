## Intuition

A topological order processes every predecessor before its successors.
This makes each node's largest reachable path value final before its outgoing edges are relaxed, even when weights are negative.

## Brute force

Enumerating all directed paths can require exponential time.
The acyclic structure allows one dynamic-programming pass instead of repeatedly exploring shared suffixes.

## Approach

Build weighted adjacency lists and obtain a topological order using indegrees and a queue.
Initialize `best[start]` to zero and every other entry to the unreachable sentinel.
Skip unreachable nodes during relaxation.
For each outgoing edge, compare its candidate `best[node] + weight` with the neighbor's current value and retain the largest value.
Because every incoming edge has been considered before a node is processed, this local recurrence produces the global optimum.

## Walkthrough

```text
Input: V = 6, edges = [[0, 1, 10], [2, 1, 10], [3, 4, 12], [4, 1, 11], [4, 2, 21], [4, 5, 14], [5, 2, -30]], start = 4
Output: [-2147483648, 31, 21, -2147483648, 0, 14]
```

The direct edge from 4 to 2 gives distance 21, which beats the alternative 4 to 5 to 2 with total -16.
Node 2 then extends that best route to node 1 with total 31, beating the direct edge of weight 11.
Node 5 has value 14, start has zero, and unreachable nodes 0 and 3 retain -2147483648.

## Complexity

Building adjacency, topological sorting, and relaxing edges take O(V + E) time.
The adjacency structure, order, queue, and distance array require O(V + E) space.
No priority queue is needed.

## Edge cases

Negative edge weights are valid because there are no directed cycles.
A singleton graph returns distance zero to itself.
An unreachable vertex must retain the exact requested sentinel.

## Common mistakes

Do not add edge weights to the sentinel; that can manufacture a false reachable value.
Processing vertices by numeric label is not necessarily topological order.

## Language notes

Python uses arbitrary-precision integers.
Java stores distances in int; the given limits on path length and edge magnitude keep valid distances within range, distinct from the sentinel.
