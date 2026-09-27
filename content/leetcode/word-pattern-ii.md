# Word Pattern II

Determine whether the characters in `pattern` can be mapped bijectively to nonempty substrings so concatenating those substrings in pattern order equals `s`.
Repeated pattern characters use the same substring; different characters must use different substrings.

## Constraints

- Both strings contain 1 to 20 lowercase English letters.

## Examples

### Example 1

```text
Input: pattern = "abab", s = "redblueredblue"
Output: true
Explanation: Map a to red and b to blue.
```

### Example 2

```text
Input: pattern = "ab", s = "aa"
Output: false
Explanation: The only split maps distinct characters to the same substring.
```
