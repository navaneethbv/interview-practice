## Intuition

A window is valid when it contains every distinct required value at least once.
Expand its right edge until valid, then shrink its left edge as far as possible while preserving coverage.
Each valid window's shortest suffix is the only candidate worth retaining for that right endpoint.

## Brute force

Enumerate every subarray and test whether it covers all required values.
There are O(n squared) subarrays, and repeated coverage calculations add further work.
A sliding window updates counts only for entering and leaving values.

## Approach

Initialize `counts` for required values and let `covered` count how many currently have positive frequency.
For each right endpoint, `_include` updates its value and increments covered only on a zero-to-one transition.
While all requirements are covered, consider the current interval and remove the leftmost value.
`_exclude` reduces coverage only on a one-to-zero transition.
Update `best` only for a strictly shorter interval to preserve the earliest start among ties.

## Walkthrough

Example 1 requires 1, 5, and 9.
The first complete window ends at index 5, and shrinking removes the irrelevant leading 7 to give `[1, 5]`.
Later, the window spanning indices 7 through 10 contains `[5, 7, 9, 1]`, so its inclusive length is four.
Removing index 7 would lose the required 5.
No later window is shorter, so return `[7, 10]`.

## Complexity

For n longer-array entries and k required values, expected time is O(n + k).
Both pointers advance at most n times.
Counts use O(k) space; only two indices are stored for the answer.

## Edge cases

If any required value never appears, return `[-1, -1]`.
Extra copies of a required value allow shrinking until its final copy would leave.
The shorter array is guaranteed nonempty.

## Common mistakes

Decreasing coverage whenever any copy leaves is incorrect if another copy remains.
The answer uses inclusive endpoints, not an exclusive right bound.

## Language notes

Python prepopulates the required-count dictionary.
Java uses a required-value set plus a count map; both ignore irrelevant values when updating coverage.
