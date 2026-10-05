## Intuition

All queries share one starting vertex in an unweighted graph.
A single BFS can record one shortest path tree, allowing each requested route to be reconstructed by following parent links backward.

## Brute force

Running BFS again for every target repeats the same exploration.
Recording full paths in every queue entry also copies unnecessary prefixes.
Parent pointers preserve enough information to reconstruct only the paths actually requested.

## Approach

Mark `start` as discovered and enqueue it.
For each newly discovered neighbor, record its parent and enqueue it.
After BFS, follow each reachable target's parent chain to the start, then reverse the collected nodes.
Unreachable targets produce empty lists.

## Walkthrough

Example 1 discovers node 1 from 0, then nodes 2, 5, and 4 from 1.
Query 1 reconstructs `[0, 1]`; query 0 yields `[0]`.
Node 3 was never discovered, so its answer is empty.
Query 4 follows parents 4, 1, 0 and reverses to `[0, 1, 4]`.

## Complexity

BFS takes O(V + E).
If P is the total number of nodes across returned paths, reconstruction adds O(Q + P) for Q queries.
Auxiliary traversal space is O(V), while output requires O(Q + P) space.

## Edge cases

The start has a valid zero edge path containing itself.
Disconnected targets return empty paths.
Repeated targets may repeat the same route in the output.
Several shortest paths are allowed, so neighbor order may choose different equally valid parents.

## Common mistakes

Use FIFO traversal to obtain shortest paths, not a depth first stack.
Mark neighbors when enqueuing to prevent parent replacement and repeated work.
Remember to reverse the parent chain because it is initially collected from target to start.

## Language notes

Python uses a parent dictionary with `None` at the root.
Java uses an array with -2 for undiscovered and -1 for the root.
The local `shortestPaths` validator accepts alternative shortest routes instead of requiring one exact parent tree.
