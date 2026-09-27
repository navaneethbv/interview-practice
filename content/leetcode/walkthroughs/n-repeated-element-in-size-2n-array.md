## Intuition

Every value except one appears exactly once, so the first value encountered twice must be the repeated value.
A set records values already seen without needing full frequency counts.

## Brute force

Counting every value with a frequency map works in O(n) time but stores counts that are unnecessary after a duplicate appears.
Comparing every pair would take O(n²) time.

## Approach

1. Start an empty `seen` set.
2. Scan the array from left to right.
3. Return the current value when it is already in the set.
4. Otherwise insert it and continue.

## Walkthrough

This is Example 1 from the local statement.
For `[1,2,3,3]`, the scan adds 1, then 2, then 3 to `seen`.
The final 3 is already present, so the method returns 3 immediately.

## Complexity

Set insertion and membership are expected O(1), so the scan takes O(n) expected time.
The set stores at most n distinct values, using O(n) space.

## Edge cases

The repeated value may appear near the beginning or end.
The problem guarantees exactly one repeated value, so the scan will return before exhaustion.
Values may repeat by number, not by position identity.

## Common mistakes

Check membership before inserting the current value.
Do not return the first value that appears only once.
Do not rely on the repeated value having a special numeric range.

## Language notes

Python uses a built-in set, while Java uses `HashSet<Integer>`.
The Java throw after the loop is unreachable under the stated contract and satisfies the compiler's return requirement.
