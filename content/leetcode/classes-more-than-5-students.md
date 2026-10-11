# Classes More Than 5 Students

List every class that has at least five students.

Use SQLite syntax.
Dates are ISO `YYYY-MM-DD` text.
Return columns `class`; row order is unrestricted.

## Tables

### Courses

| Column | SQLite type |
| --- | --- |
| student | TEXT |
| class | TEXT |

## Constraints

- (student, class) is unique.

## Examples

### Example 1

```text
Input: {"tables": {"Courses": [["A", "Math"], ["B", "English"], ["C", "Math"], ["D", "Biology"], ["E", "Math"], ["F", "Computer"], ["G", "Math"], ["H", "Math"], ["I", "Math"]]}}
Output: [["Math"]]
Explanation: Only Math has five or more students.
```

### Example 2

```text
Input: {"tables": {"Courses": [["A", "Art"], ["B", "Art"], ["C", "Art"], ["D", "Art"]]}}
Output: []
Explanation: Four students are not enough.
```
