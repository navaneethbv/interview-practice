# Daily Leads and Partners

For each date and product make, report the number of distinct lead ids and distinct partner ids.
Repeated rows and repeated combinations do not increase a distinct count.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `date_id`, `make_name`, `unique_leads`, `unique_partners`; row order is unrestricted.

## Tables

### DailySales

| Column | SQLite type |
| --- | --- |
| date_id | TEXT |
| make_name | TEXT |
| lead_id | INTEGER |
| partner_id | INTEGER |

## Constraints

- Rows may repeat and all columns are non-null.
- Dates use ISO format.

## Examples

### Example 1

```text
Input: {"tables": {"DailySales": [["2024-01-01", "A", 1, 5], ["2024-01-01", "A", 1, 6], ["2024-01-01", "A", 2, 6]]}}
Output: [["2024-01-01", "A", 2, 2]]
Explanation: There are two distinct ids of each kind.
```

### Example 2

```text
Input: {"tables": {"DailySales": [["2024-01-01", "A", 1, 5], ["2024-01-01", "A", 1, 5]]}}
Output: [["2024-01-01", "A", 1, 1]]
Explanation: An exact duplicate does not change either count.
```
