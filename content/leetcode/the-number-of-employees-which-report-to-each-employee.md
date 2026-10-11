# The Number of Employees Which Report to Each Employee

A manager has at least one direct report. For each manager, report the number of direct reports and their average age rounded to the nearest integer (halves round up). Order by employee_id.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `employee_id`, `name`, `reports_count`, `average_age`; rows must appear in the order described.

## Tables

### Employees

| Column | SQLite type |
| --- | --- |
| employee_id | INTEGER |
| name | TEXT |
| reports_to | INTEGER |
| age | INTEGER |

## Constraints

- reports_to is null or an existing employee_id; ages are positive.

## Examples

### Example 1

```text
Input: {"tables": {"Employees": [[9, "Hercy", null, 43], [6, "Alice", 9, 41], [4, "Bob", 9, 36], [2, "Winston", null, 37]]}}
Output: [[9, "Hercy", 2, 39]]
Explanation: Hercy's reports average 38.5, which rounds to 39.
```

### Example 2

```text
Input: {"tables": {"Employees": [[1, "Michael", null, 45], [2, "Alice", 1, 38], [3, "Bob", 1, 42], [4, "Charlie", 2, 34], [5, "David", 2, 40], [6, "Eve", 3, 37], [7, "Frank", null, 50], [8, "Grace", null, 48]]}}
Output: [[1, "Michael", 2, 40], [2, "Alice", 2, 37], [3, "Bob", 1, 37]]
Explanation: Only direct reports count.
```
