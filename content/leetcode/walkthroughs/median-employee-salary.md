## Intuition
Each company's median is found by ranking salaries within that company and selecting the middle rank or ranks.
The integer expressions `(n+1)/2` and `(n+2)/2` select one row for odd counts and two rows around the center for even counts.

## Brute force
A correlated count for every employee can compute how many salaries are below it, but it repeatedly scans a company.
Window functions rank all rows in one relational pass over the grouped partitions.

## Approach
1. Partition employees by company and order each partition by salary then id.
2. Assign a one-based row number and the partition count.
3. Keep rows whose position equals either middle expression.
4. Return id, company, and salary from those rows.

## Walkthrough
Example 1 has company A salaries 10, 20, and 30, and company B salaries 5 and 9.
For A, `n = 3`, so the expressions select position 2 and return employee 2 with salary 20.
For B, `n = 2`, so positions 1 and 2 both qualify, returning employees 4 and 5.
The output contains those three rows.

## Complexity
SQLite must partition and sort each company, with cost depending on the query plan and available indexes.
The window result carries O(N) ranked rows before filtering, and the output has at most N rows.
The salary then id ordering makes ties deterministic within each company.

## Edge cases
An odd company count returns one median row.
An even count returns the two central employees because the task asks for both middle rows.
Equal salaries remain distinct by id ordering.

## Common mistakes
Ranking globally instead of partitioning by company mixes unrelated employees.
Selecting only `(n+1)/2` omits the upper middle row for even counts.
Ordering only by salary leaves tie placement unspecified.

## SQLite notes
The query uses `ROW_NUMBER` and `COUNT` window functions in a CTE, then filters the computed positions.
No final `ORDER BY` is required by the local contract, so result row order should not be assumed.
