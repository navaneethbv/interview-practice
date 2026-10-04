## Intuition

After sorting, elements inside any numeric interval occur consecutively.
An optimal interval can shrink its endpoints onto actual values and retain only a consecutive block of k elements.
Checking all such blocks is therefore sufficient, even though the requirement says at least k.

## Brute force

Try every pair of input values as interval endpoints and count contained elements.
This can take O(n³) time with a fresh counting pass for each pair.

## Approach

Create a sorted copy named `ordered`.
For every valid start, form the candidate endpoints `ordered[start]` and `ordered[start + k - 1]`.
Compare candidate width with the current best width and replace best only when the width is strictly smaller.
Sorted traversal examines low endpoints in nondecreasing order, so retaining the earlier candidate on equal width implements the smallest-low tie rule.
Any feasible interval with more than k elements contains one of these k-element blocks with no greater width.

## Walkthrough

Example 1 is already sorted as `[1, 2, 5, 7, 8]`, with k = 3.
The first block produces range `[1, 5]` of width 4.
The next gives `[2, 7]` of width 5 and does not improve it.
The final block gives `[5, 8]` of width 3.
That is the smallest width, so the method returns `[5, 8]`.

## Complexity

Sorting takes O(n log n), followed by an O(n) window scan.
The copied array uses O(n) auxiliary space; the returned pair uses constant space.

## Edge cases

For k = 1, every singleton has width zero and the smallest value wins.
Duplicates count as separate elements and can produce a zero-width range containing several entries.

## Common mistakes

Do not deduplicate the array.
Do not update on equal widths, which could replace the preferred smaller low endpoint.

## Language notes

Python uses `sorted`, preserving the caller's array.
Java clones before sorting and computes widths as long values to avoid subtraction overflow for wider coordinate bounds.
