# Average Selling Price

For each product in Prices, calculate the unit-weighted average sale price, rounded to two decimal places.
Use the price interval containing each purchase date, including both endpoints.
Products with no units sold have average price zero.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `product_id`, `average_price`; row order is unrestricted.

## Tables

### Prices

| Column | SQLite type |
| --- | --- |
| product_id | INTEGER |
| start_date | TEXT |
| end_date | TEXT |
| price | INTEGER |

### UnitsSold

| Column | SQLite type |
| --- | --- |
| product_id | INTEGER |
| purchase_date | TEXT |
| units | INTEGER |

## Constraints

- `(product_id, start_date, end_date)` is unique and intervals for a product never overlap.
- UnitsSold may contain duplicate rows; each purchase falls within one matching price interval.
- Prices and unit counts are positive integers.

## Examples

### Example 1

```text
Input: {"tables": {"Prices": [[1, "2024-01-01", "2024-01-10", 10], [1, "2024-01-11", "2024-01-20", 20]], "UnitsSold": [[1, "2024-01-10", 3], [1, "2024-01-11", 1]]}}
Output: [[1, 12.5]]
Explanation: The weighted total is 50 across four units.
```

### Example 2

```text
Input: {"tables": {"Prices": [[2, "2024-01-01", "2024-01-31", 8]], "UnitsSold": []}}
Output: [[2, 0]]
Explanation: An unsold product remains present.
```
