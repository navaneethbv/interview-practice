# Unique Best Seller Streak

`bestSeller[i]` is the best-selling title on day `i`.
Return whether some `k` consecutive days all have different best sellers.

## Examples

### Example 1

```text
Input: bestSeller = ["book3", "book1", "book3", "book3", "book2", "book3", "book4", "book3"], k = 3
Output: true
```

### Example 2

```text
Input: bestSeller = ["book3", "book1", "book3", "book3", "book2", "book3", "book4", "book3"], k = 4
Output: false
```

## Constraints

- `1 <= k <= bestSeller.length <= 10^6`
