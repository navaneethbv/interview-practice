# Confirmation Rate

For every signed-up user, divide confirmed requests by all confirmation requests.
A user with no requests has rate zero.
Round each rate to two decimal places.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `user_id`, `confirmation_rate`; row order is unrestricted.

## Tables

### Signups

| Column | SQLite type |
| --- | --- |
| user_id | INTEGER |
| time_stamp | TEXT |

### Confirmations

| Column | SQLite type |
| --- | --- |
| user_id | INTEGER |
| time_stamp | TEXT |
| action | TEXT |

## Constraints

- Signup user ids are unique.
- Confirmation `(user_id, time_stamp)` pairs are unique and reference existing signups.
- Action is `confirmed` or `timeout`.

## Examples

### Example 1

```text
Input: {"tables": {"Signups": [[1, "2024-01-01 00:00:00"], [2, "2024-01-01 00:00:00"]], "Confirmations": [[1, "2024-01-02 00:00:00", "confirmed"], [1, "2024-01-03 00:00:00", "timeout"]]}}
Output: [[1, 0.5], [2, 0.0]]
Explanation: The user with no requests is retained.
```

### Example 2

```text
Input: {"tables": {"Signups": [[1, "2024-01-01 00:00:00"]], "Confirmations": [[1, "2024-01-02 00:00:00", "timeout"]]}}
Output: [[1, 0.0]]
Explanation: A timed-out request does not count as confirmed.
```
