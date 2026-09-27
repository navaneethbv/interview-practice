# Champagne Tower

Pour cups of champagne into the top of a triangular tower of unit-capacity glasses.
Overflow from each glass splits equally between the two glasses below it.
Return how full the specified glass is, from 0 to 1.
Rows and positions within a row are zero-based.

## Examples

### Example 1

```text
Input: poured = 2, query_row = 1, query_glass = 1
Output: 0.5
Explanation: The top retains one cup and splits its one-cup overflow equally.
```

### Example 2

```text
Input: poured = 1, query_row = 1, query_glass = 0
Output: 0.0
Explanation: One cup fills only the top glass.
```

## Constraints

- 0 <= poured <= 10^9
- 0 <= query_glass <= query_row <= 100
