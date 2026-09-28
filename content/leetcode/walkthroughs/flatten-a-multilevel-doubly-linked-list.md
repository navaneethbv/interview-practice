## Intuition

Depth-first order requires visiting a node's child list before its former next node.
An explicit stack pushes the former next first and the child second, so the child is popped and processed immediately.

## Brute force

Recursively flattening each child is natural, but a 1000-node nested chain can approach the recursion limit.
Repeatedly searching for insertion points can also revisit already flattened nodes.

## Approach

1. Push the head when it exists and keep `previous` as the last flattened node.
2. Pop a node, pushing its next pointer first and child pointer second.
3. Set its previous pointer to `previous`, clear its child, and connect `previous.next` to it.
4. Terminate the final node's next pointer and return the original head.

## Walkthrough

This is Example 1 from the local statement.
Starting with 1, then 2, the stack receives node 3 and child 7, with 7 pushed last.
The traversal therefore visits 7, then 8, then nested child 11 before returning to node 3.
Each visited node is linked after the previous node, producing values `[1,2,7,8,11,3]` and clearing child links.

## Complexity

Each node is pushed and popped once, so time is O(n) for the complete structure.
The explicit stack uses O(n) worst-case space, and the flattening reuses the input nodes.

## Edge cases

An empty head returns null.
A child list is inserted before the parent's former next node.
The final node must have `next = null`, and the head must have `prev = null`.

## Common mistakes

Push the former next before the child so stack order visits the child first.
Clear every child pointer after processing it.
Repair both directions of the doubly linked list, not only `next`.

## Language notes

Python uses a list as a stack, while Java uses `ArrayDeque<Node>`.
Both implementations are iterative and preserve node identity as required by the fixture.
