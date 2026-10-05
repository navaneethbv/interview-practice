## Intuition

A singly linked list gives immediate access to the front but only forward navigation toward the back.
The reference keeps a head pointer and length counter, matching its constant time requirements for front operations and size.

## Brute force

A contiguous array shifts elements when inserting or removing at the front.
Building the requested node chain avoids those shifts, while operations at the back still require traversal because this design does not store a tail pointer.

## Approach

`push_front` replaces the head with a node pointing to the old head.
`pop_front` advances the head and returns its old value.
Back insertion finds the final node; back removal finds its predecessor.
`contains` scans values, and every successful mutation updates `length`.

## Walkthrough

Example 1 pushes 1 at the front, then 2, producing `[2, 1]`.
Pushing 3 at the back gives `[2, 1, 3]`.
Contains returns true for 2 and false for 4; size is 3.
Front and back pops return 2 and 3, leaving `[1]`.

## Complexity

Front insertion, front removal, and size take O(1).
Back insertion, back removal, and contains take O(n) worst case for n nodes in this reference.
The node chain uses O(n) storage, with constant temporary pointer space per operation.

## Edge cases

Both removals return -1 on an empty list.
A single node back removal delegates to front removal.
An empty back insertion delegates to front insertion.
Duplicate values are permitted, and contains needs only one matching node.

## Common mistakes

Do not decrement length when a removal fails.
For back removal, stop at the predecessor rather than losing access after reaching the tail.
Do not claim constant time back operations merely because linked lists are used.

## Language notes

Python defines `ListItem`; Java defines a private `Node`.
Python snake case methods map to Java camelCase names through the design spec.
One instance persists across the entire operation sequence, so its head and length must remain consistent after each call.
