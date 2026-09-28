## Intuition
A valid walk must start and finish at node 0, but it may revisit nodes to return.
A node contributes its value only on the first visit, so a visit counter separates movement from collection.
The graph is small in time budget, and shortest return distances let the search prune walks that can no longer finish.

## Brute force
Enumerating every walk up to `maxTime` without pruning repeatedly explores branches that cannot return to node 0.
Even with bounded edge times, the number of walks grows exponentially with the number of steps.
A depth first search with return feasibility pruning keeps only potentially valid branches.

## Approach
1. Build an undirected adjacency list from the edge triples.
2. Run Dijkstra from node 0 to compute the shortest return distance for every node.
3. Start a depth first search at node 0 with its value collected once.
4. Before entering a neighbor, require elapsed time plus that neighbor's shortest distance to be at most `maxTime`.
5. Add a neighbor's value only when its visit count is zero, recurse, then undo the visit count.
6. Update the answer whenever the search is back at node 0.

## Walkthrough
Example 1 has values `[5, 10]`, one edge `0 to 1` taking 10, and `maxTime = 20`.
The search begins at node 0 with time 0 and quality 5.
It can enter node 1 at time 10 because returning from node 1 takes another 10.
Node 1 has not been visited, so quality increases to 15.
From node 1 the return edge reaches node 0 at time 20, where quality 15 becomes the best answer.
The search also considers revisiting node 0, but node 0 contributes no additional value.

## Complexity
Dijkstra costs O((V + E) log V) time and O(V + E) space.
The depth first search is exponential in the number of feasible walk steps in the worst case, with O(V) visit counters and recursion depth bounded by that step budget.
The shortest distance check substantially cuts branches that cannot return.

## Edge cases
Node 0 contributes even when there are no edges.
Disconnected nodes cannot be reached and have infinite return distance.
Revisiting a valuable node never adds its value twice.
An edge may be used in both directions as the graph is undirected.

## Common mistakes
Counting every visit instead of distinct nodes inflates quality.
Accepting a branch merely because it reaches a new node can leave no time to return.
Forgetting to undo the visit counter contaminates sibling DFS branches.

## Language notes
Python uses a heap of `(distance, node)` tuples and instance fields for the recursive search.
Java uses `PriorityQueue<int[]>` and the same instance fields, with `int[]` edge pairs.
The Java reference relies on standard collection types supplied by the judge and does not redeclare helpers.
