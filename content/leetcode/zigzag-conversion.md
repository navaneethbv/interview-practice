# Zigzag Conversion

Write the characters of s down a set of rows, then diagonally upward, repeating this zigzag until the string is exhausted.
Return the text obtained by reading the rows from top to bottom.

## Examples

### Example 1

```text
Input: s = "ABCDEFG", numRows = 3
Output: "AEBDFCG"
Explanation: The rows contain AE, BDF, and CG.
```

### Example 2

```text
Input: s = "ABCD", numRows = 1
Output: "ABCD"
Explanation: A single row preserves the input order.
```

## Constraints

- 1 <= s.length <= 1000.
- 1 <= numRows <= 1000.
- s contains English letters, commas, or periods.
