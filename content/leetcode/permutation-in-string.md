# Permutation in String

Return whether some contiguous substring of `s2` contains exactly the same letters, with the same multiplicities, as `s1`.
The letters inside that substring may appear in any order.

## Examples

### Example 1

```text
Input: s1 = "abc", s2 = "zzcabx"
Output: true
Explanation: The substring cab rearranges the letters of abc.
```

### Example 2

```text
Input: s1 = "aab", s2 = "abbc"
Output: false
Explanation: No three-letter window contains two copies of a.
```

## Constraints

- 1 <= s1.length, s2.length <= 10000.
- Both strings contain only lowercase English letters.
