# Monthly Transactions I

Group transactions by calendar month and country.
For each group, return the total count and amount, plus the count and amount for approved transactions only.
Format the month as `YYYY-MM`.
A group without approved transactions has zero approved count and amount.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `month`, `country`, `trans_count`, `approved_count`, `trans_total_amount`, `approved_total_amount`; row order is unrestricted.

## Tables

### Transactions

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| country | TEXT |
| state | TEXT |
| amount | INTEGER |
| trans_date | TEXT |

## Constraints

- Transaction ids are unique.
- State is `approved` or `declined`; amounts are nonnegative integers.
- Country may be null, which forms its own group.

## Examples

### Example 1

```text
Input: {"tables": {"Transactions": [[1, "US", "approved", 10, "2024-01-01"], [2, "US", "declined", 20, "2024-01-02"], [3, "CA", "declined", 5, "2024-01-03"]]}}
Output: [["2024-01", "US", 2, 1, 30, 10], ["2024-01", "CA", 1, 0, 5, 0]]
Explanation: All amounts count toward the total, but only approved amounts enter the last column.
```

### Example 2

```text
Input: {"tables": {"Transactions": [[1, null, "approved", 0, "2024-02-29"]]}}
Output: [["2024-02", null, 1, 1, 0, 0]]
Explanation: A null country remains a valid group.
```
