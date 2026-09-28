## Intuition

For each email, only the row with the smallest id should remain.
A grouped subquery finds those ids, and DELETE removes every id outside that keep set.

## Brute force

Pairwise duplicate comparisons are quadratic.
Grouping by email lets SQLite compute one minimum per address.

## Approach

1. Group Person rows by email.
2. Select `MIN(id)` for each group.
3. Delete rows whose id is not among those minima.
4. The remaining table is what the judge reads.

## Walkthrough

For Example 1, email `a@x` appears with ids 5 and 2, so the subquery keeps 2.
Email `b@x` appears once and keeps 7.
The DELETE removes id 5, leaving rows `[2,"a@x"]` and `[7,"b@x"]`.

## Complexity

For P rows, grouping and the membership subquery depend on SQLite's query plan and may use sorting, temporary structures, or indexes.
A plan without useful indexes can scan Person for the grouped subquery and again for DELETE, while a materialized or indexed plan can reduce repeated work.
No output order is promised by the contract.

## Edge cases

An empty table remains empty.
A unique email is its own minimum.
The non-null email constraint makes grouping straightforward.

## Common mistakes

Keep the smallest id, not the first input row.
Group by email.
Use the DELETE statement because the judge checks table state afterward.

## SQLite notes

The SQL uses the `NOT IN` minimum-id set supplied by the local reference.
Because ids are unique, deleting ids outside that set removes exactly the duplicate rows.
