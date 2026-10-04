## Intuition

A head pointer makes front insertion and removal immediate, while a stored length makes size queries constant time.
Without a tail pointer or backward links, operations at the back must traverse the chain.
The references implement precisely that simple singly linked representation.

## Approach

Each node stores a value and its next pointer.
`push_front` creates a node pointing to the old head, then replaces head and increments length.
`pop_front` returns -1 for an empty list; otherwise it saves the head value, advances head, and decrements length.
`push_back` handles empty input through front insertion and otherwise walks to the final node before linking a new one.
`pop_back` delegates empty and singleton cases to front removal; for longer lists it finds the penultimate node and clears its next pointer.
`contains` scans until finding a match or reaching the end.
`size` returns the maintained counter directly.

## Walkthrough

Example 1 pushes 1 at the front, then 2 at the front, producing `2 -> 1`.
Pushing 3 at the back produces `2 -> 1 -> 3`.
Contains returns true for 2 and false for 4, while size is three.
Popping the front returns 2 and leaves `1 -> 3`.
Popping the back returns 3 and leaves the singleton list containing 1.
Methods that only mutate state produce null in the operation results.

## Complexity

Front insertion, front removal, and size take O(1) time.
Back insertion, back removal, and contains take O(n) worst-case time in these references.
Stored nodes use O(n) space, and each operation uses O(1) additional working space.

## Edge cases

Removing from an empty list returns -1 without decreasing length.
A singleton back removal must also update head, which is why it reuses front removal.

## Common mistakes

Keep length synchronized on every successful insertion or removal.
Stopping at the final node during back removal is too late to unlink it without its predecessor.

## Language notes

Python defines `ListItem`; Java uses a private nested `Node`.
Java exposes camelCase methods, mapped to the corresponding Python-style operation names by the harness.
