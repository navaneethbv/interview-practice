# Determine if Two Strings Are Close

You may swap any two positions in a string or globally exchange all occurrences of two characters that already exist in that string.
Return whether these operations can transform word1 into word2.

## Constraints

- Each word has length 1 to 100000.
- Both contain lowercase English letters.

## Examples

### Example 1

```text
Input: word1 = "aab", word2 = "abb"
Output: true
Explanation: Globally exchanging a and b changes the counts to match.
```

### Example 2

```text
Input: word1 = "a", word2 = "b"
Output: false
Explanation: A character not already present cannot be introduced.
```
