# Minimum ASCII Delete Sum for Two Strings

Delete characters from either string until the remaining strings are equal.
The cost of a deletion is the ASCII value of the removed character.
Return the smallest total cost across both strings.

## Constraints

- Each string has length 1 to 1000 and contains lowercase English letters.

## Examples

### Example 1

```text
Input: s1 = "ab", s2 = "ac"
Output: 197
Explanation: Delete b (98) and c (99), retaining a.
```

### Example 2

```text
Input: s1 = "same", s2 = "same"
Output: 0
Explanation: No deletion is needed.
```
