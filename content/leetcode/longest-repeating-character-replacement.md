# Longest Repeating Character Replacement

Choose a contiguous substring of uppercase `s`.
You may replace at most `k` of its characters with other uppercase letters.
Return the largest substring length that can become a single repeated letter.

## Constraints

- `1 <= s.length <= 100000`.
- `s` contains uppercase English letters.
- `0 <= k <= s.length`.

## Examples

### Example 1

```text
Input: s = "ABBBAC", k = 1
Output: 4
Explanation: Changing the first A makes ABBB into BBBB.
```

### Example 2

```text
Input: s = "ABCDE", k = 0
Output: 1
Explanation: Without replacements, only one-character substrings qualify.
```
