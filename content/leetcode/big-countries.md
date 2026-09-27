# Big Countries

List countries whose area is at least 3000000 or whose population is at least 25000000.
Either condition is sufficient.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `name`, `population`, `area`; row order is unrestricted.

## Tables

### World

| Column | SQLite type |
| --- | --- |
| name | TEXT |
| continent | TEXT |
| area | INTEGER |
| population | INTEGER |
| gdp | INTEGER |

## Constraints

- Country names are unique.
- Area, population, and GDP are nonnegative integers; continent is non-null.

## Examples

### Example 1

```text
Input: {"tables": {"World": [["A", "X", 3000000, 5, 10], ["B", "X", 10, 25000000, 20], ["C", "Y", 2999999, 24999999, 1]]}}
Output: [["A", 5, 3000000], ["B", 25000000, 10]]
Explanation: Both thresholds are inclusive.
```

### Example 2

```text
Input: {"tables": {"World": [["D", "X", 4000000, 30000000, 1]]}}
Output: [["D", 30000000, 4000000]]
Explanation: Meeting both conditions still yields one row.
```
