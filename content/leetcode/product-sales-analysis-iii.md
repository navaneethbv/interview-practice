# Product Sales Analysis III

For each product, find its earliest sales year and return every sale recorded for that product in that year.
Keep multiple first-year sales as separate rows.
Price is the per-unit price.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `product_id`, `first_year`, `quantity`, `price`; row order is unrestricted.

## Tables

### Sales

| Column | SQLite type |
| --- | --- |
| sale_id | INTEGER |
| product_id | INTEGER |
| year | INTEGER |
| quantity | INTEGER |
| price | INTEGER |

## Constraints

- `(sale_id, year)` uniquely identifies a sale.
- Products may have several sales in a year.
- Quantity and price are positive integers.

## Examples

### Example 1

```text
Input: {"tables": {"Sales": [[1, 10, 2020, 2, 5], [2, 10, 2021, 3, 6], [3, 10, 2020, 4, 7]]}}
Output: [[10, 2020, 2, 5], [10, 2020, 4, 7]]
Explanation: Both 2020 sales qualify.
```

### Example 2

```text
Input: {"tables": {"Sales": [[1, 10, 2020, 2, 5], [2, 20, 2019, 1, 8]]}}
Output: [[10, 2020, 2, 5], [20, 2019, 1, 8]]
Explanation: Each product has its own first year.
```
