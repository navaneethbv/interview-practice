# Find Customer Referee

Return customers whose referee is not customer 2.
Customers with no referee also qualify.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `name`; row order is unrestricted.

## Tables

### Customer

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| name | TEXT |
| referee_id | INTEGER |

## Constraints

- Customer ids are unique and names are non-null.
- `referee_id` may be null.

## Examples

### Example 1

```text
Input: {"tables": {"Customer": [[1, "Ana", null], [2, "Bo", null], [3, "Cy", 2], [4, "Dee", 1]]}}
Output: [["Ana"], ["Bo"], ["Dee"]]
Explanation: A null referee is included.
```

### Example 2

```text
Input: {"tables": {"Customer": [[1, "Ana", 2], [2, "Bo", null]]}}
Output: [["Bo"]]
Explanation: Only the referral value matters.
```
