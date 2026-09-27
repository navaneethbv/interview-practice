## Intuition
If the total sum is not divisible by three, equal parts are impossible.
Otherwise scan left to right and count completed prefixes whose sum equals one third of the total.

## Brute force
Trying both cut positions and summing each section repeats work.
A running sum finds valid cuts in one pass.

## Approach
1. Compute the total and reject when `total % 3 != 0`.
2. Set the target part sum to `total // 3`.
3. Accumulate values into `partial`.
4. Whenever `partial == target`, close one part and reset it.
5. Return true when at least three parts are found.

## Walkthrough
For Example 1, the total is 9 and the target is 3.
The prefix `[0,2,1]` reaches 3, the middle section through index 7 reaches another 3, and the remaining suffix reaches the third 3.
The result is true.
For `[1,2,3]`, the total is divisible by three but no two nonempty cuts yield three target sums, so the result is false.

## Complexity
The scan takes O(n) time and O(1) auxiliary space.
The input is not modified.

## Edge cases
A zero target can produce several zero-sum prefixes, but the parts must remain nonempty.
The final part is guaranteed by the total and valid cut count.

## Common mistakes
Require exactly three contiguous nonempty parts, not merely three matching prefixes that overlap.
Check divisibility before integer division.
Do not sort or reorder values.

## Language notes
Python uses `sum` and a running partial.
Java computes the total with an integer loop to preserve the same contract.
