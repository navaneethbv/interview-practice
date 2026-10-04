## Intuition

Only the whole array and recursively aligned halves are candidates.
A recursive range can summarize both its total sum and the best laminal sum anywhere inside it.

## Brute force

Listing every allowed range and summing its elements separately repeats additions across recursion levels, costing O(n log n).
Ordinary maximum-subarray algorithms solve a broader problem because they also permit unaligned ranges.

## Approach

`_solve(arr, start, end)` returns `(total, best)` for a half-open aligned range.
A singleton returns its value for both summaries.
Otherwise split at the midpoint and solve both halves.
Add their totals for the whole range, then take the maximum of that total and the two child best values.
Every permitted candidate is either the current whole range or belongs recursively to one of its halves, so these three alternatives are complete.
Return the root summary's best value.

## Walkthrough

```text
Input: arr = [3, -9, 2, 4, -1, 5, 5, -4]
Output: 6
Explanation: [2, 4] has the largest sum among all laminal arrays.
```

Example 1 has pair totals -6, 6, 4, and 1.
The first half totals zero but contains the pair `[2, 4]` with best sum 6.
The second half totals 5 and has best sum 5.
The whole array also totals 5.
Comparing the whole and child best values returns 6.

## Complexity

The recursion tree has n leaves and n - 1 internal nodes, each doing constant work, so time is O(n).
Balanced halving gives O(log n) stack space.
The reference passes indices rather than copying subarrays.

## Edge cases

A singleton returns its own value.
For all-negative arrays, the best singleton may win; the empty array is not a candidate.
The power-of-two length guarantee makes every split valid.

## Common mistakes

Initializing best to zero would incorrectly allow an empty range.
Do not combine arbitrary suffixes and prefixes across the midpoint.

## Language notes

Python returns a tuple of integers.
Java returns a two-element long array because accumulated sums can exceed the int range even though individual values are ints.
