# Longest Balanced Subsequence

Delete as few characters as possible from the parentheses string `s` to make it balanced, and return the result.
To make the answer unique, match greedily: each `)` pairs with the nearest earlier `(` that is still unmatched, and every character left unmatched is deleted.

## Examples

### Example 1

```text
Input: s = "))(())(()"
Output: "(())()"
```

### Example 2

```text
Input: s = "(()()"
Output: "()()"
```

## Constraints

- `0 <= s.length <= 10^5`
