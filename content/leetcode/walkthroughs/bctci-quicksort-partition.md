## Intuition

Maintain three completed regions around an unclassified middle: values smaller than the pivot, equal to it, and larger than it.
Examining one unclassified value either extends a completed region or swaps in another unclassified value.
This is the three-way partition used to handle duplicates efficiently in quicksort.

## Brute force

Build separate smaller, equal, and larger lists, then concatenate them back into the array.
That takes linear time but uses O(n) extra space.

## Approach

`smaller` marks the end of the smaller region, `current` the next unclassified position, and `larger` the last unclassified position.
When the current value is smaller, swap it with `smaller` and advance both left-side indices.
When it is larger, swap with `larger` and retreat only the right boundary.
The swapped-in value is still unknown, so `current` must stay for another examination.
When the current value equals the pivot, simply advance `current`.
Stop once the unclassified interval becomes empty.

## Walkthrough

Example 1 uses pivot 4 with `[1, 7, 2, 3, 3, 5, 3]`.
The first 1 extends the smaller region.
The 7 swaps with the final 3, producing `[1, 3, 2, 3, 3, 5, 7]`.
The scan accepts the successive smaller values and eventually moves 5 into the larger region.
The references can finish with `[1, 3, 2, 3, 3, 5, 7]`.
This differs from the displayed ordering but is equally valid because ordering inside a region is unrestricted.

## Complexity

Each iteration shrinks the unclassified interval by one.
Both references take O(n) time and O(1) auxiliary space, mutating the input array directly.

## Edge cases

The pivot need not occur in the array, leaving the equal region empty.
An all-equal array advances only `current` and needs no meaningful swaps.

## Common mistakes

Do not advance `current` after swapping from the right.
Use `current <= larger` so the last unclassified position is processed.

## Language notes

Python uses simultaneous assignment for swaps.
Java delegates swaps to a small helper and uses post-increment or post-decrement when moving boundaries.
