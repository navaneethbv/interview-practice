## Intuition
One operation subtracts the same positive amount from every currently positive element.
Each distinct positive value creates one new level that must be removed, so the answer is simply the count of distinct positives.

## Brute force
Simulating each subtraction level repeatedly scans the array and can cost O(N^2) when values have many different magnitudes.
A set records the levels without changing any values.

## Approach
1. Ignore zero values because they do not participate in an operation.
2. Insert every positive value into a set.
3. Return the set size.

## Walkthrough
Example 1 is `[1,5,0,3,5]`.
The positive values are 1, 5, and 3, producing the set `{1,3,5}`.
Subtracting the smallest positive level, then the next, then the last requires three operations, so the answer is 3.

## Complexity
Hash-set insertion takes O(N) expected time and O(U) space for U distinct positive values.
No simulation proportional to the numeric magnitudes is performed.

## Edge cases
An all-zero array returns zero.
Repeated positive values count once.
A single positive value needs one operation.
Large numeric values do not increase the operation count unless they introduce another distinct level.
The order of values is irrelevant because every operation affects all positive positions together.

## Common mistakes
Counting every positive element overcounts duplicates.
Including zero creates an operation that cannot subtract a positive amount from a zero-only state.
Using the minimum value alone ignores later distinct levels.

## Language notes
Python forms `set(nums) - {0}` directly.
Java filters positive values into a `HashSet<Integer>` before returning its size.
