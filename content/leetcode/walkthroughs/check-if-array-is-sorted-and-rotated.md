## Intuition

A nondecreasing array rotated at one cut has at most one strict drop when adjacent values are viewed cyclically.
The final-to-first comparison detects the rotation boundary as well as drops inside the linear order.

## Brute force

Trying every rotation and checking whether the result is sorted costs O(n^2).
The cyclic drop count summarizes all possible cuts in one pass.

## Approach

1. Compare every `nums[index]` with the next value, wrapping the final index to zero.
2. Count strict decreases.
3. Return true when the count is at most one.

## Walkthrough

For Example 1, `[3,4,5,1,2]` has comparisons that are nondecreasing until `5 > 1`, which gives one drop.
The wraparound comparison `2 > 3` is false, so the total remains one and the result is true.
For `[2,1,3,4]`, there is a drop at `2 > 1` and another at the wraparound `4 > 2`.
Two drops cannot come from one rotation, so the result is false.

## Complexity

The method makes one cyclic pass, giving O(n) time and O(1) extra space.

## Edge cases

A one-element array has no strict drop and is valid.
Equal adjacent values do not count as drops, so duplicate values are supported.
An already sorted array has no internal drop and a nondecreasing wraparound.

## Common mistakes

Remember to compare the last element with the first.
Use `>` rather than `>=`, because equal values are allowed in a nondecreasing array.
Do not accept two drops just because each local segment separately looks sorted.

## Language notes

Python computes the drop count with a generator expression, while Java uses an explicit loop and modulo index.
Both return a primitive boolean and do not allocate a rotated copy.
