# Custom Sort String

Rearrange all characters of `s` so characters present in `order` appear according to their relative ranking in that string.
Characters absent from `order` may appear anywhere.
Return any valid rearrangement, preserving every character occurrence.

## Examples

### Example 1

```text
Input: order = "cba", s = "abcd"
Output: "cbad"
Explanation: Among ranked letters, c precedes b and b precedes a; d is unrestricted.
```

### Example 2

```text
Input: order = "ab", s = "bbaca"
Output: "aabbc"
Explanation: Place both a occurrences before both b occurrences.
```

## Constraints

- 1 <= order.length <= 26; its characters are distinct lowercase letters.
- 1 <= s.length <= 200; s contains lowercase English letters.
