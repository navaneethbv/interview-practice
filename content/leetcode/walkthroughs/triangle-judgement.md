## Intuition
Three positive lengths form a nondegenerate triangle exactly when the sum of every pair is strictly greater than the third length.
Checking all three inequalities directly mirrors the contract and rejects flat equality cases.

## Brute force
There is no useful search space because each row is an independent triple.
A direct boolean expression is constant work per row.

## Approach

1. Select the original `x`, `y`, and `z` columns.
2. Use a `CASE` expression that returns `Yes` when `x+y>z`, `x+z>y`, and `y+z>x` all hold.
3. Return `No` otherwise.
4. Do not use non-strict comparisons because equality creates a degenerate straight line.

## Walkthrough
For Example 1, `(3,4,5)` satisfies `3+4>5`, `3+5>4`, and `4+5>3`, so it receives `Yes`.
The triple `(2,3,5)` fails because `2+3` equals 5 rather than exceeding it, so it receives `No`.
Equal sides `(2,2,2)` satisfy all strict inequalities and receive `Yes`.

## Complexity
The expression performs constant work per row, so the logical time is O(r) for r triangle rows.
SQLite may scan the table because no ordering is required, with storage determined by the actual query plan.

## Edge cases
Positive lengths are guaranteed by the contract.
Equality in any one inequality is enough to reject the row.
The output row order is unrestricted.

## Common mistakes
Check all three inequalities rather than only the largest side unless you explicitly sort first.
Use `>` rather than `>=`.
Return the required strings `Yes` and `No` with matching capitalization.

## SQLite notes
Use `CASE WHEN ... THEN 'Yes' ELSE 'No' END AS triangle`.
Select the original columns so the output schema remains `x`, `y`, `z`, `triangle`.
