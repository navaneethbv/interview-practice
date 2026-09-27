# Delete Duplicate Emails

Delete duplicate email rows in place, retaining the row with the smallest id for each email.
Submit a DELETE statement; the judge reads the remaining Person table afterward.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `id`, `email`; row order is unrestricted.

## Tables

### Person

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| email | TEXT |

## Constraints

- Person ids are unique.
- Emails are non-null lowercase strings.
- The table may be empty.

## Examples

### Example 1

```text
Input: {"tables": {"Person": [[5, "a@x"], [2, "a@x"], [7, "b@x"]]}}
Output: [[2, "a@x"], [7, "b@x"]]
Explanation: The address a@x appears twice; its smallest id is 2.
```

### Example 2

```text
Input: {"tables": {"Person": [[1, "q@x"]]}}
Output: [[1, "q@x"]]
Explanation: The sole row has no duplicate.
```
