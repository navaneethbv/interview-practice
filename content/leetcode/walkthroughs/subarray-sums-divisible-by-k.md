## Intuition

Two prefix sums with the same remainder modulo k differ by a multiple of k.
Therefore, every earlier prefix with the current remainder starts a valid subarray ending here.

## Brute force

Summing every contiguous range directly takes O(n²) time.
Prefix sums reduce each range sum to O(1), but checking every pair still remains quadratic.

## Approach

1. Initialize `remainderCounts[0] = 1` for the empty prefix.
2. Update the running remainder for each value.
3. Add the number of earlier prefixes with that remainder to the answer.
4. Increment the current remainder's frequency.

## Walkthrough

This is Example 1 from the local statement.
For `[4,5,0,-2,-3,1]` with k 5, the running remainders are 4, 4, 4, 2, 4, and 0.
The repeated remainder 4 contributes multiple pairs of prefixes, and the initial remainder 0 pairs with the final prefix.
Counting every matching pair produces 7 valid subarrays.

## Complexity

The array is scanned once, so time is O(n).
The remainder frequency array uses O(k) space.

## Edge cases

Zero values repeat the current remainder and count valid zero-sum ranges.
Negative values need normalized nonnegative remainders; Python's modulo and Java's `floorMod` provide that behavior.
The empty prefix is essential for ranges beginning at index zero.

## Common mistakes

Count a remainder before incrementing its frequency for the current prefix.
Do not use raw Java `%` without correcting negative results.
Remember that every pair of equal remainders forms a separate index range.

## Language notes

Python's `%` returns a nonnegative remainder for positive k.
Java uses `Math.floorMod` so negative array values follow the same mathematical rule.
