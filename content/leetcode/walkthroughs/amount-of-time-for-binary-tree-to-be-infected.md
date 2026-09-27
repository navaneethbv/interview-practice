## Intuition

Infection moves along tree edges in either direction, so the tree can be treated as an undirected graph.
Breadth-first search from `start` visits each node at its infection minute, and the largest distance is the completion time.

## Brute force

Simulating a frontier while repeatedly searching parent relationships can rescan the tree at every minute.
Building the adjacency graph once makes every infection step a normal graph edge traversal.

## Approach

1. Traverse the tree and add both directions for every parent-child edge.
2. Put `(start, 0)` in a queue and mark `start` visited.
3. Pop a node, update the largest distance, and enqueue unseen neighbors at distance plus one.
4. Return the largest distance after the queue empties.

## Walkthrough

For Example 1, the path from start value 3 to the farthest node 9 is `3, 2, 4, 7, 9`.
The BFS assigns distances 0, 1, 2, 3, and 4 along that path.
Other branches are no farther, so all nodes are infected after `4` minutes.

## Complexity

Graph construction and BFS each take `O(n)` time for `n` tree nodes.
The adjacency map, visited set, and queues use `O(n)` space.

## Edge cases

A one-node tree starts infected and returns zero.
Unique values let the graph use node values as keys without ambiguity.

## Common mistakes

- Treating the tree as directed prevents infection from children back to parents.
- Omitting a visited set sends BFS back and forth across each edge.
- Returning the number of BFS layers instead of the maximum stored distance can add one.

## Language notes

Python uses a list for graph construction and `deque` for BFS, while Java uses `ArrayDeque` and helper methods for child links.
Both traversals are iterative and support the 100,000-node limit without recursion depth risk.
