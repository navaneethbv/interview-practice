## Intuition

A queue removes the oldest inserted value.
Keeping pointers to both the first and last linked nodes supports removal at the front and insertion at the back without traversing the list.

## Brute force

A singly linked list with only a head pointer must scan to append at the end.
Removing from the front of an array instead shifts all later values.
Both choices violate the constant-time requirement for some operations.

## Approach

Maintain head, tail, and length.
Push creates a node, links it after the current tail when present, and updates tail.
If the queue was empty, also set head to the new node.
Pop saves head's value and advances head to its next node; if the queue becomes empty, clear tail too.
Peek reads head without moving it.
Size and empty use length, which changes only on successful insertions and removals.

## Walkthrough

```text
Input: ops = ["push", "push", "push", "peek", "size", "empty", "pop", "pop"], args = [[1], [2], [3], [], [], [], [], []]
Output: [null, null, null, 1, 3, false, 1, 2]
```

Example 1 pushes 1, 2, and 3, building the chain 1 to 2 to 3.
Head remains at 1 while tail moves to 3.
Peek returns 1, size returns 3, and empty returns false.
The next two pops remove 1 and then 2, leaving both head and tail at node 3.

## Complexity

Every operation performs a fixed number of pointer or counter updates, giving O(1) time.
A queue with n live values uses O(n) node storage and O(1) metadata.

## Edge cases

Empty pop and peek return -1.
Popping the final node must restore both endpoint pointers to null.
Pushing after that transition must create a fresh one-node queue.

## Common mistakes

Failing to clear tail after the last pop can attach future nodes to a detached chain.
Do not decrement length when an empty pop fails.

## Language notes

Python defines ListItem nodes explicitly.
Java uses a private Node class; neither relies on a built-in list or deque for storing queue contents.
