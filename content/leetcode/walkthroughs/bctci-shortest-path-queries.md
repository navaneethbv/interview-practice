## Intuition

All queries share the same starting vertex.
One breadth-first search can therefore record a shortest-path predecessor for every reachable vertex, and each query can reconstruct its path from those predecessors.
There is no need to search the graph again per destination.

## Brute force

Run a fresh breadth-first search for every query target.
This repeats the same traversal and can cost O(q times (V + E)) before even accounting for returned paths.

## Approach

Mark start as discovered and give it a special parent sentinel.
Process vertices in FIFO order, assigning each undiscovered neighbor the current vertex as parent before enqueuing it.
Breadth-first discovery guarantees that first parent lies on a shortest path.
After traversal, handle queries in order.
For an unreachable target, append an empty list.
Otherwise follow parents from target back to the start sentinel, collecting vertices, then reverse that list into start-to-target order.
Different valid parent choices may produce different shortest paths, which the checker accepts.

## Walkthrough

Example 1 starts at vertex zero, which first discovers vertex one.
Vertex one then discovers vertices two, five, and four.
The query for one reconstructs `[0, 1]`; the query for zero returns `[0]`.
Vertex three is isolated and unreachable, producing `[]`.
Vertex four follows parents four, one, zero, which reverse into `[0, 1, 4]`.

## Complexity

Traversal takes O(V + E), and reconstruction takes O(P + q), where P is the total number of returned path vertices.
Both references use O(V) search storage plus O(P + q) output storage.
Including output cost matters because many queries can request long paths.

## Edge cases

A query equal to start returns a one-vertex path.
Repeated targets may produce repeated path arrays because each query needs its own output position.

## Common mistakes

Depth-first predecessors do not generally yield shortest paths.
Mark vertices on discovery so later arrivals cannot overwrite their first shortest predecessor.

## Language notes

Python uses missing dictionary entries for unreachable vertices and `None` for the root parent.
Java uses -2 for unreachable and -1 for the root, then reverses each path in place.
