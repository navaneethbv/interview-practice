# Partition Labels

Split `s` into as many nonempty contiguous parts as possible so that each letter appears in at most one part.
Return the part lengths in their original left-to-right order.

## Examples

### Example 1

```text
Input: s = "abac"
Output: [3, 1]
Explanation: Both a occurrences stay in aba, followed by the separate c.
```

### Example 2

```text
Input: s = "eccbbbbdec"
Output: [10]
Explanation: The repeated letters connect the entire string into one part.
```

## Constraints

- 1 <= s.length <= 500
- s contains lowercase English letters.
