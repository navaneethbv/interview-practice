# Customers Who Bought All Products

Report the customers who bought every product in the Product table.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `customer_id`; row order is unrestricted.

## Tables

### Customer

| Column | SQLite type |
| --- | --- |
| customer_id | INTEGER |
| product_key | INTEGER |

### Product

| Column | SQLite type |
| --- | --- |
| product_key | INTEGER |

## Constraints

- product_key in Customer always references Product; Customer may contain duplicate rows.

## Examples

### Example 1

```text
Input: {"tables": {"Customer": [[1, 5], [2, 6], [3, 5], [3, 6], [1, 6]], "Product": [[5], [6]]}}
Output: [[1], [3]]
Explanation: Customers 1 and 3 bought both products.
```

### Example 2

```text
Input: {"tables": {"Customer": [[1, 5], [1, 5]], "Product": [[5], [6]]}}
Output: []
Explanation: Buying product 5 twice does not cover product 6.
```
