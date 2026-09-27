# Best Time to Buy and Sell Stock with Transaction Fee

Trade a stock any number of times while holding at most one share.
Each completed buy-and-sell transaction costs `fee` once.
Return the maximum total profit, or zero if trading is unprofitable.

## Constraints

- `1 <= prices.length <= 50000`.
- Prices are between 1 and 50000; `0 <= fee < 50000`.

## Examples

### Example 1

```text
Input: prices = [1, 5, 2, 8], fee = 2
Output: 6
Explanation: The two trades earn 2 and 4 after fees.
```

### Example 2

```text
Input: prices = [5, 4, 3], fee = 1
Output: 0
Explanation: Skipping all trades is optimal.
```
