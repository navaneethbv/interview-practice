# Longest Substring with At Most K Distinct Characters

Return the length of the longest contiguous substring of `s` containing at most `k` distinct characters.
Repeated occurrences do not add to the distinct count.

## Constraints

- `0 <= s.length <= 50000`.
- `0 <= k <= 50`.
- Characters are ASCII letters, digits, or spaces.

## Examples

### Example 1

```text
Input: s = "abaccc", k = 2
Output: 4
Explanation: The suffix accc uses two distinct letters.
```

### Example 2

```text
Input: s = "abc", k = 0
Output: 0
Explanation: No nonempty substring can use zero distinct characters.
```
