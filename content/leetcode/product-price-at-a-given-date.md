# Product Price at a Given Date

Every product starts at price 10. Products records price changes. Report every product's price on 2019-08-16.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `product_id`, `price`; row order is unrestricted.

## Tables

### Products

| Column | SQLite type |
| --- | --- |
| product_id | INTEGER |
| new_price | INTEGER |
| change_date | TEXT |

## Constraints

- (product_id, change_date) is unique.

## Examples

### Example 1

```text
Input: {"tables": {"Products": [[1, 20, "2019-08-14"], [2, 50, "2019-08-14"], [1, 30, "2019-08-15"], [1, 35, "2019-08-16"], [2, 65, "2019-08-17"], [3, 20, "2019-08-18"]]}}
Output: [[1, 35], [2, 50], [3, 10]]
Explanation: Product 2's change on 2019-08-17 is too late; product 3 still costs 10.
```

### Example 2

```text
Input: {"tables": {"Products": [[4, 99, "2019-08-16"]]}}
Output: [[4, 99]]
Explanation: A change on the date itself applies.
```
