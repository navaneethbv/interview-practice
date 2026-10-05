## Intuition

A node becomes infected on the earliest day that any initially infected node can reach it.
That day is its minimum unweighted distance from the entire initial set.
Starting breadth-first search from all initial infections models simultaneous spreading.

## Brute force

Simulate one day at a time by scanning all edges for newly infected nodes.
On a long chain this can repeat nearly the same scan on every day and take O(VE) time.

## Approach

Initialize `day` to -1 for every node.
Set each initially infected node to day zero and put all of them into `queue`.
Pop nodes in queue order and inspect their neighbors.
An unseen neighbor receives `day[node] + 1` and is enqueued immediately.
Marking at enqueue time prevents several infected neighbors from scheduling the same node repeatedly.
Because the queue processes nondecreasing days, the first assigned day is the minimum possible infection day.
The largest assigned day is the time when the whole connected graph is infected.

## Walkthrough

Example 1 begins with only node 0 infected.
Set `day[0] = 0` and enqueue 0.
Processing 0 infects nodes 1 and 2 on day 1.
Node 1 adds no unseen neighbors; processing node 2 reaches node 3 on day 2.
The completed day array is `[0, 1, 1, 2]`.
Its maximum is 2, matching the requested number of days.

## Complexity

Every vertex is enqueued once and every adjacency entry is inspected once.
Time is O(V + E), with O(V) auxiliary storage for days and the queue.

## Edge cases

If every node starts infected, the result is zero.
Multiple initial infections must all have day zero, regardless of their order in the input.

## Common mistakes

Do not perform a separate BFS whose distances overwrite other sources.
Depth-first traversal does not assign minimum infection days on first discovery.

## Language notes

Python uses `deque.popleft` and returns `max(day)`.
Java uses `ArrayDeque` and updates `last` during traversal, which yields the same maximum without a separate final scan.
