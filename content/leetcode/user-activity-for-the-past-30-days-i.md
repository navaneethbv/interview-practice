# User Activity for the Past 30 Days I

Report the number of distinct active users per day for the 30 days ending 2019-07-27 inclusive. A user is active on a day with at least one activity. Omit days with no activity.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `day`, `active_users`; row order is unrestricted.

## Tables

### Activity

| Column | SQLite type |
| --- | --- |
| user_id | INTEGER |
| session_id | INTEGER |
| activity_date | TEXT |
| activity_type | TEXT |

## Constraints

- Dates are ISO YYYY-MM-DD text; activity_type is one of open_session, end_session, scroll_down, send_message.

## Examples

### Example 1

```text
Input: {"tables": {"Activity": [[1, 1, "2019-07-20", "open_session"], [1, 1, "2019-07-20", "scroll_down"], [1, 1, "2019-07-20", "end_session"], [2, 4, "2019-07-20", "open_session"], [2, 4, "2019-07-21", "send_message"], [2, 4, "2019-07-21", "end_session"], [3, 2, "2019-07-21", "open_session"], [3, 2, "2019-07-21", "send_message"], [3, 2, "2019-07-21", "end_session"], [4, 3, "2019-06-25", "open_session"], [4, 3, "2019-06-25", "end_session"]]}}
Output: [["2019-07-20", 2], ["2019-07-21", 2]]
Explanation: 2019-06-25 is outside the window.
```

### Example 2

```text
Input: {"tables": {"Activity": [[1, 1, "2019-06-28", "open_session"], [2, 2, "2019-06-27", "open_session"]]}}
Output: [["2019-06-28", 1]]
Explanation: The window starts on 2019-06-28.
```
