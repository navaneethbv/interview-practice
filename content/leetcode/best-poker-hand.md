# Best Poker Hand

Given five card ranks and suits, return the strongest of these categories: `Flush` for all suits equal, otherwise `Three of a Kind` for a rank appearing at least three times, otherwise `Pair` for a repeated rank, otherwise `High Card`.
Only these categories are considered.

## Constraints

- Both arrays contain exactly five entries.
- Ranks range from 1 to 13; suits are a, b, c, or d.
- No identical rank-and-suit card appears twice.

## Examples

### Example 1

```text
Input: ranks = [1, 3, 5, 7, 9], suits = ["a", "a", "a", "a", "a"]
Output: "Flush"
Explanation: Every suit agrees.
```

### Example 2

```text
Input: ranks = [2, 2, 2, 4, 5], suits = ["a", "b", "c", "a", "b"]
Output: "Three of a Kind"
Explanation: Rank 2 occurs three times.
```
