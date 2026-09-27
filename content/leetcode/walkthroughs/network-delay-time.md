## Intuition

The signal travels along directed edges with nonnegative travel times.
Shortest paths from k determine when each node first receives the signal.
Dijkstra's algorithm always expands the currently known earliest arrival.

## Brute force

A repeated edge-relaxation method such as Bellman-Ford takes O(V × E) time for V nodes and E edges.
The min-heap search settles the earliest reachable node first and improves this nonnegative-weight case to O((V + E) log V).
## Approach

1. Build graph so each source stores destination and edge time pairs.
2. Set distances to infinity, except distances[k] = 0.
3. Put k in a min heap ordered by distance.
4. Pop an entry and skip it if it is stale compared with distances[node].
5. Relax every outgoing edge and push an improved distance.
6. Return the largest finite distance, or -1 if any node is unreachable.

Stale heap entries are expected because an improved route does not remove the older entry.
The stale check ensures each relaxation uses the current shortest known distance.

## Walkthrough

Example 1 uses times = [[1, 2, 2], [2, 3, 4], [1, 3, 9]], n = 3, and k = 1.

| heap entry | relaxed distances | action |
| --- | --- | --- |
| (0, 1) | d2 = 2, d3 = 9 | push both routes |
| (2, 2) | d3 = 6 | improve node 3 through node 2 |
| (6, 3) | unchanged | finish |
| (9, 3) | stale | skip |

The largest shortest distance is 6, so the signal reaches every node in 6 time units.

## Complexity

Let V be n and E be the number of directed edges.
The heap implementation runs in O((V + E) log V) time under the standard Dijkstra bound.
The graph, distance array, and heap use O(V + E) space.

## Edge cases

An unreachable node leaves its distance infinite and makes the answer -1.
A direct edge can be replaced by a shorter multi-edge route.
The source node has delay zero.
Parallel edges are handled by relaxing each edge independently.

## Common mistakes

- Using a queue instead of a min heap loses Dijkstra's ordering.
- Returning the largest edge instead of the largest shortest distance ignores alternate routes.
- Forgetting stale entries can repeat unnecessary work or use outdated distances.
- Treating the input edges as undirected invents routes that do not exist.

## Language notes

Python stores heap entries as tuples ordered first by distance.
Java uses PriorityQueue with a comparator on the distance field.
Both use Integer or floating infinity only as an internal sentinel and return an int answer.
