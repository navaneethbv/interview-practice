# Rank Scores

Assign dense ranks to scores from highest to lowest.
Equal scores receive the same rank, and the next smaller distinct score gets the next integer.
Sort the result by score descending.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `score`, `rank` in the required row order.

## Tables

### Scores

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| score | REAL |

## Constraints

- Score ids are unique.
- Scores are non-null decimal numbers with two fractional digits.
- The table may be empty.

## Examples

### Example 1

```text
Input: {"tables": {"Scores": [[1, 4.5], [2, 3.0], [3, 4.5]]}}
Output: [[4.5, 1], [4.5, 1], [3.0, 2]]
Explanation: Both top scores share rank 1.
```

### Example 2

```text
Input: {"tables": {"Scores": [[8, 2.25]]}}
Output: [[2.25, 1]]
Explanation: A sole score has rank 1.
```
