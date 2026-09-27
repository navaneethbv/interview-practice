# Word Search II

Return all entries of `words` that can be traced through horizontally or vertically adjacent cells of `board`.
A word may not reuse a cell within its own path.
Different words may use the same cells, and a word found by several paths appears only once in the result.
Return the results in any order.

## Constraints

- Board dimensions are between 1 and 12.
- `1 <= words.length <= 30000`.
- Words are distinct and have lengths from 1 to 10.
- All letters are lowercase English letters.

## Examples

### Example 1

```text
Input: board = [["a", "b"], ["c", "d"]], words = ["ab", "ac", "ad", "abd"]
Output: ["ab", "ac", "abd"]
Explanation: The diagonal ad is unavailable, but abd follows adjacent cells.
```

### Example 2

```text
Input: board = [["a", "a"]], words = ["a", "aa", "aaa"]
Output: ["a", "aa"]
Explanation: Two cells cannot spell a three-character word.
```
