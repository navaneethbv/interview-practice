# Bulb Switcher

There are n bulbs, initially off, numbered 1 through n.
On round r, toggle every bulb whose number is divisible by r.
After all n rounds, return the number of bulbs that remain on.

## Examples

### Example 1

```text
Input: n = 10
Output: 3
Explanation: Only bulbs 1,4,9 have an odd number of divisors.
```

### Example 2

```text
Input: n = 0
Output: 0
Explanation: There are no bulbs.
```

## Constraints

- 0 <= n <= 1000000000.
