# Longest Period at Most k Distinct

`bestSeller[i]` is the best-selling title on day `i`.
Return the most consecutive days that contain at most `k` distinct best sellers.

## Examples

### Example 1

```text
Input: bestSeller = ["book1", "book1", "book2", "book1", "book3", "book1"], k = 2
Output: 4
```

### Example 2

```text
Input: bestSeller = ["book1", "book2", "book3"], k = 1
Output: 1
```

## Constraints

- `0 <= bestSeller.length <= 10^6`
- `1 <= k`
