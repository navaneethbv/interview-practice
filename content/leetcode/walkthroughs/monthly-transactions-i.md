## Intuition
Each transaction belongs to a group formed by its calendar month and country.
Conditional aggregates can count all rows while separately summing only approved rows.
Grouping by the text prefix `YYYY-MM` avoids date parsing and preserves NULL country as its own group.

## Brute force
A separate query for every month, country, and approval state would repeatedly scan the table.
One grouped query computes all measures in a single aggregation pass chosen by SQLite's planner.

## Approach
1. Extract the first seven characters of `trans_date` as `month`.
2. Group rows by that month and `country`.
3. Count all rows and sum all amounts.
4. Count approved rows through the boolean expression `state = 'approved'`.
5. Sum approved amounts with a CASE expression that contributes zero otherwise.

## Walkthrough
Example 1 contains two US transactions in January, one approved for 10 and one declined for 20.
The US group therefore has total count 2 and amount 30.
The conditional expressions count one approved row and sum approved amount 10.
The separate CA declined row forms its own group with approved count and amount both zero.

## Complexity
The grouping and aggregate work depends on SQLite's plan and any available indexes.
The query's output uses one row per month and country group.
No guaranteed hash aggregation or row order is implied by SQLite.

## Edge cases
An empty table produces no groups.
A NULL country groups together with other NULL countries because SQL grouping treats NULL values as one group.
A zero amount contributes to counts but adds zero to sums.

## Common mistakes
Filtering to approved rows before grouping loses declined transactions from totals.
Using `COUNT(state = 'approved')` counts both true and false non-NULL expressions.
Grouping by the full date separates days instead of months.

## SQLite notes
`substr(trans_date, 1, 7)` returns the ISO month text in SQLite.
SQLite treats the approved comparison as integer 1 or 0, so `SUM(state = 'approved')` counts approvals.
The CASE expression explicitly produces zero for non-approved amounts.
