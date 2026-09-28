# Custom Brackets

Each string in `brackets` has two characters: an opening bracket and its matching closing bracket.
No character appears in more than one position across `brackets`, and characters not listed do not matter.
Return whether `s` is balanced: every closer matches the most recent unmatched opener of its type, and nothing is left open.

## Examples

### Example 1

```text
Input: s = "((a+b)*[c-d]-{e/f})", brackets = ["()", "[]", "{}"]
Output: true
```

### Example 2

```text
Input: s = "([)]", brackets = ["()", "[]", "{}"]
Output: false
```

## Constraints

- `0 <= s.length <= 10^5`
- `0 <= brackets.length <= 10`
