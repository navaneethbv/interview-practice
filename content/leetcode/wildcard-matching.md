# Wildcard Matching

Determine whether pattern `p` matches all of `s`.
A ? matches any one character and a * matches any sequence, including empty.
Lowercase letters match themselves.

## Examples

### Example 1

```text
Input: s = "adceb", p = "*a*b"
Output: true
Explanation: The stars can supply an empty prefix and dce.
```

### Example 2

```text
Input: s = "acdcb", p = "a*c?b"
Output: false
Explanation: No complete assignment to the wildcards matches the string.
```

## Constraints

- 0 <= s.length, p.length <= 2,000
- s contains lowercase letters; p contains lowercase letters, ?, and *.
