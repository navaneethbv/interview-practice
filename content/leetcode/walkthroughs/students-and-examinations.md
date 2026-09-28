## Intuition

The required output contains the Cartesian product of every student and every subject, even when no exam row matches.
A cross join creates those combinations, and a left join preserves zero-attendance combinations while `COUNT(e.student_id)` counts duplicate exams.

## Brute force

Running a separate count query for each student-subject pair repeats scans of Examinations.
One grouped join lets SQLite build all results in one query plan.

## Approach

1. Cross join Students with Subjects.
2. Left join Examinations on both student id and subject name.
3. Count the matched student ids for each combination.
4. Group by the student and subject columns and order by student id, then subject name.

## Walkthrough

For Example 1, the cross join produces Ana-Math and Bo-Math.
Two matching examination rows join to Ana-Math, so its count is 2.
Bo-Math has no match, but the left join keeps the row and `COUNT(e.student_id)` returns 0.
The ordered result is `[[1,"Ana","Math",2],[2,"Bo","Math",0]]`.

## Complexity

If there are S students, U subjects, and E examinations, the logical cross product has S*U rows.
SQLite may use nested-loop joins, indexes, or other plan choices, so the practical cost depends on its plan and available indexes.
Grouping and sorting can require memory and time proportional to the produced combinations, and the explicit ORDER BY requires sorting when no suitable order is available.

## Edge cases

Repeated examination rows count separately.
A student with no exams still appears once per subject.
The cross join also returns every student-subject pair when Examinations is empty.

## Common mistakes

Put both join keys in the LEFT JOIN condition.
Count a nullable joined column, not `COUNT(*)`, for zero rows.
Keep the required ORDER BY because this statement specifies row order.

## SQLite notes

This is SQLite SQL, so no Python or Java reference is used.
The query preserves duplicate exam records through the grouped left join.
