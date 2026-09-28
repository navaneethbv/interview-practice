## Intuition

After sorting, the cheapest way to resolve each duplicate is to place it at the smallest unused value at or above its original value.
Moving a later duplicate past an earlier value never hurts the remaining entries.

## Brute force

Trying different increment amounts for duplicates branches unnecessarily.
A sorted greedy scan fixes each value at its earliest available position.

## Approach

1. Sort the values.
2. Track the next unused value.
3. Choose `max(value, next_value)`, add the increment cost, and advance the next value.
4. Return total moves.

## Walkthrough

For Example 1, sorted `[1,2,2]` first chooses 1, then 2.
The final 2 cannot remain at 2, so it chooses 3 and adds one move.
The answer is 1.

## Complexity

Sorting costs O(n log n) and the scan costs O(n).
Python's `sorted` creates an O(n) copy, while Java sorts the input array in place.
The scan uses O(1) additional state.

## Edge cases

Already distinct values require zero moves.
A run of equal values advances through consecutive integers.
The answer can exceed the original value range even though it fits the stated result bound.
Sorting ensures an earlier value is never moved past a later value that could have used the same free position.

## Common mistakes

Process values in sorted order.
Advance `next_value` after every chosen value, including an unchanged one.
Charge only `chosen - value` moves.

## Language notes

Python leaves the caller's list unchanged because it iterates over `sorted(nums)`.
Java mutates its input array through `Arrays.sort`.
