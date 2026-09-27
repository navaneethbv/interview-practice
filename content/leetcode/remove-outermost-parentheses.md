# Remove Outermost Parentheses

Split the balanced parentheses string into the shortest consecutive nonempty balanced pieces.
Remove the outermost opening and closing parenthesis from each piece, then concatenate what remains.

## Examples

### Example 1

```text
Input: s = "(()())(())"
Output: "()()()"
Explanation: Remove one enclosing pair from each of the two pieces.
```

### Example 2

```text
Input: s = "()()"
Output: ""
Explanation: Both pieces become empty.
```

## Constraints

- 1 <= s.length <= 100000.
- s contains only parentheses and is balanced.
