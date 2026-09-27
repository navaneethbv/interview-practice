# Online Stock Span

For each daily price, return the number of consecutive days ending today whose prices are at most today's price.
`next(price)` records one new day and returns this span, including today.

## Examples

### Example 1

```text
Input: constructor = [], operations = ["next", "next", "next", "next", "next", "next", "next"], arguments = [[100], [80], [60], [70], [60], [75], [85]]
Output: [1, 1, 1, 2, 1, 4, 6]
Explanation: Each span stops immediately before the most recent strictly higher price.
```

### Example 2

```text
Input: constructor = [], operations = ["next", "next", "next"], arguments = [[5], [5], [5]]
Output: [1, 2, 3]
Explanation: Equal earlier prices belong in the span.
```

## Constraints

- 1 <= price <= 100,000
- At most 10,000 calls occur per instance.
