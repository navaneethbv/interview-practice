# Minimum Deletions to Make String Balanced

Delete the fewest characters so no b appears before any a in the remaining string.
Equivalently, all retained a characters precede all retained b characters.
Either group may be empty.

## Constraints

- s has 1 to 100000 characters, each a or b.

## Examples

### Example 1

```text
Input: s = "baba"
Output: 2
Explanation: Deleting the two b characters leaves aa.
```

### Example 2

```text
Input: s = "aabb"
Output: 0
Explanation: The string is already balanced.
```
