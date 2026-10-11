# Count the Number of Good Subsequences

A subsequence of `s` is good if it is non-empty and every character in it appears the same number of times.
Return the number of good subsequences, counting subsequences at different positions separately, modulo 10^9 + 7.

## Constraints

- 1 <= s.length <= 10^4
- s consists of lowercase English letters.

## Examples

### Example 1

```text
Input: s = "aabb"
Output: 11
Explanation: Of the 15 non-empty subsequences, the 4 that use a and b a different number of times, such as aab, are not good.
```

### Example 2

```text
Input: s = "leet"
Output: 12
Explanation: Only subsequences with two e's and another letter fail.
```
