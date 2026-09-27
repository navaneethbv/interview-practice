# Longest Common Subsequence

Return the length of the longest sequence of characters that occurs as a subsequence in both strings.
A subsequence preserves order but may skip characters.
Return 0 when the strings share no character.

## Examples

### Example 1

```text
Input: text1 = "abcde", text2 = "ace"
Output: 3
Explanation: The common subsequence ace has length 3.
```

### Example 2

```text
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: The strings have no shared character.
```

## Constraints

- 1 <= text1.length, text2.length <= 1,000
- Both strings contain only lowercase English letters.
