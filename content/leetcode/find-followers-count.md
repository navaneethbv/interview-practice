# Find Followers Count

Count followers for each user present in Followers.
Return user ids in ascending order.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `user_id`, `followers_count` in the required row order.

## Tables

### Followers

| Column | SQLite type |
| --- | --- |
| user_id | INTEGER |
| follower_id | INTEGER |

## Constraints

- `(user_id, follower_id)` is unique.
- Ids are non-null integers; users may follow each other.

## Examples

### Example 1

```text
Input: {"tables": {"Followers": [[3, 1], [3, 2], [1, 2]]}}
Output: [[1, 1], [3, 2]]
Explanation: User 3 has two followers and user 1 has one.
```

### Example 2

```text
Input: {"tables": {"Followers": [[1, 2], [2, 1]]}}
Output: [[1, 1], [2, 1]]
Explanation: Reciprocal follows count independently.
```
