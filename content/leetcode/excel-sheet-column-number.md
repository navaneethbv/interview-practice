# Excel Sheet Column Number

Convert an Excel-style column label to its one-based integer index.
A through Z represent 1 through 26; the next labels are AA, AB, and so on.

## Constraints

- columnTitle contains 1 to 7 uppercase English letters.
- Its numeric value is at most 2147483647.

## Examples

### Example 1

```text
Input: columnTitle = "AZ"
Output: 52
Explanation: A contributes 26 and Z contributes 26.
```

### Example 2

```text
Input: columnTitle = "BA"
Output: 53
Explanation: B contributes 52 and A contributes 1.
```
