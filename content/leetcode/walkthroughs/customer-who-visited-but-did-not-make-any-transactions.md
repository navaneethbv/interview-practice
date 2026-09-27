## Intuition
A visit without a transaction is identified by the absence of a matching transaction row.
A left join keeps every visit, and filtering for a NULL transaction key leaves exactly those visits.
Grouping the remaining visits by customer produces the requested counts.

## Brute force
The query could use `NOT EXISTS` for each visit, which expresses the same anti-match condition.
The left join is a direct relational form and also makes it clear that a transaction amount of zero still counts as a match.

## Approach
1. Start with every row in `Visits`.
2. Left join `Transactions` on `visit_id`.
3. Keep rows where the joined transaction visit id is NULL.
4. Group by `customer_id` and count the surviving visits.

## Walkthrough
Example 1 has visits 1 and 2 for customer 5, and visit 3 for customer 7.
Only visit 1 matches the transaction table.
The left join therefore leaves visits 2 and 3 with NULL transaction columns.
Grouping them returns customer 5 with count 1 and customer 7 with count 1.

## Complexity
Join, filtering, and grouping costs depend on SQLite's query plan and indexes on the join key.
The grouped result stores one row per customer with at least one transaction-free visit.
No fixed hash-join or sort cost is promised because SQLite may choose another plan.

## Edge cases
An empty visit table returns no rows.
A zero-amount transaction still creates a non-NULL match and excludes its visit.
Several transaction rows for one visit still exclude that visit once.

## Common mistakes
Using an inner join removes the transaction-free visits before they can be counted.
Filtering `amount = 0` confuses amount with transaction existence.
Grouping by visit instead of customer returns the wrong granularity.

## SQLite notes
The `LEFT JOIN ... IS NULL` anti-join works with SQLite NULL semantics.
`COUNT(*)` counts each unmatched visit exactly once after the join filter.
The result is unordered, so the query does not add an `ORDER BY` clause.
