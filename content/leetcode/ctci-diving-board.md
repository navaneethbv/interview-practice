# Diving Board

A diving board is built from exactly `k` planks placed end to end.
Each plank is either `shorter` or `longer` long, with an unlimited supply of both.
Return every possible total length in increasing order, without duplicates.

## Examples

### Example 1

```text
Input: k = 3, shorter = 1, longer = 2
Output: [3, 4, 5, 6]
```

### Example 2

```text
Input: k = 0, shorter = 1, longer = 2
Output: []
```

## Constraints

- `0 <= k <= 100,000`
- `1 <= shorter <= longer <= 10,000`
