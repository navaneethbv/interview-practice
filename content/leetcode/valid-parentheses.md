# Valid Parentheses

Check whether every bracket in `s` is paired with a later bracket of the same kind, with pairs nested correctly.
Only `()`, `[]`, and `{}` are allowed bracket pairs.

## Constraints

- `1 <= s.length <= 10000`.
- `s` contains only parentheses, square brackets, and braces.

## Examples

### Example 1

```text
Input: s = "{[()]}"
Output: true
Explanation: All three pairs close in reverse opening order.
```

### Example 2

```text
Input: s = "([)]"
Output: false
Explanation: The closing parenthesis crosses the square-bracket pair.
```
