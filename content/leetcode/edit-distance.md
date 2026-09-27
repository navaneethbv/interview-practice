# Edit Distance

Return the fewest single-character edits needed to transform `word1` into `word2`.
An edit may insert a character, delete a character, or replace a character.

## Examples

### Example 1

```text
Input: word1 = "cat", word2 = "cut"
Output: 1
Explanation: Replace a with u.
```

### Example 2

```text
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: One route is horse, rorse, rose, ros.
```

## Constraints

- 0 <= word1.length, word2.length <= 500
- Both strings contain lowercase English letters.
