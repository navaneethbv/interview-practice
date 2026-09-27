# Palindrome Partitioning

Split `s` into nonempty contiguous pieces such that every piece reads the same backward and forward.
Return all possible partitions.
The partitions may be listed in any order, but pieces within each partition must retain their string order.

## Examples

### Example 1

```text
Input: s = "aab"
Output: [["a", "a", "b"], ["aa", "b"]]
Explanation: The first two letters may be separate or combined.
```

### Example 2

```text
Input: s = "aba"
Output: [["a", "b", "a"], ["aba"]]
Explanation: Either all letters are separate or the entire palindrome is one piece.
```

## Constraints

- 1 <= s.length <= 16
- s contains lowercase English letters.
