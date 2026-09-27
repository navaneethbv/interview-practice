# Find All Possible Stable Binary Arrays II

Count binary arrays containing exactly zero zeroes and one ones, with no run of equal bits longer than limit.
Return the count modulo 1,000,000,007.

## Examples

### Example 1

```text
Input: zero = 2, one = 1, limit = 1
Output: 1
Explanation: Only 010 has no equal neighboring bits.
```

### Example 2

```text
Input: zero = 2, one = 2, limit = 2
Output: 6
Explanation: Every arrangement of two zeroes and two ones is allowed.
```

## Constraints

- 1 <= zero, one, limit <= 1000
