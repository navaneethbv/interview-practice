# Best Time to Buy and Sell Stock

Each entry in `prices` is a stock price on that day.
Choose one day to buy and a later day to sell, maximizing your profit.
Return 0 when no profitable transaction exists.

## Examples

### Example 1

```text
Input: prices = [8, 3, 6, 1, 7]
Output: 6
Explanation: Buying at 1 and later selling at 7 earns 6.
```

### Example 2

```text
Input: prices = [9, 6, 4]
Output: 0
Explanation: Every later price is lower.
```

## Constraints

- 1 <= prices.length <= 100,000
- 0 <= prices[i] <= 10,000
