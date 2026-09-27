# Managers with at Least 5 Direct Reports

Return the names of employees with at least five direct reports.
Reports count across departments; indirect reports do not count.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `name`; row order is unrestricted.

## Tables

### Employee

| Column | SQLite type |
| --- | --- |
| id | INTEGER |
| name | TEXT |
| department | TEXT |
| managerId | INTEGER |

## Constraints

- Employee ids are unique.
- Names and departments are non-null, but names can repeat.
- A manager id is null or refers to another employee; nobody manages themself.

## Examples

### Example 1

```text
Input: {"tables": {"Employee": [[1, "Boss", "A", null], [2, "E0", "A", 1], [3, "E1", "B", 1], [4, "E2", "A", 1], [5, "E3", "B", 1], [6, "E4", "A", 1]]}}
Output: [["Boss"]]
Explanation: Exactly five direct reports meets the threshold.
```

### Example 2

```text
Input: {"tables": {"Employee": [[1, "Boss", "A", null], [2, "E0", "A", 1], [3, "E1", "B", 1], [4, "E2", "A", 1], [5, "E3", "B", 1]]}}
Output: []
Explanation: Four direct reports are insufficient.
```
