## Intuition
Every subarray sum is the difference between two prefix sums.
Its absolute value is largest when those prefix sums are as far apart as possible.
Keeping the minimum and maximum prefix values is therefore enough to obtain the answer.

## Brute force
Choose every starting index and extend an ending index while maintaining the subarray sum.
This examines O(n^2) intervals in O(n^2) time with constant extra space.
Prefix extremes summarize all possible differences during one pass.

## Approach
1. Initialize the running prefix, lowest prefix, and highest prefix to zero.
2. Add each array value to the running prefix.
3. Update the lowest and highest values observed so far.
4. Return the highest prefix minus the lowest prefix.

The initial zero represents the prefix before the array starts, allowing intervals that begin at index zero.
Any difference between two observed prefixes corresponds to the sum of the interval between their positions, possibly with its sign reversed.
Because the objective uses absolute value, either chronological order of the two extreme prefixes gives a valid interval with the same magnitude.
No pair can exceed the full observed range.

## Walkthrough
Example 1 is `[2,-5,1]`.
The prefix sequence, including the initial zero, is `0,2,-3,-2`.
After 2, the minimum is zero and maximum is two.
After -5, the running prefix is -3, lowering the minimum to -3.
The final value raises the prefix to -2 without changing either extreme.
The answer is `2 - (-3) = 5`, attained by the subarray containing only -5.

## Complexity
For n values, the scan takes O(n) time.
Only three prefix counters are stored, giving O(1) auxiliary space.
A full prefix-sum array is unnecessary, and the input is not modified.

## Edge cases
An all-positive array has its largest absolute sum across the whole array.
The same is true for an all-negative array after taking the magnitude.
All zeros return zero, consistent with allowing an empty subarray.
A single value returns its absolute value.

## Common mistakes
- Omitting the initial zero loses some intervals beginning at the first element.
- Tracking only the largest positive sum misses a larger negative magnitude.
- Requiring the minimum prefix to occur first unnecessarily restricts the absolute-value objective.

## Language notes
Python uses integer arithmetic directly.
Java uses `int`; the local bounds imply every interval sum has magnitude at most one billion, so both prefix values and their final range are safe.
