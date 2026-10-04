## Intuition

Strictly increasing degrees impose a direction on every usable edge.
Following that direction can never cycle, so sorting vertices by degree creates a valid dynamic programming order even though the original graph is undirected.

## Brute force

Searching all simple paths can be exponential.
The degree restriction eliminates the need to remember a visited path: all transitions go from smaller degree to larger degree and therefore follow an acyclic dependency order.

## Approach

Build `degree` and `neighbors` from the undirected edges.
Initialize `longest` to one for every vertex.
Process vertices in ascending degree and relax each higher degree neighbor with `longest[node] + 1`.
The largest computed length is the answer.

## Walkthrough

In Example 1, node 5 has degree 2, node 6 has degree 3, and node 2 has degree 5.
Processing 5 can set node 6's length to 2.
Processing 6 then sets node 2's length to 3.
No valid longer chain exists, so return 3.

## Complexity

Computing adjacency and relaxing all neighbor lists takes O(V + E).
Sorting vertices adds O(V log V), giving O(V log V + E) total time.
Adjacency, degree, ordering, and dynamic programming arrays use O(V + E) space.

## Edge cases

A graph with one isolated vertex returns one because length counts nodes.
Equal degree neighbors cannot extend one another.
Disconnected components are all processed, and an isolated vertex still contributes a candidate path of length one.

## Common mistakes

Count degrees in the original undirected graph before orienting transitions.
Do not allow equal degree moves, which invalidate the acyclic argument.
Do not initialize path lengths to zero unless also changing the final conversion from edges to nodes.

## Language notes

Python sorts integer vertex indices using a degree key.
Java uses a boxed index array and a comparator, then tracks `best` during processing.
Both references store each undirected edge twice in adjacency and preserve the input edge list.
