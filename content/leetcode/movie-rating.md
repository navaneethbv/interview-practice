# Movie Rating

Return two rows in a column named results: first, the name of the user who rated the most movies (lexicographically smallest on ties); second, the title of the movie with the highest average rating in February 2020 (lexicographically smallest on ties).

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `results`; rows must appear in the order described.

## Tables

### Movies

| Column | SQLite type |
| --- | --- |
| movie_id | INTEGER |
| title | TEXT |

### Users

| Column | SQLite type |
| --- | --- |
| user_id | INTEGER |
| name | TEXT |

### MovieRating

| Column | SQLite type |
| --- | --- |
| movie_id | INTEGER |
| user_id | INTEGER |
| rating | INTEGER |
| created_at | TEXT |

## Constraints

- Every rating references an existing movie and user; at least one rating falls in February 2020.

## Examples

### Example 1

```text
Input: {"tables": {"Movies": [[1, "Avengers"], [2, "Frozen 2"], [3, "Joker"]], "Users": [[1, "Daniel"], [2, "Monica"], [3, "Maria"], [4, "James"]], "MovieRating": [[1, 1, 3, "2020-01-12"], [1, 2, 4, "2020-02-11"], [1, 3, 2, "2020-02-12"], [1, 4, 1, "2020-01-01"], [2, 1, 5, "2020-02-17"], [2, 2, 2, "2020-02-01"], [2, 3, 2, "2020-03-01"], [3, 1, 3, "2020-02-22"], [3, 2, 4, "2020-02-25"]]}}
Output: [["Daniel"], ["Frozen 2"]]
Explanation: Daniel and Monica each rated three movies; Frozen 2 and Joker tie at 3.5 in February.
```

### Example 2

```text
Input: {"tables": {"Movies": [[1, "B"], [2, "A"]], "Users": [[1, "Zed"]], "MovieRating": [[1, 1, 5, "2020-02-10"], [2, 1, 5, "2020-02-11"]]}}
Output: [["Zed"], ["A"]]
Explanation: Ties are broken alphabetically.
```
