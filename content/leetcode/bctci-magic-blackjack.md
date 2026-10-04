# Magic Blackjack

A dealer repeatedly draws cards worth 1 to 10, each value always available, starting from a total of 0.
The dealer stops as soon as the total is at least `stand`; ending above `limit` is a bust.
Return the number of distinct card sequences that end in a bust.
The classic game uses `stand = 16` and `limit = 21`.

## Examples

### Example 1

```text
Input: stand = 16, limit = 21
Output: 100081
```

### Example 2

```text
Input: stand = 1, limit = 5
Output: 5
Explanation: Draws of 6 through 10 bust immediately.
```

## Constraints

- `1 <= stand <= limit <= 60`
- The answer fits in a signed 64-bit integer.
