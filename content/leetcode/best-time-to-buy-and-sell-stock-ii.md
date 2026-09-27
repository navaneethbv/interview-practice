# Best Time to Buy and Sell Stock II

You may buy and sell a stock any number of times, but can hold at most one share at a time.
The array gives the share price on successive days.
Return the largest total profit you can realize, including zero if trading is unhelpful.

## Examples

### Example 1

```text
Input: prices = [2, 5, 1, 4]
Output: 6
Explanation: Profit 3 on each of two separate trades.
```

### Example 2

```text
Input: prices = [5, 4, 2]
Output: 0
Explanation: Every later price is lower.
```

## Constraints

- 1 <= prices.length <= 30000.
- 0 <= prices[i] <= 10000.
