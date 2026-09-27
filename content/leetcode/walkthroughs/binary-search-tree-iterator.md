## Intuition

An inorder traversal of a binary search tree visits values in ascending order.
The iterator does not need to store the full traversal.
Its stack stores the path to the next smallest node, with the smallest currently available node on top.
After visiting a node, its right subtree becomes the next source of values.

## Brute force

A simple implementation could traverse the entire tree in inorder during construction and store every value in a list.
That takes O(n) construction time and O(n) memory for n nodes.
It makes every operation easy, but it violates the requested O(h) memory bound when the tree is large.
The lazy stack stores only the unresolved ancestor path.

## Approach

1. The Python constructor calls _push_left on the root.
2. That helper pushes a node and then follows left children until none remain.
3. next pops the smallest pending node, pushes the left spine of its right child, and returns the popped value.
4. hasNext checks whether the stack still contains a pending node.
5. The Java constructor and next method call pushLeft on a Java Deque.

## Walkthrough

For Example 1, the tree is [2,1,3].
Construction pushes 2 and then 1, so the first hasNext is true.
The first next pops 1 and returns it.
The next call pops 2 and pushes its right child 3.
The next call pops 3, leaving the stack empty.
The final hasNext returns false, producing [true,1,2,3,false].

## Complexity

Construction pushes at most H nodes for tree height H and takes O(H) time.
Each node is pushed and popped once across all calls, so next is O(1) amortized.
hasNext is O(1) worst case.
The stack uses O(H) extra space.

## Edge cases

A one-node tree returns that value and then reports false.
An entirely left-skewed tree fills the initial stack.
An entirely right-skewed tree pushes one right spine node at a time.
Every test calls next only while a value remains, as promised by the contract.

## Common mistakes

Do not push an entire subtree when only its left spine belongs on the stack.
Do not return a node before pushing the left spine of its right child.
Do not use a queue, because breadth-first order is not sorted order.
Do not make hasNext consume a node.

## Language notes

Python's private _push_left helper makes the state transition explicit.
Java's constructor and next call pushLeft, while ArrayDeque supplies the stack operations.
The design class name and method names exactly match the spec.
