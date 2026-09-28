# Pattern Matching

`pattern` contains only the letters `a` and `b`.
`value` matches `pattern` when each letter can be replaced by a non-empty string, the same string at every occurrence of that letter, so that the pattern spells out `value`.
The letters `a` and `b` may stand for the same string.
Return whether `value` matches `pattern`.
An empty pattern matches only an empty value.

## Examples

### Example 1

```text
Input: pattern = "aabab", value = "catcatgocatgo"
Output: true
Explanation: a = cat and b = go.
```

### Example 2

```text
Input: pattern = "ab", value = "x"
Output: false
```

## Constraints

- `0 <= pattern.length <= 1,000`
- `0 <= value.length <= 1,000`
- `value` contains lowercase English letters.
