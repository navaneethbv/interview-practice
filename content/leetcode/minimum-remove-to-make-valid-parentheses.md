# Minimum Remove to Make Valid Parentheses

Delete the fewest parentheses necessary to leave a balanced string.
Keep every lowercase letter and preserve the relative order of all retained characters.
Return any result using the minimum number of deletions.

## Examples

### Example 1

```text
Input: s = "a)b(c)d"
Output: "ab(c)d"
Explanation: Delete the unmatched closing parenthesis.
```

### Example 2

```text
Input: s = "))(("
Output: ""
Explanation: All four parentheses are unmatched.
```

## Constraints

- 1 <= s.length <= 100,000
- s contains lowercase English letters, (, and ).
