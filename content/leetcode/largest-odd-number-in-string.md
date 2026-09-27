# Largest Odd Number in String

Return the numerically largest odd integer that appears as a nonempty contiguous substring of decimal string num.
Return the empty string if none exists.

## Examples

### Example 1

```text
Input: num = "35420"
Output: "35"
Explanation: The longest prefix ending in an odd digit gives the largest odd value.
```

### Example 2

```text
Input: num = "4206"
Output: ""
Explanation: There is no odd digit to end an odd integer.
```

## Constraints

- 1 <= num.length <= 100,000
- num has no leading zeros.
