## Intuition

Breadth-first search visits nodes by depth.
The first leaf removed is the nearest leaf because every shallower level has already been processed.

## Brute force

Computing depths for every root-to-leaf path can revisit long shared prefixes.
BFS stops at the first leaf.

## Approach

1. Return zero for an empty root.
2. Put the root at depth one in a queue.
3. Process each level, returning when a node has no children.
4. Enqueue existing children for the next level.

## Walkthrough

For Example 1, node 9 is a leaf at the second level, while node 20 has children.
BFS removes 3 first, then 9, so it returns depth 2 before exploring deeper nodes.

## Complexity

Each node is enqueued once, giving O(n) time and O(w) queue space, where w is maximum width.
The iterative references avoid recursion depth issues on a 100000-node chain.

## Edge cases

An empty tree has depth zero.
A one-sided chain must continue until its only leaf.
A node with one child is not a leaf.

## Common mistakes

Do not return when a node is missing one child.
Track levels rather than merely counting queue operations.
Stop at the first leaf in BFS order.

## Language notes

Python stores `(node, depth)` tuples in a deque.
Java stores layer size and increments depth after each full layer.
The first returned leaf is optimal because BFS cannot reach a deeper layer before completing every shallower one.
Queue entries carry only nodes and their current level.
