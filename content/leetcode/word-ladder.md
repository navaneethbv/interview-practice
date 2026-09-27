# Word Ladder

Transform `beginWord` into `endWord` by changing exactly one letter per step.
Every word after the starting word must appear in `wordList`.
Return the number of words in the shortest transformation sequence, including its start and end, or 0 if no sequence exists.

## Examples

### Example 1

```text
Input: beginWord = "hit", endWord = "cog", wordList = ["hot", "dot", "dog", "lot", "log", "cog"]
Output: 5
Explanation: One shortest route is hit, hot, dot, dog, cog.
```

### Example 2

```text
Input: beginWord = "a", endWord = "c", wordList = ["a", "b", "c"]
Output: 2
Explanation: Changing a directly to c takes one step and visits two words.
```

## Constraints

- 1 <= beginWord.length <= 10
- All words have the same length and contain lowercase English letters.
- 1 <= wordList.length <= 5,000; its entries are unique.
- beginWord and endWord are different.
