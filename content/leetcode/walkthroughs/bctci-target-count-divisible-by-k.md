## Intuition

Because arr is sorted, all copies of target form one contiguous block.
The number of copies is the first position after target minus the first position at target.
The desired answer is simply whether that block length has remainder zero when divided by k.

## Brute force

A linear scan can count values equal to target.
That works, but it ignores that binary search can find both block boundaries without examining unrelated values.

## Approach

Use bisect_left to find the first index whose value is at least target.
Use bisect_right to find the first index whose value is greater than target.
Subtract the two positions to obtain the exact occurrence count.
Return count modulo k equal to zero, which also makes zero occurrences satisfy the problem's rule.

## Walkthrough

In Example 1, the six copies of 2 occupy one block between the two boundary searches.
The count is 6, and 6 modulo 3 is zero, so the result is true.
In Example 2, the same count is tested against 4, and 6 modulo 4 is 2, so the result is false.
If target is absent, both boundaries are the same and the count is zero.

## Complexity

The two binary searches take O(log n) time for an array of length n.
The references use O(1) additional space.

## Edge cases

A target at the beginning or end is handled by the half-open boundary positions.
All values can be equal, so the block may span the entire array.
An absent target returns true for every positive k because zero is divisible by k.
Negative values use the same ordering rules as positive values.

## Common mistakes

Using only one boundary cannot distinguish one occurrence from many.
Counting the inclusive right endpoint adds one extra position.
Treating zero occurrences as false contradicts the stated divisibility convention.

## Language notes

Python directly uses bisect_left and bisect_right from bisect.
Java's firstGreater helper returns the first position whose value exceeds a long boundary.
The Java call uses target minus 1 as a long so the minimum integer target does not overflow.
