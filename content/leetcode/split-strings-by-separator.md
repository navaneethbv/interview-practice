# Split Strings by Separator

Split each string in words at every occurrence of separator.
Return the nonempty pieces in their original order across all strings.
Discard empty pieces.

## Constraints

- There are 1 to 100 strings, each length 1 to 20.
- Strings contain lowercase letters or punctuation.
- Separator is one character.

## Examples

### Example 1

```text
Input: words = ["a.b", "..c."], separator = "."
Output: ["a", "b", "c"]
Explanation: Leading, trailing, and repeated separators create discarded empty pieces.
```

### Example 2

```text
Input: words = ["abc"], separator = "#"
Output: ["abc"]
Explanation: Without a separator occurrence, the string is retained.
```
