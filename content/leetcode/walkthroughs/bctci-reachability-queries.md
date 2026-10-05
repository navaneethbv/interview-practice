## Intuition

In an undirected graph, reachability is an equivalence relation: vertices can reach one another exactly when they share a connected component.
Labeling components once turns every later query into an integer comparison.

## Brute force

Running a separate traversal for each query costs O(Q(V + E)) in the worst case.
Because the graph never changes between queries, its component structure can be computed once and reused.

## Approach

Initialize `label` to -1.
For each unlabeled `start`, assign its own index as the component label and perform a stack traversal.
Every newly discovered neighbor receives the same label before being pushed.
Answer `[a, b]` by comparing `label[a]` with `label[b]`.

## Walkthrough

Example 1's traversal from node 0 reaches 1, 2, 4, and 5, giving all of them label 0.
Node 3 has no neighbors and receives label 3 in its own traversal.
Thus query `[0, 4]` returns true and `[0, 3]` returns false.

## Complexity

Component labeling takes O(V + E), and Q queries add O(Q), for O(V + E + Q) total time.
The labels and stack use O(V) auxiliary space.
The returned answers use O(Q) output space.

## Edge cases

An isolated vertex still forms a component and can reach itself by a zero edge path.
Repeated queries are answered independently in original order.
Cycles do not create repeated work because labels are assigned before a vertex enters the stack.

## Common mistakes

Do not compare vertex indices themselves; compare their assigned component labels.
Do not reset labels for each query.
This shortcut relies on an undirected graph, since merely belonging to the same weak component would not prove directed reachability.

## Language notes

Python uses a list for both labels and the explicit traversal stack.
Java uses an integer label array and `ArrayDeque<Integer>`.
Neither implementation needs a particular numeric component label, only consistent equality within each connected group.
