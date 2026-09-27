## Intuition
At each index, the final partition ends with a block of length from 1 through `k`.
If the block begins at `start` and has maximum `block_max`, its contribution is `block_max * length` plus the best score before `start`.
Dynamic programming stores exactly that best prefix score.

## Brute force
Trying every partitioning of the array is exponential because each boundary can be selected or skipped.
A memoized recursion has the same states as the iterative dynamic program but more call overhead.

## Approach

1. Let `dp[i]` be the best total for the first `i` entries.
2. For each endpoint, extend a candidate block backward up to `k` entries.
3. Maintain the block maximum while extending.
4. Update `dp[i]` with the preceding score plus block maximum times block length.
5. Return `dp[n]`.

## Walkthrough

For Example 1, `[1,15,7,9,2,5,10]` and `k = 3`, consider the first three entries.
Taking `[1,15,7]` gives maximum 15 and contribution 45, while shorter choices preserve more prefix structure.
A best final arrangement is `[1,15,7]`, `[9]`, `[2,5,10]`, contributing 45, 9, and 30 for total 84.
The DP reaches 84 by combining the state before each selected block with its block contribution.
When `k = 1`, each state has one candidate, so the array remains unchanged.

## Complexity
For every endpoint, at most `k` previous lengths are tested.
Time is O(nk), and the `dp` array uses O(n) space.
The running maximum avoids rescanning each candidate block.

## Edge cases
When `k = 1`, every block has one element.
When `k = n`, one block is allowed, but shorter blocks are still considered.
Zero values contribute zero for their positions without changing the recurrence.

## Common mistakes
Use the maximum of the current block for every element in that block.
Do not multiply the block maximum by the wrong length.
Define `dp[0] = 0` so a block beginning at the first element is valid.

## Language notes
Python uses a list of integer states.
Java uses an integer DP array, with a wide intermediate product if required by the input bounds.
