# Restaurant Growth

Customers paid on each visited_on day. For every day that has six earlier days of history, report the total amount over the 7-day window ending that day and its average per day rounded to two decimals. Order by visited_on.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `visited_on`, `amount`, `average_amount`; rows must appear in the order described.

## Tables

### Customer

| Column | SQLite type |
| --- | --- |
| customer_id | INTEGER |
| name | TEXT |
| visited_on | TEXT |
| amount | INTEGER |

## Constraints

- There is at least one customer every day between the first and last visit.

## Examples

### Example 1

```text
Input: {"tables": {"Customer": [[1, "Jhon", "2019-01-01", 100], [2, "Daniel", "2019-01-02", 110], [3, "Jade", "2019-01-03", 120], [4, "Khaled", "2019-01-04", 130], [5, "Winston", "2019-01-05", 110], [6, "Elvis", "2019-01-06", 140], [7, "Anna", "2019-01-07", 150], [8, "Maria", "2019-01-08", 80], [9, "Jaze", "2019-01-09", 110], [1, "Jhon", "2019-01-10", 130], [3, "Jade", "2019-01-10", 150]]}}
Output: [["2019-01-07", 860, 122.86], ["2019-01-08", 840, 120], ["2019-01-09", 840, 120], ["2019-01-10", 1000, 142.86]]
Explanation: The first window ends on 2019-01-07; two payments on 2019-01-10 add up.
```

### Example 2

```text
Input: {"tables": {"Customer": [[1, "A", "2020-05-01", 7]]}}
Output: []
Explanation: With fewer than seven days of history there is no row.
```
