## Intuition

A drop belongs to an adjacent pair inside the subarray, rather than to a single array value.
Once a helper counts intervals with at most a given number of drops, subtraction supplies exact and at-least counts.

## Brute force

Checking every interval and recounting its adjacent decreases can take cubic time.
A sliding count updates only the new right edge and the departing left edge.

## Approach

`_at_most` increments drops when a new right endpoint creates `arr[right - 1] > arr[right]`.
While the limit is exceeded, remove the edge between left and left + 1 if it is a drop, then advance left.
Add the number of remaining suffixes, `right - left + 1`.
Compute `at_most` for k and `below` for k - 1.
Return `[at_most, at_most - below, total - below]`, where total counts all nonempty subarrays.

## Walkthrough

```text
Input: arr = [3, 2, 1], k = 1
Output: [5, 2, 3]
```

In Example 1, each adjacent pair is a drop.
The three singletons and two length-two intervals have at most one drop, giving 5.
Only the singletons have zero drops, giving 3.
Exactly one drop therefore gives 5 - 3 = 2, and at least one gives 6 - 3 = 3.
The result is `[5, 2, 3]`.

## Complexity

Two linear helper passes give O(n) time.
Only pointers and counters are retained, so extra space is O(1).

## Edge cases

Every singleton has zero drops.
Equal adjacent values are not drops.
A negative helper limit returns zero, which handles k equal to zero correctly.

## Common mistakes

When advancing left, remove the departing adjacency, not a property of the departing value alone.
Use strict greater-than for a drop.

## Language notes

Python integer counts have arbitrary precision.
Java uses long totals and a long result array because interval counts can exceed a signed int.
