# Valid Parenthesis String

Determine whether `s` can represent a balanced sequence of parentheses.
Every * may independently stand for (, ), or an empty string.
A balanced sequence never closes a parenthesis before opening it and has no unclosed parentheses at the end.

## Examples

### Example 1

```text
Input: s = "(*))"
Output: true
Explanation: Let the star be an opening parenthesis.
```

### Example 2

```text
Input: s = ")*("
Output: false
Explanation: The initial closing parenthesis cannot be matched.
```

## Constraints

- 1 <= s.length <= 100
- s contains only (, ), and *.
