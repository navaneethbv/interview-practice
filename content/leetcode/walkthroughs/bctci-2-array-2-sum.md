## Intuition

Only one array is sorted, so binary search can test whether each unsorted value has its opposite in the sorted array.
Processing unsorted positions from left to right also enforces the required smallest `j`.

## Brute force

Checking every pair takes O(nm) comparisons for lengths n and m.
A hash table would speed up membership checks, but it would violate the explicit constant extra space requirement for this problem.

## Approach

For each `j, value`, call `_find(sorted_arr, -value)`.
The helper maintains inclusive bounds `low` and `high`, discarding the half that cannot contain `target` after comparing `arr[mid]`.
Return `[i, j]` immediately when a match exists.

## Walkthrough

In Example 1, values -3, 7, and 18 require 3, -7, and -18, none of which occur.
At `j = 3`, value 4 requires -4.
Binary search finds -4 at sorted index 1, so the result is `[1, 3]`.

## Complexity

With n sorted elements and m unsorted elements, worst case time is O(m log(n + 1)).
Both references use O(1) auxiliary space and return a fixed size pair.
Neither reference changes either input array.

## Edge cases

A matching pair may include zero in both arrays.
A single element sorted array still follows the same search rule.
When no opposite exists for any value, return the two element sentinel `[-1, -1]`.

## Common mistakes

Do not sort `unsorted_arr`, because its original index determines the tie break.
Do not stop at the smallest sorted index across all pairs.
The search target is the negation of the value, not the value itself.

## Language notes

Python implements the inclusive binary search directly with integer division.
Java uses `Arrays.binarySearch`, whose negative failure result is not a valid index.
The given value bounds make negation safe for a Java `int`.
