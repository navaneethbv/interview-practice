# Roman to Integer

Convert a valid Roman numeral to an integer.
The symbols I, V, X, L, C, D, M represent 1, 5, 10, 50, 100, 500, 1000.
The pairs IV, IX, XL, XC, CD, CM subtract the smaller symbol from the larger one.

## Examples

### Example 1

```text
Input: s = "XIV"
Output: 14
Explanation: X contributes 10 and IV contributes 4.
```

### Example 2

```text
Input: s = "MCMXCIV"
Output: 1994
Explanation: Add 1000, 900, 90, and 4.
```

## Constraints

- 1 <= s.length <= 15
- s is a valid standard Roman numeral for an integer from 1 through 3,999.
