# Percentage of Users Attended a Contest

For each contest, report the percentage of all users who registered, rounded to two decimals. Order by percentage descending, then contest_id ascending.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `contest_id`, `percentage`; rows must appear in the order described.

## Tables

### Users

| Column | SQLite type |
| --- | --- |
| user_id | INTEGER |
| user_name | TEXT |

### Register

| Column | SQLite type |
| --- | --- |
| contest_id | INTEGER |
| user_id | INTEGER |

## Constraints

- (contest_id, user_id) is unique and every user_id exists in Users.

## Examples

### Example 1

```text
Input: {"tables": {"Users": [[6, "Alice"], [2, "Bob"], [7, "Alex"]], "Register": [[215, 6], [209, 2], [208, 2], [210, 6], [208, 6], [209, 7], [209, 6], [215, 7], [208, 7], [210, 2], [207, 2], [210, 7]]}}
Output: [[208, 100], [209, 100], [210, 100], [215, 66.67], [207, 33.33]]
Explanation: Contests 208, 209 and 210 had all three users; ties are ordered by contest id.
```

### Example 2

```text
Input: {"tables": {"Users": [[1, "A"], [2, "B"], [3, "C"]], "Register": [[1, 1]]}}
Output: [[1, 33.33]]
Explanation: One of three users is 33.33 percent.
```
