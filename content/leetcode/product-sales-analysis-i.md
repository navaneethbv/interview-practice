# Product Sales Analysis I

Report the product name, year and price of every sale.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `product_name`, `year`, `price`; row order is unrestricted.

## Tables

### Sales

| Column | SQLite type |
| --- | --- |
| sale_id | INTEGER |
| product_id | INTEGER |
| year | INTEGER |
| quantity | INTEGER |
| price | INTEGER |

### Product

| Column | SQLite type |
| --- | --- |
| product_id | INTEGER |
| product_name | TEXT |

## Constraints

- (sale_id, year) is unique; product_id references Product.

## Examples

### Example 1

```text
Input: {"tables": {"Sales": [[1, 100, 2008, 10, 5000], [2, 100, 2009, 12, 5000], [7, 200, 2011, 15, 9000]], "Product": [[100, "Nokia"], [200, "Apple"], [300, "Samsung"]]}}
Output: [["Nokia", 2008, 5000], ["Nokia", 2009, 5000], ["Apple", 2011, 9000]]
Explanation: Samsung has no sales, so it does not appear.
```

### Example 2

```text
Input: {"tables": {"Sales": [], "Product": [[1, "Pen"]]}}
Output: []
Explanation: No sales produce no rows.
```
