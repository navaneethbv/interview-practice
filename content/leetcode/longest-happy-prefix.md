# Longest Happy Prefix

Return the longest proper prefix of s that is also its suffix.
The prefix and suffix may overlap, but the entire string is excluded.
Return an empty string when no nonempty match exists.

## Examples

### Example 1

```text
Input: s = "level"
Output: "l"
Explanation: The one-letter prefix and suffix match.
```

### Example 2

```text
Input: s = "ababab"
Output: "abab"
Explanation: The longest matching proper prefix and suffix overlap.
```

## Constraints

- 1 <= s.length <= 100,000
- s contains lowercase English letters.
