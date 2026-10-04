## Intuition

Reachability asks whether repeatedly following directed outgoing edges can reach the destination.
A breadth-first search explores exactly those reachable vertices.
Recording visited vertices makes cycles harmless and prevents the same reachable region from being explored repeatedly.

## Brute force

Enumerating every possible walk is unsafe in a cyclic graph because walks can be arbitrarily long.
Even restricting to simple paths can produce exponentially many candidates when paths branch and reconnect.

## Approach

Build `neighbors`, an adjacency list containing each directed edge only from its source to its target.
Mark `start` visited and enqueue it.
Repeatedly remove one `node`; return true immediately when it equals `end`.
For each unvisited outgoing neighbor, mark it before adding it to the queue.
If the queue empties, no reachable vertex was the destination, so return false.
The queue contains discovered vertices whose outgoing edges have not yet been processed.

## Walkthrough

Example 1 contains edges `0 -> 1`, `1 -> 2`, and `3 -> 2`.
Start with queue `[0]` and mark 0.
Processing 0 discovers 1; processing 1 discovers 2.
When 2 is removed from the queue it matches the destination, so return true.
Vertex 3 is never needed because its edge points into 2, not outward from the explored component.

## Complexity

For n vertices and m edges, building and searching the adjacency list takes O(n + m) time.
The adjacency list, visited array, and queue together require O(n + m) space.

## Edge cases

When start equals end, the zero-edge route succeeds immediately.
Self-loops and duplicate edges cannot enqueue a visited vertex again.
Disconnected components do not change the result.

## Common mistakes

Adding both directions for each edge changes the problem into undirected reachability.
Marking only when dequeuing allows unnecessary duplicate queue entries.

## Language notes

Python uses `deque.popleft`; Java uses an `ArrayDeque` with FIFO insertion and removal.
Both use a boolean visited array indexed by the supplied vertex labels.
