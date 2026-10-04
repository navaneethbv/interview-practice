## Intuition

A node becomes infected on the day equal to its shortest distance from any initially infected node.
Starting breadth-first search from all infection sources at once models simultaneous daily spread.

## Brute force

Running a separate BFS from each source repeats traversals and then requires taking the minimum distance for every node.
A multi-source queue merges these waves in one search.

## Approach

Initialize every `day` to -1, then assign day zero to all initially infected nodes and enqueue them.
Pop nodes in FIFO order.
When a neighbor still has day -1, assign `day[node] + 1` and enqueue it.
The first discovery is the earliest possible infection because BFS processes nondecreasing distances.
Return the maximum assigned day after the queue empties.
Connectedness and a nonempty source set guarantee that every vertex receives a day.

## Walkthrough

```text
Input: graph = [[1, 2], [0, 2], [0, 1, 3], [2]], infected = [0]
Output: 2
```

In Example 1, node 0 starts infected on day 0.
Its neighbors 1 and 2 receive day 1.
Processing node 2 reaches node 3, which receives day 2.
Already infected neighbors are skipped, including the triangle's alternative routes.
The final day array is `[0, 1, 1, 2]`, whose maximum is 2.

## Complexity

For V vertices and E listed edges, time is O(V + E).
The day array and queue use O(V) extra space.
Each vertex is inserted at most once.

## Edge cases

If every node starts infected, the answer is zero.
A singleton source vertex also needs zero days.
Overlapping infection waves do not cause multiple queue entries.

## Common mistakes

Do not process initial sources one after another with separate day counters.
Mark a neighbor when enqueuing it rather than when dequeuing it.

## Language notes

Python returns `max(day)` after traversal.
Java maintains the maximum while popping vertices; both approaches measure the same last infection day.
