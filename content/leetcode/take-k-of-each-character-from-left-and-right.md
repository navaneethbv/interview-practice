# Take K of Each Character From Left and Right

In one operation, remove the leftmost or rightmost remaining character.
Return the fewest operations needed to remove at least k copies of each of a, b, and c, or -1 if impossible.

## Examples

### Example 1

```text
Input: s = "aabaaaacaabc", k = 2
Output: 8
Explanation: Eight removals from the ends can collect two of every letter.
```

### Example 2

```text
Input: s = "a", k = 1
Output: -1
Explanation: There are no b or c characters to collect.
```

## Constraints

- 1 <= s.length <= 100,000
- s contains only a, b, and c.
- 0 <= k <= 100,000
