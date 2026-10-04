## Intuition

A drop belongs to the boundary between two adjacent elements, not to either element alone.
Counting subarrays with a bounded number of these boundaries supports a sliding window.
Two such counts provide all three requested answers.

## Brute force

Extend every possible subarray and count each newly crossed descending boundary.
This gives O(n²) time even when counts are maintained incrementally.

## Approach

The `_at_most` helper adds one drop when `arr[right - 1] > arr[right]`.
While there are too many drops, remove the boundary from `left` to `left + 1`, if descending, before advancing `left`.
Every suffix of the resulting window has at most the same number of drops, so add its length to `count`.
Compute `at_most = helper(k)` and `below = helper(k - 1)`.
Exactly k drops contribute `at_most - below`; at least k contribute the total number of subarrays minus `below`.
A negative limit has no valid windows.

## Walkthrough

Example 1 uses `[3, 2, 1]` with `k = 1`.
The helper for one drop contributes 1, then 2, then 2 subarrays at the three endpoints, totaling 5.
For zero drops, only the three singletons qualify, so `below = 3`.
There are six subarrays overall.
Return `[5, 5 - 3, 6 - 3]`, which is `[5, 2, 3]`.

## Complexity

Each helper performs O(n) total pointer movement.
Two calls still take O(n) time and O(1) auxiliary space.

## Edge cases

Equal adjacent values are not drops.
For `k = 0`, the at-least count is every subarray, and the exact count equals the at-most count.

## Common mistakes

When moving `left`, remove its outgoing boundary before incrementing the index.
A singleton has zero internal boundaries, regardless of adjacent values outside it.

## Language notes

Python uses arbitrary-precision counts.
Java returns `long[]` and uses a long multiplication for the total number of subarrays.
