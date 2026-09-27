# Coin Change II

Count how many combinations of the distinct coin denominations in `coins` total exactly `amount`.
You can use a denomination any number of times.
Order does not distinguish combinations.
Amount 0 has one combination: selecting no coins.

## Examples

### Example 1

```text
Input: amount = 5, coins = [1, 2, 5]
Output: 4
Explanation: Use 5, 2+2+1, 2+1+1+1, or five 1s.
```

### Example 2

```text
Input: amount = 3, coins = [2]
Output: 0
Explanation: No number of 2-value coins totals 3.
```

## Constraints

- 0 <= amount <= 5,000
- 1 <= coins.length <= 300
- 1 <= coins[i] <= 5,000; denominations are distinct.
- The answer fits a signed 32-bit integer.
