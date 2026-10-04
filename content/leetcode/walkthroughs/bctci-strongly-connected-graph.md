## Intuition

A directed graph is strongly connected when every node is reachable from every other node.
It is enough to choose one node and verify reachability in both directions.
The reverse graph turns paths that lead into the chosen node into paths that leave it.

## Approach

Build `reverse` by adding an edge from each neighbor back to its source while scanning the original adjacency list.
Run a stack-based traversal from node zero on the original graph and require that it reaches every node.
Run the same traversal from node zero on `reverse` and require the same result.
If both traversals reach all nodes, every node can reach zero and zero can reach every node, so any pair can reach each other.

## Walkthrough

For Example 1, the original graph lets node zero visit one and three, then two, so all four nodes are reached.
In the reverse graph, paths that originally entered zero become outgoing paths from zero, and the traversal also reaches one, two, and three.
Therefore every node has a route to zero and zero has a route to every node, so the answer is true.
In Example 2, the empty neighbor list for node two prevents the forward traversal from reaching all nodes, so the method returns false immediately through the combined condition.

## Complexity

Building the reverse graph and traversing both graphs takes `O(V + E)` time.
The forward and reverse adjacency lists plus the visited set use `O(V + E)` auxiliary space.

## Edge cases

A one-node graph is strongly connected because node zero reaches itself without using an edge.
An empty adjacency list in a larger graph usually makes the graph fail, unless it is the only node.
Repeated edges do not change the result because the traversal marks a neighbor before pushing it again.

## Common mistakes

Checking only reachability from zero proves that zero can reach others, but not that others can return to zero.
Treating edges as undirected incorrectly accepts one-way paths.
Forgetting to mark nodes before pushing them can cause repeated work on cycles.

## Language notes

Python builds lists with a comprehension and stores visited nodes in a set.
Java uses `List<List<Integer>>`, a boolean array, and a reached counter to avoid relying on collection size.
Both references assume the valid node labels described by the spec and start both searches at node zero.
