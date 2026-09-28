## Intuition

An author qualifies when at least one row has the same `author_id` and `viewer_id`.
The query can filter those self-views, then use `DISTINCT` so multiple viewed articles do not duplicate an author.

## Brute force

A client-side approach would load all rows, compare every viewer with every author, and deduplicate afterward.
That wastes transfer and memory when the database can perform both filtering and deduplication during the query.

## Approach

1. Select rows from `Views` where `author_id = viewer_id`.
2. Project the matching `author_id` as the required `id` column.
3. Apply `DISTINCT` to return each qualifying author once.
4. Order by `id` as required by the local statement.

## Walkthrough

In Example 1, the self-view rows have author ids 4, 2, and 4.
`DISTINCT` reduces them to 4 and 2, and `ORDER BY id` returns `[2,4]`.
Rows where author and viewer differ are discarded before deduplication.

## Complexity

SQLite scans the `Views` rows unless an index is available, so the plan is O(v) scan work plus distinct and sort work.
The exact distinct and sort costs depend on SQLite's temporary b-tree plan and the number of qualifying authors.

## Edge cases

An empty table returns no rows.
An author viewing several of their own articles still appears once.
The comparison uses equality and does not confuse a viewer who only read another author's article with a self-view.

## Common mistakes

Do not select `viewer_id` without checking it equals `author_id`.
Do not omit `DISTINCT`, because one author can self-view several articles.
Do not promise row order without an `ORDER BY` clause.

## SQLite notes

The reference uses SQLite's ordinary equality, `DISTINCT`, and `ORDER BY` syntax.
The local result contract requires the column name `id` and ascending order, so the query aliases `author_id` and orders it explicitly.
This statement does not need MySQL-only functions or date handling.
