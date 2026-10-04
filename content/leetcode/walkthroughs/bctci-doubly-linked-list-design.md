## Intuition

Permanent head and tail sentinels make front and back edits ordinary insertions or removals between two nodes.
Both directions of every link must stay consistent after each operation.

## Brute force

A singly linked list needs a traversal to locate the predecessor when removing the tail.
An array needs shifts for front operations, violating the constant-time endpoint requirement.

## Approach

Initialize head.next to tail and tail.prev to head.
`_insert_after` connects a fresh node between an existing node and its successor, then increments length.
`_remove` reconnects the two neighbors and decrements length, but returns -1 for either sentinel.
Front methods operate next to head, and back methods next to tail.
`contains` walks only real nodes, while `size` returns the stored length.
The sentinels themselves never represent user values or contribute to size.

## Walkthrough

```text
Input: ops = ["push_front", "push_front", "push_back", "contains", "contains", "size", "pop_front", "pop_back"], args = [[1], [2], [3], [2], [4], [], [], []]
Output: [null, null, null, true, false, 3, 2, 3]
```

Example 1 pushes 1 at the front, then 2 at the front, then 3 at the back, forming `[2, 1, 3]`.
Contains returns true for 2 and false for 4; size is 3.
Popping the front removes 2 and reconnects head to 1.
Popping the back removes 3 and reconnects 1 to tail.
The remaining list contains only 1.

## Complexity

All endpoint operations and size queries take O(1) time.
Contains takes O(n) time in the worst case.
The list stores O(n) nodes plus two sentinels.

## Edge cases

Popping an empty list returns -1 without changing length.
Removing the only real node restores the initial sentinel links.
Duplicate values are allowed and remain separate nodes.

## Common mistakes

Updating only next links leaves reverse traversal inconsistent.
Do not identify sentinels by value, since zero is a valid stored value.

## Language notes

Python uses object identity for sentinel checks.
Java uses reference equality and a private node class; its public methods use camelCase names.
