# Minimum Operations to Sort a String

An operation sorts any nonempty proper substring into alphabetical order.
You cannot select the entire string.
Return the fewest operations needed to sort all of s, or -1 if impossible.

## Examples

### Example 1

```text
Input: s = "acb"
Output: 1
Explanation: Sort the suffix cb.
```

### Example 2

```text
Input: s = "ba"
Output: -1
Explanation: Only one-character substrings can be selected, so nothing changes.
```

## Constraints

- 1 <= s.length <= 100000
- s contains lowercase English letters.
