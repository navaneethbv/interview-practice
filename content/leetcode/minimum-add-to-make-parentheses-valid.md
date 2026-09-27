# Minimum Add to Make Parentheses Valid

Return the fewest parentheses that must be inserted anywhere in `s` to make it balanced.
Existing characters must keep their order.

## Examples

### Example 1

```text
Input: s = "())"
Output: 1
Explanation: Insert one opening parenthesis before the unmatched close.
```

### Example 2

```text
Input: s = "((("
Output: 3
Explanation: Each opening parenthesis needs a closing match.
```

## Constraints

- 1 <= s.length <= 1,000
- s contains only ( and ).
