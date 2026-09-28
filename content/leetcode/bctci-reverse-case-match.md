# Reverse Case Match

`s` has even length, and exactly half of its letters are lowercase.
Return whether the word formed by the lowercase letters, read left to right, equals the word formed by the uppercase letters read right to left, ignoring case.

## Examples

### Example 1

```text
Input: s = "haDrRAHd"
Output: true
Explanation: Lowercase letters spell "hard"; uppercase letters spell "DRAH", which reversed is "HARD".
```

### Example 2

```text
Input: s = "haHrARDd"
Output: false
```

## Constraints

- `0 <= s.length <= 10^6`
- `s` contains only English letters, half lowercase and half uppercase.
