## Intuition

Choose one reference vertex, here zero.
If zero reaches every vertex and every vertex reaches zero, then any vertex can reach any other by traveling through zero.
Reversing all edges turns the second condition into another ordinary reachability search from zero.

## Brute force

Run a traversal from every vertex and require each traversal to reach the whole graph.
That costs O(V times (V + E)) and repeats much of the same reachability work.

## Approach

Build `reverse` by adding node to the reversed adjacency list of each original outgoing neighbor.
Use an iterative depth-first helper to count or collect all vertices reachable from zero.
Run it on the original graph and on the reversed graph.
Return true only if both searches reach all vertices.
A reversed path from zero to some vertex corresponds exactly to an original path from that vertex back to zero.
Combining the two conditions proves strong connectivity; failure of either search supplies a direction in which reachability is missing.

## Walkthrough

Example 1 has edges from zero to one and three, from one to two, from two to zero, and from three to two.
The forward search reaches all four vertices through zero's branches.
In the reversed graph, zero reaches two, which reaches one and three.
Thus every original vertex can also get back to zero.
Both searches cover the entire graph and the result is true.

## Complexity

Building adjacency information and performing two traversals takes O(V + E) time.
Both references use O(V + E) additional space for reversed edges and O(V) traversal state.
Java also copies the forward adjacency lists, preserving the same asymptotic bound with extra storage.

## Edge cases

A single vertex is strongly connected to itself even without an edge.
One-way reachability from zero is insufficient if another vertex cannot return.

## Common mistakes

Do not interpret directed edges as undirected.
Checking only the forward search verifies a weaker property than strong connectivity.

## Language notes

Python uses a set and list stack in its helper.
Java uses a Boolean array, a reached counter, and `ArrayDeque`; both short-circuit the second check if the first fails.
