## Intuition

A product qualifies only when both independent flags are Y.
A SQL WHERE clause can test those two conditions directly and discard every other row.
The query returns only product_id, which matches the result contract.

## Brute force

A client-side approach could load every product and filter rows in application code.
That transfers unnecessary columns and rows and performs the filtering outside SQLite.
The database can evaluate both predicates while scanning Products.

## Approach

1. Read product_id from Products.
2. Keep rows whose low_fats value equals 'Y'.
3. Keep only those rows whose recyclable value also equals 'Y'.
4. Return the remaining product_id values.

## Walkthrough

Example 1 contains rows [1,Y,N], [2,N,Y], and [3,Y,Y].

| product_id | low_fats | recyclable | selected |
| ---: | --- | --- | --- |
| 1 | Y | N | no |
| 2 | N | Y | no |
| 3 | Y | Y | yes |

The result is [[3]].

## Complexity

Let p be the number of rows in Products.
Without an index, SQLite checks each row once, so the scan takes O(p) time.
The query uses O(1) explicit working space, aside from SQLite's internal execution structures.
The output contains one product_id for each qualifying row.

## Edge cases

An empty Products table returns no rows.
A row with only one Y flag is excluded.
Several qualifying products all produce their own product_id row.
The contract excludes NULL flags, so SQL three-valued NULL behavior does not affect these tests.

## Common mistakes

- Using OR returns products that satisfy only one flag.
- Selecting all columns violates the requested result shape.
- Comparing against lowercase y misses the contract's uppercase values.
- Adding an ORDER BY is unnecessary because row order is unrestricted.

## SQLite notes

The reference uses standard SQLite SELECT, FROM, and WHERE syntax.
SQLite stores the flags as TEXT and compares them with single-quoted string literals.
No MySQL-only function or date behavior is needed for this query.
The judge creates a fresh in-memory Products table for each test.
