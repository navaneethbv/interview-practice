# Merge Strings Alternately

Take characters alternately from word1 and word2, starting with word1.
Once one string is exhausted, append the remainder of the other.

## Examples

### Example 1

```text
Input: word1 = "abc", word2 = "pqr"
Output: "apbqcr"
Explanation: Alternate one character from each equal-length string.
```

### Example 2

```text
Input: word1 = "ab", word2 = "pqrs"
Output: "apbqrs"
Explanation: Append rs after word1 is exhausted.
```

## Constraints

- 1 <= word1.length, word2.length <= 100
- Both strings contain lowercase English letters.
