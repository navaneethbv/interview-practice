## Intuition

A node is safe when every path from it eventually reaches a terminal node.
Reverse the graph and repeatedly remove terminal nodes, because a predecessor becomes safe when all of its outgoing edges lead to known safe nodes.

## Brute force

Running a graph search from every node can revisit the same suffixes many times.
Tracking path membership avoids cycles, but the repeated searches can still take O(V(V+E)) time.

## Approach

1. Build reverse edges and record each node's outgoing degree.
2. Put zero-outdegree nodes in a queue.
3. Remove each known safe node from its predecessors' remaining degree.
4. Sort the collected safe nodes to return the required order.

## Walkthrough

Example 1:

In graph [[1,2],[2,3],[5],[0],[5],[],[]], nodes 5 and 6 start with zero outgoing edges.
Removing 5 makes node 2 safe, while node 4 also becomes safe after its edge to 5 is removed.
The cycle involving 0 and 3 never loses all outgoing edges.
The sorted safe nodes are [2,4,5,6].

## Complexity

Building reverse edges and processing degrees takes O(V+E) time.
Sorting the answer adds O(V log V) time.
Reverse adjacency, degrees, queue, and output use O(V+E) space.

## Edge cases

A terminal node is safe immediately.
A self-loop keeps its node unsafe unless its degree can somehow reach zero, which it cannot here.
An empty graph returns an empty list.

## Common mistakes

Do not decrement a predecessor for an edge before its destination is proven safe.
Do not forget the final sort because queue order is not the required numeric order.
Do not classify nodes in a cycle as safe merely because they have been visited.

## Language notes

Python stores reverse lists and appends discovered nodes to a list-backed queue.
Java uses ArrayDeque and sorts the resulting ArrayList before returning it.
