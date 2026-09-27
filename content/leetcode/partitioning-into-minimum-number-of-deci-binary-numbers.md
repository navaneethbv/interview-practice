# Partitioning Into Minimum Number Of Deci-Binary Numbers

A positive decimal number is deci-binary when every digit is 0 or 1.
Return the minimum number of positive deci-binary numbers whose sum equals the decimal number represented by n.

## Examples

### Example 1

```text
Input: n = "32"
Output: 3
Explanation: Use 10 + 11 + 11.
```

### Example 2

```text
Input: n = "11"
Output: 1
Explanation: The input is already deci-binary.
```

## Constraints

- 1 <= n.length <= 100,000
- n contains decimal digits, has no leading zeros, and is positive.
