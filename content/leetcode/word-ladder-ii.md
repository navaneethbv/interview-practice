# Word Ladder II

Return every shortest sequence that changes `beginWord` into `endWord` one letter at a time.
Every word after the starting word must occur in `wordList`.
Keep word order within each sequence; the sequence list may be in any order.
Return an empty list if no transformation exists.

## Examples

### Example 1

```text
Input: beginWord = "hit", endWord = "cog", wordList = ["hot", "dot", "dog", "lot", "log", "cog"]
Output: [["hit", "hot", "dot", "dog", "cog"], ["hit", "hot", "lot", "log", "cog"]]
Explanation: Both displayed routes have the minimum of five words.
```

### Example 2

```text
Input: beginWord = "a", endWord = "c", wordList = ["a", "b", "c"]
Output: [["a", "c"]]
Explanation: A direct one-letter change is shortest.
```

## Constraints

- 1 <= word length <= 5
- All words have the same length and use lowercase English letters.
- 1 <= wordList.length <= 500; its words are unique.
- beginWord differs from endWord.
