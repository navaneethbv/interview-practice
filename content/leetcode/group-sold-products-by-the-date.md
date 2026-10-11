# Group Sold Products By The Date

For each sell_date, report the number of distinct products sold and their names sorted lexicographically and joined by commas. Order by sell_date.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `sell_date`, `num_sold`, `products`; rows must appear in the order described.

## Tables

### Activities

| Column | SQLite type |
| --- | --- |
| sell_date | TEXT |
| product | TEXT |

## Constraints

- The table may contain duplicate rows.

## Examples

### Example 1

```text
Input: {"tables": {"Activities": [["2020-05-30", "Headphone"], ["2020-06-01", "Pencil"], ["2020-06-02", "Mask"], ["2020-05-30", "Basketball"], ["2020-06-01", "Bible"], ["2020-06-02", "Mask"], ["2020-05-30", "T-Shirt"]]}}
Output: [["2020-05-30", 3, "Basketball,Headphone,T-Shirt"], ["2020-06-01", 2, "Bible,Pencil"], ["2020-06-02", 1, "Mask"]]
Explanation: Mask sold twice on 2020-06-02 but counts once.
```

### Example 2

```text
Input: {"tables": {"Activities": [["2021-01-01", "b"], ["2021-01-01", "a"]]}}
Output: [["2021-01-01", 2, "a,b"]]
Explanation: Names are sorted.
```
