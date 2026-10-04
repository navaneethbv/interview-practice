## Intuition

The layout rules turn every tree path into a coordinate.
A left edge increases the row, and a right edge increases the column.
Nodes that share a coordinate can therefore be counted with a map during one traversal.

## Brute force

Building a grid and placing every node would require guessing its dimensions and wastes space on empty coordinates.
Comparing every pair of nodes would also take quadratic time.

## Approach

Start a stack with root at row zero and column zero.
When visiting a node, increment the count for its coordinate and update the largest count.
Push the left child with row plus one and the same column.
Push the right child with the same row and column plus one.
The traversal stops after every node has been assigned exactly one coordinate.

## Walkthrough

In Example 1, root 1 starts at coordinate zero, zero.
Node 2 moves to one, zero and node 3 moves to zero, one.
Continuing the same rules places descendants, and the most crowded coordinate receives two nodes.
The maximum stored count is therefore 2.

## Complexity

For n nodes, the traversal visits each node once and takes O(n) time.
The coordinate map and explicit stack use O(n) space in the worst case.
The Java packed key is safe because the stated height keeps row and column well below the packed range.

## Edge cases

A single node produces one occupied coordinate.
An all-left or all-right chain has no collisions and returns one.
Different paths can meet at a coordinate even though the nodes remain distinct.
The tree is non-empty, so the initial stack always contains a valid node.

## Common mistakes

A right edge changes the column without changing the row.
Using a grid indexed by tree values confuses node labels with layout positions.
Returning the number of coordinates instead of the largest coordinate count answers a different question.

## Language notes

Python uses Counter with tuple keys and stores coordinate triples on the stack.
Java packs row and column into a long key and tracks best directly from Map.merge.
Both implementations use iterative traversal, avoiding recursion depth concerns for tall trees.
