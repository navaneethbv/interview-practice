## Intuition

The newest pushed item can be placed directly at the head of a singly linked list.
That same head is the first item removed, matching last-in-first-out stack behavior.

## Brute force

Appending to a singly linked tail and removing that tail would require finding its predecessor.
Using the list head for both updates makes every stack operation constant time.

## Approach

Maintain a top pointer and a length counter.
Push creates a node whose next pointer is the old top, then makes the new node top.
Pop returns -1 if top is null; otherwise save its value, advance top to next, decrement length, and return the saved value.
Peek reads top's value without changing links.
Size returns length and empty checks whether it is zero.
The reachable chain always lists values in reverse insertion order, excluding those already popped.

## Walkthrough

```text
Input: ops = ["push", "push", "push", "peek", "size", "empty", "pop", "pop"], args = [[1], [2], [3], [], [], [], [], []]
Output: [null, null, null, 3, 3, false, 3, 2]
```

Example 1 pushes 1, then 2, then 3.
The chain from top is now 3 to 2 to 1.
Peek returns 3, size returns 3, and empty returns false.
The first pop returns 3 and moves top to 2.
The second returns 2 and leaves the one-node stack containing 1.

## Complexity

Each operation takes O(1) time.
Storing n live values requires O(n) nodes, plus constant metadata.
No operation scans or copies the remaining stack.

## Edge cases

Empty pop and peek return -1 without changing state.
Popping a singleton sets top to null.
Repeated equal values are still distinct pushed entries.

## Common mistakes

Do not overwrite top before saving the removed value or linking the new node to the old chain.
Length must change only after an actual insertion or removal.

## Language notes

Python nodes accept the next pointer in their constructor.
Java's node next field is final because existing nodes never need relinking; only the stack's top reference changes.
