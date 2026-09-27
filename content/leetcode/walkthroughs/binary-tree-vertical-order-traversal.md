## Intuition

Assign each node a column number relative to the root.
Breadth-first search visits shallower nodes before deeper nodes.
Within one depth, enqueuing left children before right children preserves left-to-right order for ties.
Collect values by column, then order the columns from smallest to largest.

## Brute force

A depth-first traversal could record each node's row, column, and discovery order, then sort all records.
For N nodes that takes O(N log N) sorting time and O(N) record storage.
It is correct but does extra sorting for the top-to-bottom and tie ordering that BFS already provides.

## Approach

1. Start the root at column zero in a queue.
2. When removing a node, append its value to that column's list.
3. Enqueue the left child at column minus one and the right child at column plus one.
4. Because the queue is breadth first, values are appended in the required vertical order.
5. Python sorts the discovered column keys, while Java's TreeMap keeps them ordered.

## Walkthrough

For Example 1, root 3 starts at column 0.
Node 9 goes to column -1, while node 20 goes to column 1.
The children 15 and 7 of node 20 go to columns 0 and 2.
Reading columns from -1 through 2 gives [9], [3,15], [20], and [7].
The root appears before 15 in column 0 because BFS removes it first.

## Complexity

Let N be the node count and W the number of occupied columns.
Python traversal costs O(N), followed by O(W log W) key sorting.
Java traversal costs O(N log W) in the TreeMap in the worst case.
Both versions use O(N) storage for queues and output lists.

## Edge cases

A null root returns an empty list.
A single node occupies column zero.
Left-only and right-only chains produce columns in their respective directions.
Equal values remain separate entries because nodes, rather than values, define positions.

## Common mistakes

Do not use depth-first discovery order as the vertical ordering.
Do not sort values inside a column, because ties must remain left to right.
Do not assign the root a nonzero column without adjusting every child.
Do not omit empty-root handling before queue insertion.

## Language notes

Python uses a deque and a default dictionary, then builds output from sorted keys.
Java uses paired deques for nodes and columns and a TreeMap for ordered output.
The references keep the required verticalOrder signature.
