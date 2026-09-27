# Customers Who Never Order

Return the name of every customer with no matching order.
A customer with any order is excluded, regardless of how many orders they made.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `Customers`; row order is unrestricted.

## Tables

### Customers

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| name | TEXT |

### Orders

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| customerId | INTEGER |

## Constraints

- Both id columns are unique within their tables.
- Each order references an existing customer.
- Customer names are non-null and may repeat.

## Examples

### Example 1

```text
Input: {"tables": {"Customers": [[1, "Ana"], [2, "Bo"]], "Orders": [[4, 1]]}}
Output: [["Bo"]]
Explanation: Only Bo has no order.
```

### Example 2

```text
Input: {"tables": {"Customers": [[3, "Cy"]], "Orders": []}}
Output: [["Cy"]]
Explanation: No orders means Cy qualifies.
```
