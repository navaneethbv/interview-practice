# Brace Expansion

Expand a string whose letters may include nonnested choice groups such as `{a,b}`.
Choose exactly one letter from each brace group and retain every ordinary letter.
Return all resulting words in lexicographic order.

## Constraints

- The expression length is from 1 to 50.
- Characters are lowercase letters, commas, or braces.
- Groups contain distinct single-letter alternatives and never nest.

## Examples

### Example 1

```text
Input: s = "{b,a}x{d,c}"
Output: ["axc", "axd", "bxc", "bxd"]
Explanation: Choose one letter from each group, then sort the words.
```

### Example 2

```text
Input: s = "abc"
Output: ["abc"]
Explanation: With no groups, only the original word exists.
```
