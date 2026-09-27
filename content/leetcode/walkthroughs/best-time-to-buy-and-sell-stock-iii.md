## Intuition

At most two transactions mean that each day can improve four useful states.
`first_buy` is the best balance after buying the first share.
`first_sell` is the best profit after completing the first sale.
`second_buy` is the best balance after buying the second share with the first profit available.
`second_sell` is the best profit after completing both transactions.
Updating these states in order lets a transaction use only information from the current or earlier day.

## Brute force

One brute-force method chooses a buy day and sell day for each of two transactions.
Enumerating both pairs and checking their ordering takes O(n^4) time in a straightforward implementation.
It also repeatedly evaluates the same prefixes and leaves no compact record of the best partial transaction.
The four states store exactly the information that future prices need.

## Approach

1. Start both buy states at negative infinity because no share has been purchased yet.
2. Start both sell states at zero because making fewer than two transactions is allowed.
3. For each `price`, update the first purchase, first sale, second purchase, and second sale in that order.
4. Buying subtracts the price from the best earlier profit.
5. Selling adds the price to the relevant buy state.
6. Taking a maximum preserves the best choice between acting today and keeping yesterday's state.

## Walkthrough

For Example 1, prices are `[2, 5, 1, 6]`.
After price 2, the first purchase balance is -2 and the second purchase balance is -2.
At price 5, `first_sell` becomes 3 and `second_sell` becomes 3.
At price 1, `second_buy` becomes 2 because the first sale profit 3 can fund a purchase at 1.
At price 6, `first_sell` becomes 5 and `second_sell` becomes 8.
Those states describe buying at 2, selling at 5, buying at 1, and selling at 6.
For Example 2, every update leaves the sell states at zero.

## Complexity

The algorithm takes O(n) time and O(1) extra space.
The full state is retained across the scan instead of using an O(n) table.
The final profit fits the signed 32-bit result promised by the problem constraints.

## Edge cases

One price cannot complete a transaction and returns zero.
Repeated prices do not improve any state.
A decreasing sequence keeps both sell states at zero.
The transitions naturally choose one transaction when a second transaction cannot help.

## Common mistakes

Do not update the second purchase before the first sale in the same iteration.
Do not initialize buy states to zero, because that would model receiving money when buying.
Do not force exactly two transactions, since the problem allows zero or one.
Do not use a greedy rule that commits to the first visible peak.

## Language notes

Python uses negative infinity for the impossible buy states.
Java uses `Integer.MIN_VALUE`, and the prices are bounded so the state additions remain safe under the stated return constraints.
Both references expose only the required `maxProfit` method.
