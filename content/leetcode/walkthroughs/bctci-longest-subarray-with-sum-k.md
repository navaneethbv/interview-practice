## Intuition

A subarray sum is the difference between two prefix sums.
For a current prefix p, an earlier prefix p - k identifies a matching interval; its earliest occurrence gives the longest such interval ending here.

## Brute force

Enumerating all starts and ends with incremental sums takes O(n squared) time.
A standard shrinking window is unreliable because negative values can make its sum move in either direction.

## Approach

Initialize `first` with prefix zero at index -1, representing the empty prefix before the array.
Accumulate prefix while scanning.
If prefix - k has appeared, update best with the distance from its stored earliest index.
Then insert the current prefix only if absent.
Preserving the first index maximizes every later interval using that prefix.
Checking before insertion ensures that only nonempty intervals are considered, including when k is zero.

## Walkthrough

```text
Input: arr = [1, 2, 3, 2, 1], k = 3
Output: 2
```

Example 1 produces cumulative sums 1, 3, 6, 8, and 9.
At index 1, prefix 3 finds prefix zero at -1, giving interval length 2 for `[1, 2]`.
At index 2, prefix 6 finds earlier prefix 3 and gives only length 1.
At index 4, prefix 9 finds prefix 6 at index 2, producing another length-2 interval `[2, 1]`.
The maximum remains 2.

## Complexity

With expected constant-time hash operations, time is O(n).
The earliest-prefix map stores at most n + 1 entries, using O(n) space.

## Edge cases

An empty input returns -1.
A whole-array match uses the initial index -1 entry.
Zero-sum repeated prefixes can create long matches.
Negative values and negative k are supported.

## Common mistakes

Overwriting an earliest prefix index can shorten the reported answer.
Return -1 when no nonempty matching interval exists, not zero.

## Language notes

Python uses setdefault to preserve first occurrences.
Java uses long prefix keys and putIfAbsent, preventing cumulative arithmetic from overflowing int in broader input ranges.
