## Intuition

The first operation from a value determines a smaller value whose optimal answer can be reused.
Choosing a division whenever possible is tempting, but a subtraction can enable a better division afterward.
Dynamic programming compares every legal first move instead of committing to that greedy choice.

## Brute force

Explore the tree of all legal operation sequences until reaching one.
The same intermediate values occur on many branches, so recursion without caching repeats substantial work.

## Approach

Define `steps[value]` as the minimum operations needed to reduce `value` to one.
Initialize `steps[1]` to zero and fill values in increasing order.
Subtracting one is always legal, so start with `steps[value - 1]` as the best successor cost.
If divisible by two, compare the entry for `value / 2`.
If divisible by three, compare the entry for `value / 3`.
Add one for the operation just chosen and store the result.
All successor indices are smaller than the current value, making the increasing fill order sufficient.
Return `steps[n]` after all required states have been calculated.

## Walkthrough

Example 1 asks about 10.
The table finds that 3 reaches 1 in one division, so 9 reaches 1 in two divisions.
For 10, subtracting one uses that two-step answer and gives three total steps: 10, 9, 3, 1.
Dividing 10 by two leads to 5, whose best route requires three more operations, so that candidate is worse.
The final answer is 3.

## Complexity

Both references evaluate at most three candidates for each of n values.
Time is O(n), and the table occupies O(n) auxiliary space.
Neither implementation uses recursion or stores the actual operation sequence.

## Edge cases

Input one returns zero without entering the loop.
Powers of two or three still go through the same recurrence and need no separate shortcut.

## Common mistakes

Only divide when the remainder is zero.
Include the cost of the current operation after minimizing the successor costs.

## Language notes

Python uses `//` for integer division.
Java's operands are integers, so `/` already produces the required integer index after the divisibility test.
