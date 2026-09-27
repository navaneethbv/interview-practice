# Longest Substring with At Least K Repeating Characters

Return the maximum length of a contiguous substring in which every distinct character occurs at least k times.

## Examples

### Example 1

```text
Input: s = "aaabb", k = 3
Output: 3
Explanation: The substring aaa qualifies; b occurs too few times in the whole string.
```

### Example 2

```text
Input: s = "ababbc", k = 2
Output: 5
Explanation: The prefix ababb has at least two occurrences of each of its characters.
```

## Constraints

- 1 <= s.length <= 10,000
- s contains lowercase English letters.
- 1 <= k <= 100,000
