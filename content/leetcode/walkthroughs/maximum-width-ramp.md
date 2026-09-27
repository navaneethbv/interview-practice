## Intuition

For a left endpoint to produce a wide ramp, it should have a small value and an early index.
Keep only record-low left indices, then scan right endpoints from the end so the first match gives the widest width for that left index.

## Brute force

Trying every pair of indices takes O(n squared) time.
It checks many left endpoints that a smaller earlier value already dominates.

## Approach

1. Build a stack of indices whose values are strict new minima.
2. Scan right indices from right to left.
3. While the smallest remaining left value is no greater than the current right value, compute its width and remove it.

## Walkthrough

Example 1:

For [6,0,8,2,1,5], the candidate stack contains indices 0 and 1.
Scanning from index 5, value 5 matches index 1 and gives width 4.
That is already the widest possible pair for index 1, so the answer is 4.

## Complexity

Each index enters and leaves the stack at most once, giving O(n) time.
The stack uses O(n) space.
Python and Java both keep indices rather than copying the input.

## Edge cases

An already nondecreasing array gives the full width.
An array whose values strictly decrease gives width zero.
Equal values qualify because the ramp condition is nondecreasing.

## Common mistakes

Do not keep every left index because dominated indices add work without improving a width.
Scan right endpoints from the end to obtain maximum width first.
Use less than or equal when testing a candidate pair.

## Language notes

Python uses a list as a decreasing-index stack.
Java uses ArrayDeque and pushes candidate indices at the front.
