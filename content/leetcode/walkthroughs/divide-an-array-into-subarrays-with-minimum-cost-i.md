## Intuition

The first subarray must begin at index zero, so `nums[0]` is unavoidable.
Every later cut costs the first value of a later piece, and choosing the two smallest values from the remaining entries minimizes those two cut costs.

## Brute force

Trying every pair of cut positions checks `O(n^2)` possibilities.
Only the two smallest later values matter, so a small selection scan is enough.

## Approach

1. Keep `nums[0]` as the first subarray cost.
2. Find the two smallest values in `nums[1:]`.
3. Add them to the first value and return the total.

## Walkthrough

For Example 1, `nums = [8, 3, 5, 1, 4]`.
The two smallest values after the mandatory first entry are 1 and 3.
Cutting before 3 and before 1 gives pieces `[8]`, `[3, 5]`, and `[1, 4]`, with cost `8 + 3 + 1 = 12`.

## Complexity

The Python sorted selection takes `O(n log n)` time, while the Java two-minimum scan takes `O(n)` time.
Both use `O(n)` or `O(1)` auxiliary space respectively, excluding the returned scalar.

## Edge cases

With exactly three entries, all three must become one-entry subarrays.
Duplicate minimum values can be selected from different positions because each array occurrence is available.

## Common mistakes

- Choosing the two smallest values including `nums[0]` counts the mandatory first cost twice.
- Treating subarray lengths as fixed ignores that cuts may occur anywhere after index zero.
- Sorting the whole array can move the mandatory first value out of its special role.

## Language notes

Python uses a sorted slice, which copies the suffix, while Java tracks two minima without sorting.
The input values are small enough for Java `int` addition under the local constraints.
