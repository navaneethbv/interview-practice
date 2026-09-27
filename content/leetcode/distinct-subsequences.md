# Distinct Subsequences

Count how many ways characters can be deleted from `s` to leave exactly `t`.
The remaining characters keep their order.
Different selected index sets count separately, even if they spell the same string.

## Examples

### Example 1

```text
Input: s = "babgbag", t = "bag"
Output: 5
Explanation: There are five increasing index choices spelling bag.
```

### Example 2

```text
Input: s = "aaa", t = "aa"
Output: 3
Explanation: Choose any two of the three positions.
```

## Constraints

- 1 <= s.length, t.length <= 1,000
- Both strings contain English letters.
- The answer fits a signed 32-bit integer.
