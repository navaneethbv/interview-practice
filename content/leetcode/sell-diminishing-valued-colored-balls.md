# Sell Diminishing-Valued Colored Balls

Each inventory entry is the number of balls of one color.
Selling a ball earns the number of balls of that color currently remaining, then reduces that count by one.
Sell exactly orders balls to maximize revenue and return the revenue modulo 1000000007.

## Examples

### Example 1

```text
Input: inventory = [2, 5], orders = 4
Output: 14
Explanation: Sell from the second color at prices 5,4,3, then sell a ball priced 2.
```

### Example 2

```text
Input: inventory = [3, 3], orders = 2
Output: 6
Explanation: Sell one ball of each color at price 3.
```

## Constraints

- 1 <= inventory.length <= 100000.
- 1 <= inventory[i] <= 1000000000.
- 1 <= orders <= min(sum(inventory), 1000000000).
