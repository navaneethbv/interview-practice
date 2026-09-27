# Remove All Adjacent Duplicates In String

Repeatedly delete two equal neighboring characters until no such pair remains.
Return the final string; the result is independent of the deletion order.

## Examples

### Example 1

```text
Input: s = "abbaca"
Output: "ca"
Explanation: Delete bb, then the newly adjacent aa.
```

### Example 2

```text
Input: s = "azxxzy"
Output: "ay"
Explanation: Delete xx, then zz.
```

## Constraints

- 1 <= s.length <= 100,000
- s contains lowercase English letters.
