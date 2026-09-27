# Coin Change

You have an unlimited supply of each positive denomination in `coins`.
Return the fewest coins needed to total exactly `amount`, or -1 if no combination can do so.
Making amount 0 requires no coins.

## Examples

### Example 1

```text
Input: coins = [1, 3, 4], amount = 6
Output: 2
Explanation: Two coins of value 3 make 6.
```

### Example 2

```text
Input: coins = [4, 6], amount = 7
Output: -1
Explanation: Even denominations cannot produce an odd total.
```

## Constraints

- 1 <= coins.length <= 12
- 1 <= coins[i] <= 2^31 - 1
- 0 <= amount <= 10,000
