# Word Break II

Insert spaces into s so each resulting word belongs to wordDict.
Return every possible sentence in any order.
Dictionary words may be reused, and every character must be covered exactly once.

## Constraints

- `1 <= s.length <= 20`.
- The dictionary contains 1 to 1000 distinct lowercase words of length 1 to 10.

## Examples

### Example 1

```text
Input: s = "catsanddog", wordDict = ["cat", "cats", "and", "sand", "dog"]
Output: ["cat sand dog", "cats and dog"]
Explanation: Two different first-word choices lead to valid full splits.
```

### Example 2

```text
Input: s = "abc", wordDict = ["a", "b"]
Output: []
Explanation: The final c cannot be covered.
```
