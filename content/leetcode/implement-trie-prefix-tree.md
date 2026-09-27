# Implement Trie (Prefix Tree)

Implement a `Trie` with an empty constructor and these operations:

- `insert(word)` stores a word.
- `search(word)` returns whether the complete word has been inserted.
- `startsWith(prefix)` returns whether any stored word begins with the prefix.

Inserting the same word again does not change search results.
Void operations display `null` in the output.

## Constraints

- Words and prefixes contain 1 to 2000 lowercase English letters.
- There are at most 30000 operations.

## Examples

### Example 1

```text
Input: ops = ["insert", "search", "search", "startsWith"], args = [["cloud"], ["cloud"], ["clo"], ["clo"]]
Output: [null, true, false, true]
Explanation: A prefix need not be a stored complete word.
```

### Example 2

```text
Input: ops = ["search", "insert", "search"], args = [["a"], ["a"], ["a"]]
Output: [false, null, true]
Explanation: Insertion changes the complete-word result.
```
