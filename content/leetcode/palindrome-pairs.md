# Palindrome Pairs

Return every ordered pair of different indices [i,j] for which words[i] followed by words[j] is a palindrome.
The pair list may be in any order, but the order of indices within a pair matters.

## Examples

### Example 1

```text
Input: words = ["bat", "tab", "cat"]
Output: [[0, 1], [1, 0]]
Explanation: Both battab and tabbat are palindromes.
```

### Example 2

```text
Input: words = ["a", ""]
Output: [[0, 1], [1, 0]]
Explanation: An empty string can appear on either side of a palindrome.
```

## Constraints

- 1 <= words.length <= 5,000
- 0 <= words[i].length <= 300
- Words are distinct and contain lowercase English letters.
