# Add and Search Word Data Structure

Implement `WordDictionary` with an empty constructor.
`addWord(word)` stores a lowercase word, and `search(word)` checks whether a stored word matches the complete pattern.
In a search pattern, `.` matches exactly one arbitrary letter.
All other characters must match literally.
Void operations display `null`.

## Constraints

- Each word or pattern has length 1 to 25.
- Added words contain lowercase English letters.
- Search patterns contain lowercase letters and at most two dots.
- There are at most 10000 operations.

## Examples

### Example 1

```text
Input: ops = ["addWord", "search", "search", "search"], args = [["cat"], ["c.t"], ["ca"], ["d.t"]]
Output: [null, true, false, false]
Explanation: A dot matches one character, and the entire length must match.
```

### Example 2

```text
Input: ops = ["search", "addWord", "search"], args = [["."], ["a"], ["."]]
Output: [false, null, true]
Explanation: After insertion, the one-letter pattern matches a.
```
