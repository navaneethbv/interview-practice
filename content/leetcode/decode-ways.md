# Decode Ways

The letters A through Z correspond to the numbers 1 through 26.
Count how many ways the digit string `s` can be split into valid letter codes.
A code cannot begin with 0, so neither 0 nor 06 is valid, while 10 and 20 are valid.
Return 0 if the whole string cannot be decoded.

## Examples

### Example 1

```text
Input: s = "121"
Output: 3
Explanation: The splits are 1|2|1, 12|1, and 1|21.
```

### Example 2

```text
Input: s = "100"
Output: 0
Explanation: Every split leaves an invalid zero code.
```

## Constraints

- 1 <= s.length <= 100
- s contains decimal digits only.
- The answer fits a signed 32-bit integer.
