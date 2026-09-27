# Regular Expression Matching

Determine whether the entire string `s` matches pattern `p`.
A lowercase letter matches itself, . matches any single character, and * means zero or more repetitions of the immediately preceding letter or dot.
Matching only part of `s` is insufficient.

## Examples

### Example 1

```text
Input: s = "aab", p = "c*a*b"
Output: true
Explanation: Use zero c characters, two a characters, and one b.
```

### Example 2

```text
Input: s = "ab", p = ".*c"
Output: false
Explanation: The pattern still requires a final c.
```

## Constraints

- 1 <= s.length, p.length <= 20
- s contains lowercase English letters.
- p contains lowercase letters, . and *; every * follows a letter or dot.
