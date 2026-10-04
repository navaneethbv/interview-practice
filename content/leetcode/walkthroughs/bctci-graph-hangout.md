## Intuition

For a fixed meeting node, each friend should take a shortest route to it.
The total cost is the sum of three independent shortest-path distances, so evaluate that sum at every possible destination.

## Brute force

Trying every meeting node and running searches from it repeats graph traversal V times.
Three searches from the friends' fixed starting positions provide all the same distance information.

## Approach

Initialize `totals` to zero.
For each of the three starts, run BFS to compute its distance to every vertex, then add those distances into totals.
Return the minimum total across vertices.
BFS is correct because every edge costs one traversal.
The graph is connected, so each distance exists and no unreachable sentinel participates in the minimum.
Friends can share routes or starting positions; their individual travel costs still add independently.

## Walkthrough

```text
Input: graph = [[1, 4], [0, 2], [1, 3], [2, 4], [0, 3]], node1 = 0, node2 = 2, node3 = 4
Output: 3
```

Example 1 is a five-node cycle.
Distances from 0 are `[0, 1, 2, 2, 1]`.
Distances from 2 are `[2, 1, 0, 1, 2]`, and from 4 are `[1, 2, 2, 1, 0]`.
The totals are `[3, 4, 4, 4, 3]`.
Meeting at either 0 or 4 costs three traversed edges in total, so the returned minimum is 3.

## Complexity

Three BFS traversals still take O(V + E) time because the number of friends is fixed.
Distances, totals, and the queue require O(V) extra space.

## Edge cases

If all friends start together, zero is optimal.
Two friends sharing a start contribute that distance twice.
The best meeting point need not be one of their starting vertices in a general graph.

## Common mistakes

Minimizing the maximum distance answers a different objective.
A multi-source BFS gives only the nearest-source distance, not the required sum.

## Language notes

Both references use a FIFO deque and mark distances on enqueue.
Java computes the final minimum with a stream; Python uses `min`.
