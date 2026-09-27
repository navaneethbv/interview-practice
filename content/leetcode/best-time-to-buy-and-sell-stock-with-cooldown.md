# Best Time to Buy and Sell Stock with Cooldown

Buy and sell a stock any number of times to maximize profit, holding at most one share at a time.
After selling, you must spend the next day without buying.
Each entry of `prices` is the price on that day.
Return the largest profit, allowing no transactions.

## Examples

### Example 1

```text
Input: prices = [1, 2, 3, 0, 2]
Output: 3
Explanation: Buy at 1, sell at 2, rest, buy at 0, and sell at 2.
```

### Example 2

```text
Input: prices = [5, 4, 3]
Output: 0
Explanation: No sale can yield a profit.
```

## Constraints

- 1 <= prices.length <= 5,000
- 0 <= prices[i] <= 1,000
