## Intuition

A queue removes from the front and adds at the back.
Keeping direct references to both ends of a singly linked chain makes both operations constant time without shifting any existing elements.

## Brute force

An array that removes its first element by shifting takes O(n) per pop.
A linked list with only a head also needs O(n) to append.
The reference avoids both costs with `head` and `tail`.

## Approach

`push` allocates a node, links it after `tail` when present, and moves `tail` to it.
`pop` reads `head.val` and advances `head`.
If the queue becomes empty, clear `tail` too.
Maintain `length` for constant time size and emptiness queries.

## Walkthrough

Example 1 pushes 1, 2, and 3, forming a chain with head 1 and tail 3.
Peek returns 1, size returns 3, and empty returns false.
Two pops then return 1 and 2, leaving the single node containing 3.

## Complexity

Push, pop, peek, size, and empty each perform O(1) work.
A queue holding n values uses O(n) node storage plus constant bookkeeping.
Removed nodes become unreachable from the queue and can be reclaimed by the runtime.

## Edge cases

Popping or peeking an empty queue returns -1.
A first push sets both endpoints to the same node.
Popping the last element must restore both endpoints to empty.
Duplicate values remain separate queue entries in insertion order.

## Common mistakes

Do not forget to reset `tail` when removing the final node.
Do not decrement `length` for an empty pop.
Peek must not move `head`, and size should use its maintained counter instead of traversing the chain.

## Language notes

Python defines a small `ListItem` class.
Java uses a private static `Node` with a final value and mutable next link.
The local design spec preserves one queue instance across operations, and void pushes appear as null outputs.
