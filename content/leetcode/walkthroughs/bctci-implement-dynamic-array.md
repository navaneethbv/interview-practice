## Intuition

Logical size and allocated capacity are different quantities.
Extra capacity makes most appends a single assignment, while occasional geometric resizing spreads copying costs across many operations.
Shrinking only when one quarter full prevents repeated grow-shrink oscillation.

## Brute force

Allocate an array exactly one element larger on every append.
Appending n values then copies a total of O(n squared) elements, even though the final collection contains only n values.

## Approach

Begin with capacity one and logical `length` zero.
On append, double the backing array if full, copy active elements, write at index `length`, and increment length.
`get`, `set`, and `size` operate directly on the active prefix.
`pop_back` decrements length and halves capacity when occupancy is at most one quarter, preserving a minimum capacity of one.
Only the active prefix is copied during resizing; unused slots are not logical members.

## Walkthrough

Example 1 appends 1 into the initial one-slot array.
Appending 2 triggers growth to capacity two, copies 1, and stores 2 at index one.
The two `get` calls return 1 and 2.
`size` reports logical length two, yielding `[null, null, 1, 2, 2]` for the operation results.

## Complexity

`get`, `set`, and `size` take O(1) time.
Append and removal take amortized O(1), though a resizing operation costs O(n).
Allocated storage is O(n + 1), with temporary old and new buffers during resizing.

## Edge cases

Removing the final element leaves an empty array with nonzero capacity.
All indexed and removal operations are guaranteed valid, so no extra error policy is needed.

## Common mistakes

Do not report capacity as size or shrink immediately after dropping below half full.
Preserve element order when copying into a resized buffer.

## Language notes

Python uses fixed-length allocated lists without append for storage growth.
Java uses arrays and `System.arraycopy`; its `popBack` name corresponds to Python's `pop_back`.
