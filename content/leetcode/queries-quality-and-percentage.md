# Queries Quality and Percentage

For each query name, compute quality as the average of `rating / position`.
Also compute the percentage of rows with rating below 3.
Round both measures to two decimal places, retaining duplicate rows in the averages.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `query_name`, `quality`, `poor_query_percentage`; row order is unrestricted.

## Tables

### Queries

| Column | SQLite type |
| --- | --- |
| query_name | TEXT |
| result | TEXT |
| position | INTEGER |
| rating | INTEGER |

## Constraints

- Rows may repeat and query names may be null.
- Position ranges from 1 to 500 and rating from 1 to 5.
- Group null query names together if present.

## Examples

### Example 1

```text
Input: {"tables": {"Queries": [["A", "x", 1, 4], ["A", "y", 2, 2], ["B", "z", 4, 4]]}}
Output: [["A", 2.5, 50.0], ["B", 1.0, 0.0]]
Explanation: A averages ratios 4 and 1, and half its ratings are poor.
```

### Example 2

```text
Input: {"tables": {"Queries": [["A", "x", 3, 1]]}}
Output: [["A", 0.33, 100.0]]
Explanation: Use fractional division before rounding.
```
