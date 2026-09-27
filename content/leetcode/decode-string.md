# Decode String

Decode repetitions written as k[encoded], meaning the bracket contents repeated k times.
Repetitions may nest, and plain lowercase letters are copied directly.
Return the fully expanded string.

## Examples

### Example 1

```text
Input: s = "3[a2[c]]"
Output: "accaccacc"
Explanation: The inner repetition makes acc, repeated three times.
```

### Example 2

```text
Input: s = "2[ab]c"
Output: "ababc"
Explanation: Repeat ab twice and append c.
```

## Constraints

- 1 <= s.length <= 30
- The encoding is valid and uses lowercase letters, digits, and brackets.
- 1 <= repetition counts <= 300
- The decoded result has length at most 100,000.
