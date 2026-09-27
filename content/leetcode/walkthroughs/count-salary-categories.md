## Intuition

The required output always has three categories, even when a category has no accounts.
Three filtered counts combined with `UNION ALL` preserve those rows and keep the inclusive middle range explicit.

## Brute force

Counting rows in application code would require transferring the full table and manually constructing zero-count categories.
The database can perform each predicate and count directly.

## Approach

1. Count incomes below 20000 and label the result `Low Salary`.
2. Count incomes from 20000 through 50000 with `BETWEEN` and label it `Average Salary`.
3. Count incomes above 50000 and label it `High Salary`.
4. Combine all three rows with `UNION ALL`.

## Walkthrough

This is Example 1 from the local statement.
The incomes 19999, 20000, 50000, and 50001 match the low, average, average, and high predicates.
The three counts are therefore 1, 2, and 1, producing exactly the requested category rows.
With an empty table, each individual `COUNT(*)` still returns one row with zero, so the union keeps all categories.

## Complexity

SQLite may scan `Accounts` once for each union branch, giving O(3a) predicate work without suitable indexes.
The three aggregate branches use constant result storage, and the local comparison leaves row order unrestricted.

## Edge cases

Income exactly 20000 or 50000 belongs to Average Salary.
An empty table must still return three rows.
The nonnegative, non-null income contract removes NULL classification ambiguity.

## Common mistakes

Do not use strict inequalities for both sides of the average range.
Use `UNION ALL` so each category row is retained even when counts match.
Do not omit a category just because its count is zero.

## SQLite notes

SQLite supports `COUNT(*)`, aliases, `BETWEEN`, and `UNION ALL` used by the reference.
The query has no `ORDER BY` because the spec compares rows unordered, so SQLite does not promise a category order.
