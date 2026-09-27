# Minimum Window Substring

Return the shortest contiguous substring of `s` containing every character of `t`, including its multiplicity.
Character comparisons are case sensitive.
Return an empty string if no such window exists.
The inputs guarantee a unique minimum window when one exists.

## Constraints

- `1 <= s.length, t.length <= 100000`.
- Both strings contain uppercase and lowercase English letters.

## Examples

### Example 1

```text
Input: s = "xAByCz", t = "ABC"
Output: "AByC"
Explanation: This four-character window contains A, B, and C.
```

### Example 2

```text
Input: s = "aaab", t = "aab"
Output: "aab"
Explanation: Two copies of a and one b are required.
```
