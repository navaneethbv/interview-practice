# Find All Anagrams in a String

Return all starting indices of substrings of `s` that contain exactly the same letters with the same multiplicities as `p`.
The indices may appear in any order.

## Examples

### Example 1

```text
Input: s = "cbaebabacd", p = "abc"
Output: [0, 6]
Explanation: The substrings cba and bac are rearrangements of abc.
```

### Example 2

```text
Input: s = "abab", p = "ab"
Output: [0, 1, 2]
Explanation: Every length-two window has one a and one b.
```

## Constraints

- 1 <= s.length, p.length <= 30,000
- s and p contain lowercase English letters.
