# IKEA Shopping

Item `i` costs `prices[i]` and has style rating `ratings[i]`.
Choose distinct items whose total price is at most `budget` so that their total rating is as large as possible, and return their indices in any order.
Any optimal choice is accepted.

## Examples

### Example 1

```text
Input: budget = 20, prices = [10, 5, 15, 8, 3], ratings = [7.0, 3.5, 9.0, 6.0, 2.0]
Output: [0, 3]
```

### Example 2

```text
Input: budget = 10, prices = [2, 3, 4, 5], ratings = [1.0, 2.0, 3.5, 4.0]
Output: [2, 3]
```

## Constraints

- `0 <= n <= 15`
- `1 <= budget <= 10^6` and `1 <= prices[i] <= 10^4`
- `0 <= ratings[i] <= 10`
