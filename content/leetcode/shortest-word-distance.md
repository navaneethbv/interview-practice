# Shortest Word Distance

Find the minimum absolute difference between indices of `word1` and `word2` in `wordsDict`.
The two target words differ and both occur in the input.

## Constraints

- `2 <= wordsDict.length <= 30000`.
- Words contain 1 to 10 lowercase English letters.

## Examples

### Example 1

```text
Input: wordsDict = ["red", "blue", "green", "red"], word1 = "red", word2 = "green"
Output: 1
Explanation: The final red is adjacent to green.
```

### Example 2

```text
Input: wordsDict = ["a", "x", "x", "b"], word1 = "a", word2 = "b"
Output: 3
Explanation: The target indices are 0 and 3.
```
