## Intuition
Dense ranking assigns one rank to each distinct score and increments only when the score changes.
A window function can compare every row with the ordered distinct values while retaining duplicate rows.
Ordering the final rows by score descending gives the required presentation.

## Brute force
A correlated count of distinct scores greater than each row can compute the rank, but it repeats work for every score.
`DENSE_RANK` expresses the ranking rule directly and lets SQLite choose its window execution plan.

## Approach
1. Partitioning is unnecessary because all scores share one ranking sequence.
2. Apply `DENSE_RANK() OVER (ORDER BY score DESC)` to assign ranks.
3. Return each score with its rank.
4. Order the rows by score descending.

## Walkthrough
Example 1 has scores 4.5, 3.0, and another 4.5.
The descending distinct values are 4.5 then 3.0.
Both 4.5 rows receive rank 1, and 3.0 receives rank 2 with no gap.
The final order keeps both top rows before the lower score.

## Complexity
The window ordering and final ordering depend on SQLite's plan and temporary sort structures.
The result contains one row per source score, including duplicates.
No constant or hash-based ranking cost is guaranteed.

## Edge cases
An empty table returns no rows.
A single score receives rank 1.
Equal decimal values share a rank because the window order compares the stored numeric value.

## Common mistakes
`RANK` creates gaps after ties, unlike dense rank.
Adding `DISTINCT` to the final projection would remove duplicate score rows.
Ordering ascending reverses the required rank direction.

## SQLite notes
SQLite supports `DENSE_RANK` as a window function.
The outer `ORDER BY score DESC` is necessary because window ranking does not itself guarantee final row order.
REAL values are used according to the table schema and local SQLite comparisons.
