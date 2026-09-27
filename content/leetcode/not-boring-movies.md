# Not Boring Movies

Select movies with an odd id whose description is not `boring`.
Order them by rating from highest to lowest.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `id`, `movie`, `description`, `rating` in the required row order.

## Tables

### Cinema

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| movie | TEXT |
| description | TEXT |
| rating | REAL |

## Constraints

- Movie ids are unique positive integers.
- Text and ratings are non-null.
- Ratings are between 0 and 10 with two decimal digits.
- Test fixtures avoid rating ties among selected movies.

## Examples

### Example 1

```text
Input: {"tables": {"Cinema": [[1, "A", "fun", 8.0], [2, "B", "fun", 9.0], [3, "C", "boring", 10.0], [5, "D", "drama", 9.5]]}}
Output: [[5, "D", "drama", 9.5], [1, "A", "fun", 8.0]]
Explanation: Even ids and boring descriptions are removed.
```

### Example 2

```text
Input: {"tables": {"Cinema": [[1, "A", "boring", 7.0]]}}
Output: []
Explanation: The only movie is excluded.
```
