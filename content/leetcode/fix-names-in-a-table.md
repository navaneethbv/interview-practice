# Fix Names in a Table

Format each name with its first character uppercase and every remaining character lowercase.
Return the transformed names ordered by user id ascending.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `user_id`, `name` in the required row order.

## Tables

### Users

| Column | SQLite type |
| --- | --- |
| user_id | INTEGER |
| name | TEXT |

## Constraints

- User ids are unique.
- Names contain one or more ASCII English letters.

## Examples

### Example 1

```text
Input: {"tables": {"Users": [[2, "bOB"], [1, "aNA"]]}}
Output: [[1, "Ana"], [2, "Bob"]]
Explanation: Case is normalized and ids determine row order.
```

### Example 2

```text
Input: {"tables": {"Users": [[1, "z"]]}}
Output: [[1, "Z"]]
Explanation: A one-letter name becomes uppercase.
```
