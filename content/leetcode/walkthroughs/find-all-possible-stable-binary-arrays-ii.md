## Intuition
A stable array is characterized by its ending bit and the maximum run length.
The second reference uses the same two-dimensional recurrence as the first, with a window subtraction that removes arrays whose final run exceeded the limit.

## Brute force
Enumerating all arrangements of the zero and one counts grows combinatorially.
Dynamic programming stores each count pair once and avoids generating the strings.

## Approach
1. Seed `ending_zero` and `ending_one` for arrays containing only one bit within the limit.
2. Build each zero-ending cell from both previous ending states and subtract the state just outside the allowed run.
3. Build one-ending cells symmetrically.
4. Add the two states at `(zero,one)` modulo the required modulus.

## Walkthrough
For local Example 1 `(zero,one,limit) = (2,1,1)`, the valid sequence is `010`.
The state ending in zero receives the arrangement after appending the final zero, while the state ending in one represents sequences such as `01` before that final append.
The final sum is 1.

## Complexity
The tables contain O(ZO) cells and each transition is constant time.
The time and auxiliary space are O(ZO), with no output strings stored.

## Edge cases
When all bits are the same, the limit alone decides whether a sequence exists.
When `limit` is one, every adjacent pair must alternate.
Modulo subtraction must remain nonnegative before the next state is used.

## Common mistakes
Using a simple two-state recurrence without subtraction counts runs longer than the limit.
Subtracting from the wrong ending table removes sequences with the wrong final bit.
Treating this count as a set of unique strings loses multiplicity across different arrangements.

## Language notes
Python and Java implementations intentionally mirror each other so their recurrence and memory costs agree.
Java uses long cells to hold intermediate sums before applying the modulus.
