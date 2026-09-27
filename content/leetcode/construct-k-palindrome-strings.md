# Construct K Palindrome Strings

Use every character of s exactly once to build exactly k nonempty palindrome strings.
You may rearrange the characters freely.
Return whether this is possible.

## Examples

### Example 1

```text
Input: s = "annabelle", k = 2
Output: true
Explanation: For example, the characters can form anna and elble.
```

### Example 2

```text
Input: s = "abc", k = 2
Output: false
Explanation: Three odd-frequency letters require at least three palindromes.
```

## Constraints

- 1 <= s.length <= 100000.
- 1 <= k <= 100000.
- s contains lowercase English letters.
