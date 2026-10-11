# Number of Unique Subjects Taught by Each Teacher

Report how many distinct subjects each teacher teaches, across all departments.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `teacher_id`, `cnt`; row order is unrestricted.

## Tables

### Teacher

| Column | SQLite type |
| --- | --- |
| teacher_id | INTEGER |
| subject_id | INTEGER |
| dept_id | INTEGER |

## Constraints

- (subject_id, dept_id) is unique per teacher.

## Examples

### Example 1

```text
Input: {"tables": {"Teacher": [[1, 2, 3], [1, 2, 4], [1, 3, 3], [2, 1, 1], [2, 2, 1], [2, 3, 1], [2, 4, 1]]}}
Output: [[1, 2], [2, 4]]
Explanation: Teacher 1 teaches subject 2 in two departments, which counts once.
```

### Example 2

```text
Input: {"tables": {"Teacher": [[9, 1, 1]]}}
Output: [[9, 1]]
Explanation: One subject.
```
