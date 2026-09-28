## Intuition

The intersection keeps each value the smaller number of times it appears in the two arrays.
A count map records remaining copies from one array, then each matching value in the other consumes one copy.

## Brute force

Comparing every pair is O(nm) and can match one occurrence repeatedly unless entries are marked.
Counting occurrences gives linear expected work.

## Approach

1. Count every value in `nums1`.
2. Scan `nums2` and append a value only when its remaining count is positive.
3. Decrement that count after consuming one occurrence.
4. Return the collected values; order is free under the contract.

## Walkthrough

For Example 1, counts from `[1,2,2,1]` are two 1s and two 2s.
Scanning `[2,2]` consumes the first 2 and then the second 2.
The result is `[2,2]`, with no copies left for another match.

## Complexity

For lengths n and m, expected time is O(n + m), map space is O(u), and output space is O(min(n,m)), where u is the number of distinct values.
Python's `Counter` stores counts, while Java stores boxed integer counts and then copies the list into an `int[]` output.

## Edge cases

Disjoint arrays produce an empty output.
Duplicates are retained up to the smaller multiplicity.
Zero and negative values work as ordinary map keys.

## Common mistakes

Do not remove all copies after the first match.
Do not assume output order when the spec uses unordered comparison.
Decrement the count after appending, not before.

## Language notes

Python explicitly tracks and decrements the `Counter` entry.
Java builds a primitive result array because the judge method returns `int[]`.
