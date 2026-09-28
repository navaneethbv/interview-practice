## Intuition

Every employee must remain eligible when no bonus row exists, while a recorded bonus qualifies only when it is below 1000.
A left join preserves employees without matches and makes missing bonuses null.

## Brute force

A separate query could find employees with bonuses and another could find employees without them, then combine the results.
The single left join handles both cases in one relation.

## Approach

1. Start with `Employee` as `e` and left join `Bonus` as `b` by `empId`.
2. Keep rows where `b.bonus < 1000` or `b.bonus IS NULL`.
3. Select `e.name` and `b.bonus` under the required columns.

## Walkthrough

For Example 1, Ana has no bonus row, so her joined bonus is null and she qualifies.
Bo has bonus 999, which is below 1000 and qualifies.
Cy has exactly 1000, which fails the strict comparison, producing Ana and Bo only.

## Complexity

Join and filtering time depends on indexes and SQLite's plan: indexed nested-loop lookups can be near linear in employees, while unindexed nested loops can approach the product of table sizes.
The join may use indexed or temporary storage proportional to participating rows.

## Edge cases

A bonus of zero is recorded and qualifies, while a missing row produces SQL null.
The strict threshold excludes exactly 1000.

## Common mistakes

- Using an inner join drops employees without bonus records.
- Testing `b.bonus <= 1000` incorrectly includes the threshold.
- Checking `b.bonus = NULL` never matches because SQL null requires `IS NULL`.

## SQLite notes

The query uses standard SQLite `LEFT JOIN`, null predicates, and integer comparison.
The result is unordered under the spec, so no `ORDER BY` is needed.
