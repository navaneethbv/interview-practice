# Isomorphic Strings

Determine whether each character in s can be consistently replaced by one character to produce t.
Different source characters must map to different target characters.
A character is allowed to map to itself.

## Examples

### Example 1

```text
Input: s = "paper", t = "title"
Output: true
Explanation: Map p to t, a to i, e to l, and r to e.
```

### Example 2

```text
Input: s = "ab", t = "aa"
Output: false
Explanation: Two distinct source characters cannot both map to a.
```

## Constraints

- 1 <= s.length == t.length <= 50000.
- The strings contain ASCII characters.
