# Immediate Food Delivery II

Consider only each customer's earliest order.
Report the percentage of those orders whose preferred delivery date equals the order date, rounded to two decimal places.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `immediate_percentage`; row order is unrestricted.

## Tables

### Delivery

| Column | SQLite type |
| --- | --- |
| delivery_id | INTEGER |
| customer_id | INTEGER |
| order_date | TEXT |
| customer_pref_delivery_date | TEXT |

## Constraints

- Delivery ids are unique.
- At least one customer exists and each customer has a unique earliest order.
- The preferred date is on or after the order date.

## Examples

### Example 1

```text
Input: {"tables": {"Delivery": [[1, 1, "2024-01-01", "2024-01-01"], [2, 2, "2024-01-01", "2024-01-02"], [3, 2, "2024-01-03", "2024-01-03"]]}}
Output: [[50.0]]
Explanation: Only one of the two first orders is immediate.
```

### Example 2

```text
Input: {"tables": {"Delivery": [[1, 1, "2024-01-02", "2024-01-02"], [2, 1, "2024-01-01", "2024-01-03"]]}}
Output: [[0.0]]
Explanation: Earliest date, rather than smallest id, determines the first order.
```
