# Reorganize String

Rearrange all characters so no two neighboring characters are equal.
Return any valid rearrangement, or the empty string if none exists.

## Examples

### Example 1

```text
Input: s = "aab"
Output: "aba"
Explanation: Separating the two a occurrences avoids equal neighbors.
```

### Example 2

```text
Input: s = "aaab"
Output: ""
Explanation: There are too few other letters to separate all a occurrences.
```

## Constraints

- 1 <= s.length <= 500
- s contains lowercase English letters.
