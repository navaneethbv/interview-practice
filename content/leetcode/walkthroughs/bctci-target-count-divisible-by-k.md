## Intuition

All occurrences of a target occupy one contiguous block in a sorted array.
Find that block's two boundaries with binary search, then test its length for divisibility.
The actual occurrence positions do not need to be enumerated.

## Brute force

Scanning every element and counting equality takes O(n) time.
Sorted order permits two logarithmic searches even when the target occupies most of the array.

## Approach

Find the first index whose value is at least target and the first index whose value is greater than target.
Subtract the former from the latter to obtain count.
Return whether `count % k` equals zero.
Each binary search maintains a half-open candidate range and chooses the half containing its boundary.
The first greater position is allowed to be n, so targets reaching the array's final position need no special case.
If target is absent, both boundaries coincide and the count is zero.

## Walkthrough

```text
Input: arr = [1, 2, 2, 2, 2, 2, 2, 3], target = 2, k = 3
Output: true
```

In Example 1, the first 2 occurs at index 1 and the first value greater than 2 occurs at index 7.
The block length is therefore 7 - 1 = 6.
Six divided by k = 3 has remainder zero, so the answer is true.
The values 1 and 3 delimit the block but are not included in its count.

## Complexity

Two binary searches take O(log(n + 1)) time.
Only indices and the resulting count are stored, giving O(1) extra space.
The input remains unchanged.

## Edge cases

An absent target returns true because zero is a multiple of every positive k.
When k is one, every count qualifies.
An all-target array has count n.

## Common mistakes

Do not subtract the last matching index from the first without accounting for inclusivity.
A generic binary search finding any match does not identify the entire block.

## Language notes

Python uses bisect_left and bisect_right.
Java reuses firstGreater with target and target - 1L, widening before subtraction to avoid integer-boundary overflow.
