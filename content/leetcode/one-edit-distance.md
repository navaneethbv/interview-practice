# One Edit Distance

Return whether exactly one insertion, deletion, or replacement of a single character transforms `s` into `t`.
Identical strings have edit distance zero and must return false.

## Constraints

- `0 <= s.length, t.length <= 10000`.
- Strings contain ASCII letters and digits.

## Examples

### Example 1

```text
Input: s = "cat", t = "cart"
Output: true
Explanation: Insert r before the final t.
```

### Example 2

```text
Input: s = "same", t = "same"
Output: false
Explanation: No edit is needed.
```
