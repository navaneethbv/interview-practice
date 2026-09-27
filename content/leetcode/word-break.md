# Word Break

Determine whether `s` can be split into one or more nonempty words from `wordDict`.
A dictionary word may be reused, and the split must account for every character.

## Examples

### Example 1

```text
Input: s = "rainbowrain", wordDict = ["rain", "bow"]
Output: true
Explanation: Split the string into rain, bow, and rain.
```

### Example 2

```text
Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false
Explanation: No sequence of dictionary words consumes the entire string.
```

## Constraints

- 1 <= s.length <= 300
- 1 <= wordDict.length <= 1,000
- 1 <= wordDict[i].length <= 20
- All strings contain lowercase English letters; dictionary words are distinct.
