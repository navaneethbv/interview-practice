# Lexicographically Smallest Permutation Greater Than Target

Rearrange every character of s to form the alphabetically smallest string strictly greater than target.
The two strings have equal length.
Return an empty string if no permutation qualifies.

## Examples

### Example 1

```text
Input: s = "aabc", target = "abca"
Output: "acab"
Explanation: All earlier permutations are at most abca.
```

### Example 2

```text
Input: s = "ab", target = "ba"
Output: ""
Explanation: The largest permutation equals the target, so none is strictly greater.
```

## Constraints

- 1 <= s.length == target.length <= 300
- Both strings contain lowercase English letters.
