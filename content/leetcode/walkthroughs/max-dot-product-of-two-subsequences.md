## Intuition

At each pair of array prefixes, either skip an element or select a pair together.
The selected pair may start a nonempty subsequence, so the recurrence separately considers the product alone before extending a previous selection.

## Brute force

Enumerating subsequences from both arrays is exponential.
Dynamic programming stores the best nonempty dot product for every pair of prefixes.

## Approach

1. Let `previous[j]` represent the best nonempty result using processed values of nums1 and the first j values of nums2.
2. For a new nums1 value, compute `current[j]` from selecting the pair, skipping the nums1 value, or skipping nums2[j-1].
3. Use `product + max(0, previous[j-1])` so a negative prior result is not forced into a new selection.
4. Return the final prefix state.

## Walkthrough

This is Example 1 from the local statement.
Choosing 2 with 3 gives product 6, and choosing -2 with -6 gives product 12.
The dynamic program can skip 1 and 0, then combine those two selected pairs for total 18.
The `max(0, previous)` term allows each chosen product to begin a valid nonempty subsequence when all longer combinations would be worse.

## Complexity

For lengths m and n, the two rolling rows take O(mn) time.
Only two arrays of length n + 1 are stored, giving O(n) auxiliary space.

## Edge cases

The answer may be negative when all possible products are negative.
At least one pair must be selected, so the DP is initialized to negative infinity rather than zero.
The empty prefix states remain impossible and are never returned.

## Common mistakes

Do not allow the empty subsequence to win with zero.
Preserve order by advancing through prefixes rather than sorting values.
Handle a negative product as a possible start even when it lowers the current total.

## Language notes

Python uses floating negative infinity, while Java uses a safe large negative sentinel.
Both use rolling rows instead of an m by n table.
