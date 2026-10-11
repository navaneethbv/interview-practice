# List the Products Ordered in a Period

Report the names of products with at least 100 units ordered in February 2020, with the total units.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `product_name`, `unit`; row order is unrestricted.

## Tables

### Products

| Column | SQLite type |
| --- | --- |
| product_id | INTEGER |
| product_name | TEXT |
| product_category | TEXT |

### Orders

| Column | SQLite type |
| --- | --- |
| product_id | INTEGER |
| order_date | TEXT |
| unit | INTEGER |

## Constraints

- Dates are ISO text; product_id in Orders references Products.

## Examples

### Example 1

```text
Input: {"tables": {"Products": [[1, "Leetcode Solutions", "Book"], [2, "Jewels of Stringology", "Book"], [3, "HP", "Laptop"], [4, "Lenovo", "Laptop"], [5, "Leetcode Kit", "T-shirt"]], "Orders": [[1, "2020-02-05", 60], [1, "2020-02-10", 70], [2, "2020-01-18", 30], [2, "2020-02-11", 80], [3, "2020-02-17", 2], [3, "2020-02-24", 3], [4, "2020-03-01", 20], [4, "2020-03-04", 30], [4, "2020-03-04", 60], [5, "2020-02-25", 50], [5, "2020-02-27", 50], [5, "2020-03-01", 50]]}}
Output: [["Leetcode Solutions", 130], ["Leetcode Kit", 100]]
Explanation: Product 1 sold 130 units in February and product 5 sold exactly 100.
```

### Example 2

```text
Input: {"tables": {"Products": [[1, "A", "c"]], "Orders": [[1, "2020-01-31", 500]]}}
Output: []
Explanation: January orders do not count.
```
