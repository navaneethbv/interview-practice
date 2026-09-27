# Number of Matching Subsequences

Count how many entries in words are subsequences of s.
A subsequence preserves character order but may skip characters.
Repeated entries in words count separately.

## Examples

### Example 1

```text
Input: s = "abcde", words = ["a", "bb", "acd", "ace"]
Output: 3
Explanation: a, acd, and ace preserve their character order.
```

### Example 2

```text
Input: s = "aaa", words = ["a", "a", "aa", "aaaa"]
Output: 3
Explanation: The two copies of a count separately; aaaa is too long.
```

## Constraints

- 1 <= s.length <= 50000.
- 1 <= words.length <= 5000.
- 1 <= words[i].length <= 50.
- All strings contain lowercase English letters.
