# Students and Examinations

Return every student and subject combination, with the number of matching examination records.
Combinations with no attendance have count zero.
Sort by student id and then subject name, both ascending.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text and timestamps use `YYYY-MM-DD HH:MM:SS`.
Return columns `student_id`, `student_name`, `subject_name`, `attended_exams` in the required row order.

## Tables

### Students

| Column | SQLite type |
| --- | --- |
| student_id | INTEGER |
| student_name | TEXT |

### Subjects

| Column | SQLite type |
| --- | --- |
| subject_name | TEXT |

### Examinations

| Column | SQLite type |
| --- | --- |
| student_id | INTEGER |
| subject_name | TEXT |

## Constraints

- Student ids and subject names are unique in their respective tables.
- Names are non-null; student names may repeat.
- Examination rows reference existing students and subjects and may repeat.

## Examples

### Example 1

```text
Input: {"tables": {"Students": [[1, "Ana"], [2, "Bo"]], "Subjects": [["Math"]], "Examinations": [[1, "Math"], [1, "Math"]]}}
Output: [[1, "Ana", "Math", 2], [2, "Bo", "Math", 0]]
Explanation: Repeated examinations count separately and missing ones count as zero.
```

### Example 2

```text
Input: {"tables": {"Students": [[1, "Ana"]], "Subjects": [["Zoology"], ["Art"]], "Examinations": []}}
Output: [[1, "Ana", "Art", 0], [1, "Ana", "Zoology", 0]]
Explanation: Subjects are sorted alphabetically.
```
