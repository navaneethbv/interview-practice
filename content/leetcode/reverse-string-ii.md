# Reverse String II

Process `s` in consecutive blocks of 2k characters.
Reverse the first k characters of each block.
If the last block has fewer than k characters, reverse all of them; otherwise leave its remaining suffix unchanged.

## Examples

### Example 1

```text
Input: s = "abcdefg", k = 2
Output: "bacdfeg"
Explanation: Reverse ab and ef while preserving the intervening characters.
```

### Example 2

```text
Input: s = "abc", k = 4
Output: "cba"
Explanation: The whole string is shorter than k.
```

## Constraints

- 1 <= s.length <= 10,000
- s contains lowercase English letters.
- 1 <= k <= 10,000
