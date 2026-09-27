## Intuition

A contiguous segment can become all ones exactly when it contains at most k zeros.
This turns flipping choices into a sliding-window constraint.
For each right endpoint, keeping the earliest valid left endpoint gives the longest qualifying segment ending there.

## Brute force

Enumerate every starting position and extend its segment while counting zeros.
Even with a running count for each start, there are O(n²) segments to consider.
A sliding window reuses the zero count while moving each endpoint only forward.

## Approach

1. Initialize `left`, `zeros`, and `best` to zero.
2. Extend the window to each `right` index and count its value if it is zero.
3. While the zero count exceeds k, remove the leftmost value from the count and increment `left`.
4. Once the window is valid, update `best` with `right - left + 1`.
5. Return the largest recorded length.

The inner loop does not imply quadratic work: `left` never retreats and crosses each array entry at most once.
The algorithm counts potential flips without actually changing any values.

## Walkthrough

Example 1 is `nums = [1,0,1,1,0,1]`, `k = 1`.

| Right index | Left after shrinking | Zeros | Valid length | Best |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 1 | 1 |
| 1 | 0 | 1 | 2 | 2 |
| 2 | 0 | 1 | 3 | 3 |
| 3 | 0 | 1 | 4 | 4 |
| 4 | 2 | 1 | 3 | 4 |
| 5 | 2 | 1 | 4 | 4 |

At right index 4, removing index 0 alone does not remove a zero, so shrinking continues through index 1.
The answer remains four.

## Complexity

- Time: O(n), because both window endpoints move forward at most n times.
- Space: O(1), using only counters and indices.

## Edge cases

With k zero, the window contains only existing ones.
If k covers all zeros, the entire array qualifies.
An all-zero input returns at most k entries.
A window may become empty during shrinking, giving length zero until a later valid entry arrives.

## Common mistakes

- Shrinking only once may leave too many zeros in the window.
- Counting total ones instead of contiguous length ignores gaps.
- Updating the maximum before restoring validity records an impossible window.

## Language notes

Python adds boolean comparisons to an integer zero count.
Java uses explicit conditional increments and decrements.
Both leave the input array unchanged and avoid allocating a separate array for flipped values.
