## Intuition

Untouched seats are always numbered above every seat ever handed out, so a counter covers them. Only freed seats need ordering, and a min-heap returns the smallest.

## Approach

1. Keep `next`, the smallest never-reserved seat, starting at 1.
2. Keep freed seats in a min-heap.
3. `reserve` pops the heap if it is non-empty, otherwise returns `next` and increments it.
4. `unreserve` pushes the seat onto the heap.

## Walkthrough

In Example 1, reserve returns 1 and 2. Freeing 2 puts it on the heap, so the next reserve returns 2, then 3, 4 and 5 come from the counter.

## Complexity

- Time: O(log n) per call.
- Space: O(freed seats).

## Edge cases

- A freed seat is always smaller than `next`, so preferring the heap is correct.
- The constructor does not need to create n seats.

## Common mistakes

- Pre-filling a heap with all n seats, which is O(n log n) even if few are used.
- Returning `next` before checking freed seats.
