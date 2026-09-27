# Backspace String Compare

Type each string into an initially empty editor, interpreting # as deleting the previous character if one exists.
Return whether the final texts are identical.

## Examples

### Example 1

```text
Input: s = "ab#c", t = "ad#c"
Output: true
Explanation: Both editors finish with ac.
```

### Example 2

```text
Input: s = "a#c", t = "b"
Output: false
Explanation: The final texts are c and b.
```

## Constraints

- 1 <= s.length, t.length <= 200
- Both strings contain lowercase English letters and #.
