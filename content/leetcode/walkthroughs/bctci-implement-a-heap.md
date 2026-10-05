## Intuition

A heap stores a complete binary tree in an array and ensures each parent has priority over its children.
A shared comparison helper reverses that priority rule for minimum versus maximum heaps.

## Brute force

Keeping the array completely sorted makes insertion linear.
Building a heap through repeated pushes takes O(n log n), whereas repairing internal nodes from the bottom upward satisfies the required linear construction time.

## Approach

Construction calls `_sift_down` from the last parent toward zero.
`push` appends and swaps upward while it outranks its parent.
`pop` replaces the root with the last element and sifts downward through the higher priority child.
`top` reads the root.

## Walkthrough

Example 1 creates an empty min heap.
Pushing 4 and 8 leaves 4 at the root.
Pushing 2 swaps it above 4, giving root 2.
Popping returns 2 and repairs the remaining heap, so `top()` returns 4 and `size()` returns 2.

## Complexity

Bottom up construction takes O(n), because most nodes are near the leaves.
Pop costs O(log n), while push costs amortized O(log n), allowing occasional backing array growth.
Top and size take O(1).
Storage is O(p), where p is peak heap size.

## Edge cases

Empty `top` and `pop` return -1, which cannot conflict with the nonnegative input domain.
Duplicates are valid and need not swap when equal.
Removing the only element leaves an empty heap.

## Common mistakes

During sift down, compare both children before choosing a swap.
Use children `2 * index + 1` and `2 * index + 2`.
A heap is not globally sorted, and constructor heapification must begin at the last internal node.

## Language notes

Python uses a growable `items` list and Boolean `is_min`.
Java manages an integer buffer and logical `length`, doubling capacity when necessary.
Both implement their own heap operations without using a built in priority queue.
