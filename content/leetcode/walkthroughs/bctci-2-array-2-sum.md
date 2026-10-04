## Intuition

The sorted input already provides an efficient membership index without using additional storage.
Scan the unsorted input in its original order so that the first successful lookup also satisfies the smallest-j rule.

## Brute force

Comparing every element of one array with every element of the other costs O(nm) time.
A hash table could improve lookup speed, but would violate the required constant extra space.

## Approach

For each `value` at index `j`, search `sorted_arr` for `-value` using `_find`.
The inclusive interval `[low, high]` contains every remaining possible match.
Compare the middle value with the target and discard the half that cannot contain it.
Return `[i, j]` immediately after a successful search; return `[-1, -1]` only after every `j` fails.
Distinct values ensure the matching sorted-array index is unambiguous.

## Walkthrough

```text
Input: sorted_arr = [-5, -4, -1, 4, 6, 7], unsorted_arr = [-3, 7, 18, 4, 6]
Output: [1, 3]
```

The first three unsorted values are -3, 7, and 18.
Their required partners 3, -7, and -18 are absent.
At `j = 3`, the value 4 requires -4, which binary search finds at `i = 1`.
The returned pair is therefore `[1, 3]`; later connections between the arrays cannot improve its second index.

## Complexity

For sorted length n and unsorted length m, time is O(m log(n + 1)).
The iterative search and outer loop use O(1) extra space.
Neither input is sorted or modified by this solution.

## Edge cases

A single-element sorted array still supports a valid match.
Zero matches zero across the two separate arrays.
If all complements are absent, both returned indices must be -1.

## Common mistakes

Sorting the unsorted array loses the original-index tie rule.
Returning `[j, i]` reverses the required index order.

## Language notes

Python implements binary search explicitly with integer midpoint division.
Java uses `Arrays.binarySearch`, whose negative results indicate absence rather than valid indices.
