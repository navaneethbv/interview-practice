## Intuition

If the last coin has value `coin`, the remaining amount is `value - coin`.
The best solution for `value` is one coin plus the best reachable solution for one of those smaller amounts.
Positive denominations ensure these dependencies always point backward.

## Brute force

Recursively try every possible next coin until reaching zero or going below zero.
This can take exponential time as many different choice sequences revisit the same remaining amount.
Memoization or bottom-up dynamic programming computes each amount once.

## Approach

1. Define `dp[value]` as the fewest coins needed for `value`.
2. Initialize `dp[0] = 0` and all other states to the unreachable sentinel `amount + 1`.
3. Process `value` from 1 through `amount`.
4. For each denomination no larger than `value`, minimize `dp[value]` with `dp[value - coin] + 1`.
5. Return `dp[amount]` if it is at most `amount`; otherwise return -1.

Any reachable amount uses at most that many coins because denominations are positive integers.
Thus the sentinel is larger than every valid answer, and adding to an unreachable state cannot incorrectly improve a state.

## Walkthrough

Example 1 uses `coins = [1, 3, 4]` and `amount = 6`.

| `value` | Best final coin choice | `dp[value]` |
| --- | --- | --- |
| 0 | Empty selection | 0 |
| 1 | 1 | 1 |
| 2 | 1 after amount 1 | 2 |
| 3 | 3 | 1 |
| 4 | 4 | 1 |
| 5 | 1 after amount 4 | 2 |
| 6 | 3 after amount 3 | 2 |

Choosing the largest coin first would use `4 + 1 + 1`, but the DP finds `3 + 3`.

## Complexity

- Time: O(amount × c), where c is the number of denominations.
- Space: O(amount), for the DP array.

## Edge cases

Amount zero returns zero immediately after initialization.
An amount unreachable with the available denominations retains the sentinel and returns -1.
Coins larger than the requested amount are skipped before any array indexing.
Unlimited supply is handled by reusing completed smaller states.

## Common mistakes

- Greedily taking the largest coin fails for general denominations.
- Initializing every state to zero makes unreachable amounts look solved.
- Restricting each coin to one use solves a different problem.

## Language notes

Both implementations use the same DP and bounded integer sentinel.
Java can receive denominations as large as `Integer.MAX_VALUE`, but checks `coin <= value` before subtraction.
Python uses a list while Java initializes its array with `Arrays.fill` and then resets the zero state.
