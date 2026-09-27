# Game Play Analysis IV

Calculate the fraction of players who logged in exactly one calendar day after their first login.
Divide qualifying players by all distinct players and round to two decimal places.
A login counts even if zero games were played.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `fraction`; row order is unrestricted.

## Tables

### Activity

| Column | SQLite type |
| --- | --- |
| player_id | INTEGER |
| device_id | INTEGER |
| event_date | TEXT |
| games_played | INTEGER |

## Constraints

- `(player_id, event_date)` is unique.
- At least one player is present.
- Games played is a nonnegative integer.

## Examples

### Example 1

```text
Input: {"tables": {"Activity": [[1, 1, "2024-01-01", 0], [1, 2, "2024-01-02", 3], [2, 1, "2024-01-01", 2]]}}
Output: [[0.5]]
Explanation: One of two players returned the next day.
```

### Example 2

```text
Input: {"tables": {"Activity": [[1, 1, "2024-01-01", 2], [1, 1, "2024-01-03", 2], [1, 1, "2024-01-04", 2]]}}
Output: [[0.0]]
Explanation: A later consecutive pair does not follow the first login.
```
