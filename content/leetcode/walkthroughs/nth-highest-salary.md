## Intuition
The required rank is among distinct salaries, so duplicates must be removed before ordering.
A descending distinct query can then skip the first `n - 1` rows.
When the offset is beyond the available rows, SQLite returns NULL, matching the contract.

## Brute force
A procedural approach could collect salaries, deduplicate them, sort descending, and select a position.
SQL can express all of those operations declaratively with `DISTINCT`, `ORDER BY`, `LIMIT`, and `OFFSET`.

## Approach
1. Select distinct salaries from `Employee`.
2. Order them from highest to lowest.
3. Skip `:n - 1` rows and limit the result to one row.
4. Expose the selected value under `getNthHighestSalary`.

## Walkthrough
Example 1 has salaries 40, 60, 60, and 20 with `n = 2`.
`DISTINCT` reduces the ordered sequence to 60, 40, 20.
The offset of one skips 60, and the one-row limit returns 40.
Example 2 has only one distinct salary but offset 2, so the scalar subquery produces NULL.

## Complexity
The query must deduplicate and order salaries, with time and temporary storage determined by SQLite's plan and indexes.
The `LIMIT 1` result itself has constant cardinality.
No guaranteed sort implementation is claimed because SQLite may choose different plans.

## Edge cases
An empty table produces a single output row containing NULL through the scalar subquery.
Repeated salaries count once.
The positive `:n` parameter makes the offset expression well-defined.

## Common mistakes
Omitting `DISTINCT` treats duplicate employees as separate ranks.
Ordering ascending selects the wrong side of the salary list.
Returning no row for a missing rank differs from the required one-row NULL result.

## SQLite notes
SQLite accepts a named parameter in the `OFFSET` expression as used here.
The scalar subquery is aliased exactly as required by `resultColumns`.
NULL is produced naturally when `OFFSET` exceeds the distinct salary rows.
