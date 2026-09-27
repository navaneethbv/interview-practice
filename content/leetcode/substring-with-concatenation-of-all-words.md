# Substring with Concatenation of All Words

Return starting indices of substrings formed by concatenating every entry in `words` exactly once, in any order and without gaps.
Words have equal lengths and repeated entries must be used with their full multiplicity.
Return indices in any order.

## Constraints

- `1 <= s.length <= 10000`.
- `1 <= words.length <= 5000`.
- All words have the same length between 1 and 30.
- All characters are lowercase English letters.

## Examples

### Example 1

```text
Input: s = "catdogcat", words = ["cat", "dog"]
Output: [0, 3]
Explanation: The two valid windows use one cat and one dog each.
```

### Example 2

```text
Input: s = "aaaaaa", words = ["aa", "aa"]
Output: [0, 1, 2]
Explanation: Overlapping windows are allowed.
```
