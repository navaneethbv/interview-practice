## Intuition

A teacher may teach the same subject in several departments; the count should ignore that repetition.

## Approach

1. Group Teacher by `teacher_id`.
2. Count `DISTINCT subject_id` in each group.

## Walkthrough

In Example 1, teacher 1 teaches subject 2 in departments 3 and 4 and subject 3 in department 3, so the count is 2. Teacher 2 teaches four different subjects.

## Complexity

- Time: O(N log N) for N rows to group and deduplicate subjects.
- Space: proportional to the result and any grouping state.

## Edge cases

- One teacher teaching one subject in many departments counts 1.
- An empty table returns no rows.

## Common mistakes

- Using `COUNT(*)` or `COUNT(subject_id)` counts department repeats.

## SQLite notes

`COUNT(DISTINCT column)` is supported directly in SQLite.
