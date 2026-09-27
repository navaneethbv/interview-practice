# Best Time to Buy and Sell Stock Using Strategy

Each day's contribution is prices[i] multiplied by strategy[i], where -1 means buying, 0 means holding, and 1 means selling.
You may modify at most one contiguous block of exactly k days: replace its first half by zeros and its second half by ones.
Return the greatest resulting sum of contributions.
There are no ownership or budget restrictions on these actions.

## Examples

### Example 1

```text
Input: prices = [4, 2, 8], strategy = [-1, 0, 1], k = 2
Output: 10
Explanation: Modify the first two days to 0 and 1, leaving contributions 0,2,8.
```

### Example 2

```text
Input: prices = [5, 4, 3], strategy = [1, 1, 0], k = 2
Output: 9
Explanation: Keeping the original strategy is best.
```

## Constraints

- 2 <= prices.length == strategy.length <= 100000.
- 1 <= prices[i] <= 100000.
- strategy[i] is -1, 0, or 1.
- k is even and 2 <= k <= prices.length.
