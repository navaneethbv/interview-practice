## Intuition

The requested value is the second distinct salary, so duplicate rows must be collapsed before ranking.
Sorting distinct salaries descending places the answer at offset one.
A scalar subquery that has no second row evaluates to SQL NULL, which is exactly the required result for missing answers.

## Brute force

A valid alternative could scan the table twice, first finding the maximum and then the largest salary below it.
The ordered distinct subquery expresses the same ranking in one query and lets SQLite produce NULL when the second value is absent.
Either approach must handle an empty table and duplicate salaries explicitly.

## Approach

1. The query selects DISTINCT salary from Employee.
2. It orders those values descending so the largest is first.
3. LIMIT 1 OFFSET 1 selects the second row.
4. The scalar subquery is returned with the exact alias SecondHighestSalary.
5. If fewer than two distinct salaries exist, the scalar subquery returns NULL while the outer query still emits one row.

## Walkthrough

For Example 1, the salaries are 40, 60, 60, and 20.
Distinct descending order is 60, 40, 20.
Offset one skips 60 and selects 40.
The result is one row containing 40 under SecondHighestSalary.
For Example 2, both rows contain 7, so the distinct stream has only one row.
Offset one finds no row and SQLite returns NULL.

## Complexity

The query's ordering step typically takes O(m log m) time for m employee rows and may use O(m) temporary storage.
The DISTINCT operation is part of that same ranking work.
SQLite may choose an index or another plan, so these are the natural comparison-based bounds rather than a mandated physical plan.

## Edge cases

An empty table still produces one result row with NULL.
One distinct salary produces NULL.
Repeated top salaries count once.
Negative and zero salaries remain valid integers and are ranked normally.

## Common mistakes

Do not use OFFSET 1 without DISTINCT, because duplicate top salaries would be mistaken for a second salary.
Do not filter out NULL after the scalar subquery, because the missing-answer row is required.
Do not return the employee id or a differently named column.

## SQLite notes

The reference uses SQLite-compatible LIMIT and OFFSET syntax.
The scalar subquery preserves one output row even when the inner query is empty.
No Python or Java reference is needed for this SQL-only problem.
