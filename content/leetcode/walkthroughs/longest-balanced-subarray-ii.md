## Intuition
A subarray is balanced when the number of distinct even values equals the number of distinct odd values.
For each value, its parity contributes only after the subarray start moves past that value's previous occurrence.
This makes each new element a range update over possible starts, which a lazy segment tree can maintain efficiently.

## Brute force
Checking every subarray and maintaining two sets takes O(n^2) time in the worst case.
That does not scale to the larger input limit.

## Approach

1. Maintain candidate-start balances as distinct-even count minus distinct-odd count.
2. For each value, range-add its parity after the previous occurrence through the current index.
3. Keep minimum and maximum balance in a lazy segment tree.
4. Use the adjacent-start difference invariant to search for the earliest actual zero through the current index.
5. Record the longest balanced range and update the value's latest position.

## Walkthrough

For Example 1, `[2,2,1,3,4]`, the first 2 contributes +1 to start 0.
The second 2 contributes only to start 1 because earlier starts already include 2.
The first 1 contributes -1, bringing start 0 to balance zero.
The later 3 contributes another odd distinct value, while 4 contributes one even distinct value.
At the final endpoint, the full range has two distinct evens, 2 and 4, and two distinct odds, 1 and 3, so length 5 is recorded.
For `[2,4,6]`, every candidate balance is positive and no zero is found, so the answer is 0.

## Complexity
Each of n elements causes one range update and one first-zero search, each O(log n).
The total time is O(n log n).
Tree arrays, lazy tags, the last-occurrence map, and bookkeeping use O(n) auxiliary space.

## Edge cases
Repeated values must not be counted twice for a start that already contains them.
All values with one parity produce no balanced nonempty range.
A one-element range always has unequal parity counts.

## Common mistakes
Use the previous occurrence plus one as the update's left boundary.
Do not return an arbitrary zero if an earlier zero exists, because the earlier start gives a longer range.
Keep min and max values updated after child changes.

## Language notes
The Python and Java references implement the same lazy segment tree with range addition and zero searching.
Java arrays are allocated from the input length and helper methods keep tree operations separate from the public method.
