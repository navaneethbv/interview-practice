# Shortest Palindrome

Prepend as few characters as possible to `s` so that the resulting string is a palindrome.
Return the resulting shortest palindrome.

## Examples

### Example 1

```text
Input: s = "aacecaaa"
Output: "aaacecaaa"
Explanation: Prepending one a is enough.
```

### Example 2

```text
Input: s = "abcd"
Output: "dcbabcd"
Explanation: Prepend dcb to mirror the unmatched suffix.
```

## Constraints

- 0 <= s.length <= 50,000
- s contains lowercase English letters.
