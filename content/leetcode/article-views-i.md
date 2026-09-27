# Article Views I

Find authors who viewed at least one of their own articles.
Return each qualifying author id once, ordered ascending.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `id` in the required row order.

## Tables

### Views

| Column | SQLite type |
| --- | --- |
| article_id | INTEGER |
| author_id | INTEGER |
| viewer_id | INTEGER |
| view_date | TEXT |

## Constraints

- Views may contain duplicate rows.
- All columns are non-null.

## Examples

### Example 1

```text
Input: {"tables": {"Views": [[1, 4, 4, "2024-01-01"], [2, 2, 2, "2024-01-01"], [1, 4, 4, "2024-01-01"]]}}
Output: [[2], [4]]
Explanation: Duplicate views do not duplicate authors.
```

### Example 2

```text
Input: {"tables": {"Views": [[1, 4, 2, "2024-01-01"]]}}
Output: []
Explanation: The viewer is not the author.
```
