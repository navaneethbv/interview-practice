## Intuition
The winning property depends only on whether n is even or odd.
From an even value, subtracting one leaves an odd value for the opponent.
From an odd value, every legal divisor is odd, so every move leaves an even value.

## Brute force
Build a table recording whether each value from one through n is winning.
For each current value, try every smaller positive number, keep the divisors, and check whether any move reaches a losing state.
This straightforward dynamic program takes O(n^2) time and O(n) space.
The parity argument summarizes the entire table with one test.

## Approach
1. Use n equal to one as the losing base case: it has no positive proper divisor.
2. Observe inductively that every even value can move to a smaller odd, losing value by subtracting one.
3. Observe that every odd value can move only to a smaller even, winning value.
4. Return whether the remainder of n divided by two is zero.

The induction is valid because every legal move strictly reduces n.
For even n, it is enough that one winning strategy exists; subtracting one supplies that strategy.
For odd n, all possible moves must be considered, and the odd-divisor property shows that none can avoid giving the opponent a winning state.

## Walkthrough
Example 1 starts with `n = 2`.
The only positive proper divisor is 1.
Alice subtracts it, producing `n = 1` for Bob.
Bob cannot choose a positive divisor smaller than one, so he loses.
The implementation obtains the same answer immediately: `2 % 2` is zero, and the return value is true.
There is no need to simulate that move in the reference code.

## Complexity
The references perform one remainder operation and comparison, giving O(1) time under the fixed integer constraints.
They retain no table, recursive calls, or move history, so auxiliary space is O(1).

## Edge cases
At n equal to one, the result is false because Alice has no move.
At n equal to two, subtracting one wins immediately.
Larger odd numbers may have several divisors, but every such divisor is still odd, preserving the proof.

## Common mistakes
- Allowing x equal to n violates the proper-divisor rule.
- Searching only prime divisors omits legal moves without helping the proof.
- Treating the existence of any divisor as a win ignores the opponent's optimal reply.

## Language notes
Python and Java both evaluate the same parity expression directly.
The positive-input guarantee avoids any need to discuss language differences for remainders of negative values.
