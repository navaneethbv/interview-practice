## Intuition

For a nonempty simple undirected graph, being connected and having exactly V - 1 edges is equivalent to being a tree.
That characterization avoids separately tracking parent edges during cycle detection.

## Brute force

A direct cycle search can work, but repeatedly checking reachability after removing edges would be expensive.
The edge-count theorem gives a simple preliminary rejection before one traversal.

## Approach

Sum adjacency-list lengths and divide by two, since every undirected edge appears from both endpoints.
Return false immediately unless the edge count equals V - 1.
Otherwise run a stack traversal from vertex zero, marking neighbors when discovered.
Return whether all V vertices were reached.
A connected graph has a spanning tree with V - 1 edges; when the whole graph has exactly that many edges, no extra cycle edge remains.
Connectivity is essential because a disconnected cyclic graph can also have V - 1 total edges.

## Walkthrough

```text
Input: graph = [[2], [2, 5], [0, 1, 3, 4], [2], [2], [1]]
Output: true
```

Example 1 has degree sum ten, giving five edges for six vertices.
Traversal from zero reaches 2, then 1, 3, and 4, and from 1 reaches 5.
All six vertices are visited.
Both required conditions hold, so the method returns true.
The graph's branching shape does not affect the argument.

## Complexity

For V vertices and E adjacency entries, time is O(V + E).
Visited state and stack use O(V) extra space.
No edges or vertices are modified.

## Edge cases

A singleton with no edges is a tree.
A disconnected graph fails even if its edge count is correct.
A connected graph with an extra edge fails the initial count.

## Common mistakes

Do not forget to divide the undirected degree sum by two.
Do not infer connectivity from the edge count alone.

## Language notes

Python stores visited vertices in a set.
Java uses a boolean array and an explicit reached counter; both mark on insertion to avoid repeated pending stack entries.
