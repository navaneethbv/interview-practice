## Intuition
An email is duplicated exactly when its group contains more than one Person row.
Grouping by email and filtering the group count expresses that condition directly.

## Brute force
A self-join could compare every pair of Person rows, but it creates O(N^2) pair candidates.
Aggregation counts each email once and lets SQLite perform the duplicate test in the grouped result.

## Approach
1. Read the `email` column from `Person`.
2. Group rows by that email value.
3. Keep groups whose `COUNT(*)` exceeds one.
4. Return the grouped value under the required `Email` column alias.

## Walkthrough
Example 1 has Person rows with emails `a@x`, `a@x`, and `b@x`.
The group for `a@x` has count 2 and survives `HAVING COUNT(*) > 1`.
The group for `b@x` has count 1 and is filtered out, so the result is one row containing `a@x`.

## Complexity
SQLite must read the Person rows and build grouping state, typically O(N) input work plus the engine's grouping structure.
The grouped result contains at most one row per distinct email, so output space is O(U), where U is the number of distinct emails.
The query does not promise an order because no `ORDER BY` is requested.

## Edge cases
One row per email produces an empty result.
The same email repeated many times still appears once in the grouped output.
Email comparison follows the database's text comparison behavior.

## Common mistakes
Selecting duplicate rows without `GROUP BY` repeats an email instead of returning one grouped value.
Putting the count predicate in `WHERE` is invalid because aggregate counts exist after grouping.
Adding an unsupported ordering requirement changes the query contract.

## SQLite notes
SQLite evaluates `GROUP BY email` before the `HAVING` filter and exposes the alias `Email` in the result column.
