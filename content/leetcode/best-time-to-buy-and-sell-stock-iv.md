# Best Time to Buy and Sell Stock IV

Return the maximum profit from at most `k` buy-then-sell transactions over `prices`.
Hold at most one share at a time; a sale must follow its purchase.
You may choose to make no trades.

## Constraints

- `1 <= k <= 100`.
- `1 <= prices.length <= 1000`.
- Prices range from 0 to 1000.

## Examples

### Example 1

```text
Input: k = 2, prices = [1, 4, 2, 6]
Output: 7
Explanation: Buy at 1 and sell at 4, then buy at 2 and sell at 6.
```

### Example 2

```text
Input: k = 1, prices = [5, 4, 3]
Output: 0
Explanation: No profitable sale is available.
```
