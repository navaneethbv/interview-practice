# Valid Palindrome III

Return whether deleting at most `k` characters from `s` can leave a palindrome.
The remaining characters must preserve their order.

## Examples

### Example 1

```text
Input: s = "abcdeca", k = 2
Output: true
Explanation: Delete b and e to leave acdca.
```

### Example 2

```text
Input: s = "abc", k = 1
Output: false
Explanation: At least two deletions are needed.
```

## Constraints

- 1 <= s.length <= 1,000
- s contains lowercase English letters.
- 0 <= k <= s.length
