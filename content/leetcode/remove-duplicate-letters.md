# Remove Duplicate Letters

Remove characters so every distinct letter appears exactly once.
Among all such subsequences, return the lexicographically smallest.

## Examples

### Example 1

```text
Input: s = "bcabc"
Output: "abc"
Explanation: Keep one occurrence of each letter in the smallest possible order.
```

### Example 2

```text
Input: s = "cbacdcbc"
Output: "acdb"
Explanation: The input order prevents the smaller-looking abcd subsequence.
```

## Constraints

- 1 <= s.length <= 10,000
- s contains lowercase English letters.
