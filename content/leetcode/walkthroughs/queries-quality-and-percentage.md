## Intuition

Quality is the average of each row's fractional rating divided by position.
The poor percentage is the average of a boolean predicate for rating below 3, multiplied by 100.

## Brute force

Computing a separate aggregate query per query name repeats table scans.
One GROUP BY computes both metrics in each group.

## Approach

1. Convert rating to floating point before division by position.
2. Use `AVG` for quality.
3. Use `AVG(rating < 3)` for the fraction of poor rows and multiply by 100.
4. Round both expressions to two places and group by query_name.

## Walkthrough

For Example 1, query A has ratios 4/1=4 and 2/2=1, averaging to 2.5.
One of its two ratings is below 3, so its poor percentage is 50.
Query B has ratio 4/4=1 and no poor rating, producing `["B",1,0]`.

## Complexity

For Q rows, SQLite must scan the table and aggregate each group, typically O(Q) before grouping overhead.
The GROUP BY may use sorting or a temporary structure depending on the SQLite plan, so memory and exact runtime are plan-dependent.
No ORDER BY is present because result row order is unrestricted by the contract.

## Edge cases

Duplicate rows remain separate aggregate inputs.
A position of 1 leaves the rating unchanged.
SQLite groups NULL query names together.

## Common mistakes

Force floating division with `1.0*rating/position`.
Use the strict predicate `rating < 3`.
Round after aggregation, not each row.

## SQLite notes

This is SQLite SQL and has no Python or Java reference.
`ROUND` produces the required two-decimal numeric values.
