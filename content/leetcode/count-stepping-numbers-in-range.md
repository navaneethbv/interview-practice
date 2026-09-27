# Count Stepping Numbers in Range

A positive integer is a stepping number when every pair of neighboring decimal digits differs by exactly 1.
Count stepping numbers in the inclusive interval from low to high, which are given as decimal strings.
Return the count modulo 1,000,000,007.

## Examples

### Example 1

```text
Input: low = "1", high = "20"
Output: 11
Explanation: The values 1 through 9, 10, and 12 qualify.
```

### Example 2

```text
Input: low = "21", high = "21"
Output: 1
Explanation: The digits of 21 differ by one.
```

## Constraints

- 1 <= integer value of low <= integer value of high < 10^100
- Neither bound has leading zeroes.
