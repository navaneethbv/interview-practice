# Remove Invalid Parentheses

Delete the fewest parentheses needed to make s balanced, leaving all letters intact and in order.
Return every distinct valid string obtainable with that minimum number of deletions.
A balanced string never has more closing than opening parentheses in a prefix and has equal total counts.

## Examples

### Example 1

```text
Input: s = "()())()"
Output: ["(())()", "()()()"]
Explanation: One closing parenthesis must be removed.
```

### Example 2

```text
Input: s = ")("
Output: [""]
Explanation: Both parentheses must be removed.
```

## Constraints

- 1 <= s.length <= 25.
- s contains lowercase letters and parentheses, with at most 20 parentheses.
