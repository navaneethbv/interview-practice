# Repeated DNA Sequences

Return every distinct substring of length 10 that appears at least twice in the DNA string s.
Overlapping occurrences count, and results may be returned in any order.

## Examples

### Example 1

```text
Input: s = "AAAAAAAAAAA"
Output: ["AAAAAAAAAA"]
Explanation: The same length-10 sequence starts at indices 0 and 1.
```

### Example 2

```text
Input: s = "ACGT"
Output: []
Explanation: The string is shorter than ten characters.
```

## Constraints

- 1 <= s.length <= 100000
- s contains only A, C, G, and T.
