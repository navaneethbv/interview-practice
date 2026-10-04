## Intuition

The head of a singly linked list is the natural stack top because inserting and removing there never require searching for a predecessor.
A separate length counter makes size and emptiness queries constant time too.

## Brute force

Representing the top as the tail of a singly linked list makes removal require a scan to the previous node.
That takes O(n) per pop and violates the requested constant-time operation contract.

## Approach

Store `top` and `length`.
`push` allocates a new node whose next pointer is the previous top, then increments length.
`pop` first handles an empty stack; otherwise save the top value, advance top to its next node, decrement length, and return the saved value.
`peek` reads the value without moving pointers.
`size` returns length, and `empty` tests whether length is zero.
These operations preserve the invariant that following next pointers enumerates values from newest to oldest.

## Walkthrough

Example 1 pushes 1, 2, then 3.
The linked chain is now `3 -> 2 -> 1` and length is three.
`peek` returns 3, `size` returns 3, and `empty` returns false.
The first pop advances top to 2 and returns 3.
The next advances top to 1 and returns 2.
Push operations contribute null results.

## Complexity

Every operation takes O(1) time.
A stack holding n values uses O(n) node storage and O(1) bookkeeping space.
Removed nodes become reclaimable once no references remain.

## Edge cases

Empty pop and peek return -1 without changing length.
Popping the final value sets top to null.
Values are nonnegative, so -1 is an unambiguous empty result.

## Common mistakes

Do not decrement length on an unsuccessful empty pop.
Save the removed value before advancing the top pointer.

## Language notes

Python defines its own `ListItem` class.
Java uses an internal immutable-link `Node`; moving the stack's top reference is enough to perform removal without editing node links.
