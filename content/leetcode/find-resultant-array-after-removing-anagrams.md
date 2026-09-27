# Find Resultant Array After Removing Anagrams

Repeatedly delete a word when it is an anagram of the immediately preceding retained word.
Return the remaining words in their original order.
Anagrams use the same letters with the same counts.

## Examples

### Example 1

```text
Input: words = ["abba", "baba", "bbaa", "cd", "cd"]
Output: ["abba", "cd"]
Explanation: Each consecutive anagram group keeps its first member.
```

### Example 2

```text
Input: words = ["a", "b", "a"]
Output: ["a", "b", "a"]
Explanation: The two a words are not adjacent and both remain.
```

## Constraints

- 1 <= words.length <= 100
- 1 <= words[i].length <= 10
- Words contain lowercase English letters.
