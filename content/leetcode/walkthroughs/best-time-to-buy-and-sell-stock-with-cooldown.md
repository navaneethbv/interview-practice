## Intuition

On each day, the trader is either holding a stock, has just sold, or is resting.
Buying after a sale is forbidden on the next day, so the holding transition must come from resting rather than sold.
Keeping the best value for each state is enough because future choices depend only on the current state and price.

## Brute force

Enumerating buy, sell, rest, and cooldown decisions over n days creates an exponential decision tree.
The three state values merge all prefixes that end in the same holding, sold, or resting state, giving O(n) time and O(1) space.
## Approach

1. Initialize holding with buying on day zero, sold as unreachable, and resting at zero.
2. For each later price, compute the next holding, sold, and resting values.
3. Holding is the better of keeping the stock or buying from resting.
4. Sold means selling the previously held stock.
5. Resting is the better of resting again or completing the cooldown after a sale.
6. Return the better of sold and resting after the final day.

The state updates use old values together, so a sale cannot be reused for a same-day purchase.

## Walkthrough

Example 1 uses prices = [1, 2, 3, 0, 2].

| price | holding | sold | resting |
| ---: | ---: | ---: | ---: |
| 1 | -1 | unreachable | 0 |
| 2 | -1 | 1 | 0 |
| 3 | -1 | 2 | 1 |
| 0 | 1 | -1 | 2 |
| 2 | 1 | 3 | 2 |

The final best profit is 3, from selling at price 2, cooling down, buying at 0, and selling at 2.

## Complexity

For n prices, each day performs constant work, so time is O(n).
Only three state values are retained, giving O(1) auxiliary space.

## Edge cases

A single price cannot produce a profit and returns zero through resting.
Repeated prices can leave all states unchanged.
The first day cannot be in sold state.
The cooldown is enforced only after a sale, not after buying.

## Common mistakes

- Buying from sold on the next day violates the cooldown.
- Returning holding allows an unfinished transaction to count as profit.
- Updating states in place can let one day perform two actions.
- Forgetting that resting can follow either resting or sold loses valid cooldown transitions.

## Language notes

Python uses negative infinity for an unreachable sold state.
Java uses Integer.MIN_VALUE as the same sentinel under bounded prices.
Both compute next state variables before overwriting the old ones.
