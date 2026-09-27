## Intuition

If today is the selling day, the best buying price is the smallest earlier price.
Keep that price in `low` and the largest profit found so far in `best`.
A single scan evaluates every possible selling day without revisiting earlier days.

## Brute force

Try every buy day with every later sell day and retain the largest positive difference.
This requires O(n²) time and O(1) space, which is too slow for 100,000 prices.

## Approach

1. Use a greedy running minimum, initializing `low` to the first price and `best` to zero.
2. For each `price`, update `best` with `price - low` if it is larger.
3. Update `low` to the smaller of itself and `price`.
4. Return `best` after the scan.

On the first iteration the candidate profit is zero.
On every later iteration `low` represents an earlier day, so any positive candidate respects the required buying-before-selling order.
Updating `low` afterward prepares the next iteration without losing profits achievable today.

## Walkthrough

Example 1 has `prices = [8, 3, 6, 1, 7]`.

| `price` | Earlier `low` | Candidate profit | New `best` | New `low` |
| --- | --- | --- | --- | --- |
| 8 | 8 | 0 | 0 | 8 |
| 3 | 8 | -5 | 0 | 3 |
| 6 | 3 | 3 | 3 | 3 |
| 1 | 3 | -2 | 3 | 1 |
| 7 | 1 | 6 | 6 | 1 |

The final sale at 7 uses the earlier price 1, producing the answer 6.

## Complexity

- Time: O(n), with constant work per price.
- Space: O(1), because only `low` and `best` persist between iterations.

## Edge cases

A decreasing sequence never improves `best`, so the answer stays zero.
One price also returns zero because no profitable transaction exists.
Equal prices and zero prices require no special handling.
The references require the nonempty input guaranteed by the statement.

## Common mistakes

- Subtracting the global minimum from the global maximum can sell before buying.
- Accumulating every positive daily difference allows multiple transactions.
- Initializing `best` to a negative number can return a loss instead of choosing no trade.

## Language notes

Both versions use the same two scalar variables and leave `prices` unchanged.
Java `int` safely holds all differences under the stated 0 through 10,000 price bounds.
Python's integer arithmetic has no fixed-width overflow, but no larger arithmetic is needed here.
