# Rotate String

A rotation moves the first character to the end while preserving the order of the others.
Return whether zero or more rotations can turn s into goal.

## Examples

### Example 1

```text
Input: s = "abcde", goal = "cdeab"
Output: true
Explanation: Two rotations move a and b to the end.
```

### Example 2

```text
Input: s = "abcde", goal = "abced"
Output: false
Explanation: Rotating cannot exchange only the last two characters.
```

## Constraints

- 1 <= s.length, goal.length <= 100.
- The strings contain lowercase English letters.
