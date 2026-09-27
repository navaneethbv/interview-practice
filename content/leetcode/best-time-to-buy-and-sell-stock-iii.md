# Best Time to Buy and Sell Stock III

Return the largest stock-trading profit achievable using at most two completed buy-then-sell transactions.
You must sell a held share before buying another.
You may also make one transaction or no transactions.

## Examples

### Example 1

```text
Input: prices = [2, 5, 1, 6]
Output: 8
Explanation: Buy at 2 and sell at 5, then buy at 1 and sell at 6.
```

### Example 2

```text
Input: prices = [6, 4, 2]
Output: 0
Explanation: Choose not to trade.
```

## Constraints

- 1 <= prices.length <= 100000.
- 0 <= prices[i] <= 100000.
