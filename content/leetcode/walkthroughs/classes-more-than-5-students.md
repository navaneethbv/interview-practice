## Intuition

The condition is about the size of each class, which is known only after grouping, so it belongs in `HAVING`.

## Approach

1. Group Courses by `class`.
2. Keep groups with `COUNT(student) >= 5`.

## Walkthrough

In Example 1, Math has six students and every other class has one, so only Math is returned.

## Complexity

- Time: O(N log N) for N rows.
- Space: proportional to the result and any grouping state.

## Edge cases

- Exactly five students qualifies.
- Four students do not.
- Each (student, class) pair is unique, so no deduplication is needed.

## Common mistakes

- Putting `COUNT` in `WHERE`, which is evaluated before grouping.
- Using `> 5` despite the at-least-five rule.

## SQLite notes

`HAVING` filters groups after aggregation in SQLite as in other databases.
