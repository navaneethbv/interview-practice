# Concatenated Words

Return every input word that can be built by concatenating at least two shorter words from the same list.
A shorter word may be reused.
Return qualifying words in any order.

## Examples

### Example 1

```text
Input: words = ["cat", "dog", "catdog"]
Output: ["catdog"]
Explanation: Concatenate cat and dog.
```

### Example 2

```text
Input: words = ["a", "aa", "aaa"]
Output: ["aa", "aaa"]
Explanation: Repeated use of the shorter word a is allowed.
```

## Constraints

- 1 <= words.length <= 10,000
- 1 <= words[i].length <= 30
- Words are distinct lowercase strings; total length is at most 100,000.
