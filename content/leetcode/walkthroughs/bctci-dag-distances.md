## Intuition

A topological order places every edge's source before its destination.
When a node is processed, all possible incoming paths have already been considered.
This makes shortest-path relaxation safe even when edge weights are negative.

## Brute force

Repeatedly relax every edge as in Bellman-Ford.
That works for negative weights but requires O(VE) time, wasting the graph's acyclic structure.

## Approach

Build `adjacency`, then compute a topological order with indegrees and a queue.
Every zero-indegree node enters the queue; removing its outgoing edges can make more nodes ready.
Initialize `best[start] = 0` and every other distance to `SENTINEL`.
Visit nodes in topological order, skipping unreachable ones.
For each outgoing `(v, w)`, compare `best[node] + w` with the current distance to v and keep the smaller value.
No later node can supply an unprocessed path back into the current node, because that would contradict topological order.

## Walkthrough

Example 1 starts at node 4.
Relaxing its edges initially gives node 1 distance 11, node 2 distance 21, and node 5 distance 14.
Node 5 then improves node 2 to `14 - 30 = -16`.
Node 2 improves node 1 to `-16 + 10 = -6`.
Nodes 0 and 3 cannot be reached from 4.
The result is `[2147483647, -6, -16, 2147483647, 0, 14]`.

## Complexity

Building the graph, ordering it, and relaxing edges each take O(V + E) time.
Adjacency storage, indegrees, ordering, queue, and distances occupy O(V + E) space.

## Edge cases

A one-node graph returns `[0]`.
Disconnected components still participate in topological ordering but retain sentinel distances unless reached from `start`.

## Common mistakes

Do not add an edge weight to the unreachable sentinel.
Dijkstra's greedy processing is unsuitable for these negative weights.

## Language notes

Both references return integer distances and the exact sentinel 2147483647.
The stated vertex and weight limits bound simple-path sums within Java `int` range.
