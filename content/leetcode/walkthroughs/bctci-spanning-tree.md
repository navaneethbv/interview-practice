## Intuition

A traversal first reaches every non-root vertex through one edge from an already reached vertex.
Keeping exactly those discovery edges connects all reached vertices without creating cycles.
Because the input graph is connected, these discovery edges form a spanning tree of the whole graph.

## Brute force

Try subsets of V minus one edges and test connectivity and acyclicity.
The number of subsets can be enormous, although a single graph traversal already provides a valid construction.

## Approach

Start breadth-first search at vertex zero, marking it seen before placing it in the queue.
Remove vertices in FIFO order and inspect their adjacency lists.
Whenever a neighbor has not been seen, mark it immediately, append `[node, neighbor]` to `edges`, and enqueue it.
Ignore edges to already seen vertices.
Each appended edge introduces one new vertex into the existing tree, so it cannot create a cycle.
Exactly V minus one vertices are introduced after the starting vertex, giving exactly the required edge count.
The method constructs a valid spanning tree rather than optimizing edge weights or choosing a unique canonical tree.

## Walkthrough

Example 1 starts at vertex zero and discovers one through edge `[0, 1]`.
Processing vertex one discovers two and five, adding `[1, 2]` and `[1, 5]`.
Processing vertex two discovers three and four, adding `[2, 3]` and `[2, 4]`.
Later edges connect already discovered vertices and are ignored.
The five selected edges connect all six vertices without a cycle, matching the displayed tree.

## Complexity

Both references inspect each vertex and adjacency entry once, taking O(V + E) time.
Visited tracking and the queue use O(V) auxiliary space, and the output contains O(V) edges.
Undirected edges appearing twice in adjacency lists do not change the asymptotic bound.

## Edge cases

A single vertex returns an empty edge list.
A graph that is already a tree returns all its edges in traversal-oriented form.

## Common mistakes

Mark on discovery, before enqueueing, to avoid adding multiple incoming edges for one new vertex.
Do not demand a particular sample tree when several valid trees exist.

## Language notes

Python uses a set for visited vertices and `deque` for traversal.
Java uses a Boolean array and `ArrayDeque`, with each returned edge represented as a two-element list.
