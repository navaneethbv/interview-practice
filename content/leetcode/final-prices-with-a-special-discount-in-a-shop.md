# Final Prices With a Special Discount in a Shop

For each item, find the first item to its right whose price is no greater than its own.
That later price is its discount.
Return every item's price after discount; use no discount when no qualifying later item exists.

## Examples

### Example 1

```text
Input: prices = [8, 4, 6, 2, 3]
Output: [4, 2, 4, 2, 3]
Explanation: Each discount comes from the earliest qualifying later item.
```

### Example 2

```text
Input: prices = [1, 2, 3]
Output: [1, 2, 3]
Explanation: Every later price is larger.
```

## Constraints

- 1 <= prices.length <= 500.
- 1 <= prices[i] <= 1000.
