## Intuition

Two sentinel nodes make every real node have both a predecessor and a successor.
The same pointer rewiring can therefore insert or remove an endpoint without separate empty-list and single-node cases.
A stored length supplies constant-time size queries.

## Brute force

An array supports membership and size, but inserting or removing at its front shifts all remaining values.
That violates the required constant-time endpoint operations.

## Approach

Connect `head.next` to `tail` and `tail.prev` to `head` initially.
The insertion helper allocates `fresh`, links it between `node` and `node.next`, and increments `length`.
Front insertion uses `head`; back insertion uses `tail.prev`.
The removal helper refuses either sentinel, otherwise connects the node's predecessor directly to its successor in both directions and decrements `length`.
Front and back removals pass `head.next` and `tail.prev` respectively.
Membership walks real nodes until reaching `tail`, comparing values along the way.

## Walkthrough

Example 1 pushes 1 at the front, then 2 at the front, then 3 at the back.
The real-node sequence is `[2, 1, 3]`.
Searching for 2 returns true, searching for 4 returns false, and size returns 3.
Removing the front returns 2 and leaves `[1, 3]`.
Removing the back returns 3 and leaves `[1]`.
Insertion operations have no result, so their output entries are null.

## Complexity

Each push, pop, and size operation takes O(1) time.
`contains` takes O(n) time in the worst case.
The structure stores O(n) nodes, with O(1) temporary space per operation.

## Edge cases

Removing from an empty list passes a sentinel and returns -1 without changing length.
Duplicate values occupy separate nodes and are allowed.

## Common mistakes

Update both forward and backward links.
Sentinels must never count toward size or be considered valid membership matches.

## Language notes

Python identifies sentinels with `is`, while Java compares node references with `==`.
The runner maps snake_case Python operation names to camelCase Java methods.
