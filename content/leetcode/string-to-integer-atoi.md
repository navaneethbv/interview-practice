# String to Integer (atoi)

Parse a signed decimal integer from the beginning of `s` after skipping leading spaces.
Read one optional + or - sign, then consecutive decimal digits until another character or the end.
Ignore the remaining suffix.
Return 0 if no digits were read, and clamp values outside the signed 32-bit range to its nearest endpoint.

## Examples

### Example 1

```text
Input: s = "   -42rest"
Output: -42
Explanation: Skip spaces, read the sign and digits, and stop at r.
```

### Example 2

```text
Input: s = "words 12"
Output: 0
Explanation: The first non-space character cannot start a number.
```

## Constraints

- 0 <= s.length <= 200
- s may contain English letters, decimal digits, spaces, +, -, and .
