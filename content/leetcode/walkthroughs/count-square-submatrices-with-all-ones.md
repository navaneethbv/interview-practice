## Intuition

For a cell containing one, the largest square ending there is one plus the smallest square capacity from its top, left, and top-left neighbors.
The capacity also counts every smaller square ending at that cell.

## Brute force

Enumerating every top-left corner and square size costs at least O(RC times min(R,C)) checks.
Checking every cell inside each candidate can be even more expensive.

## Approach

1. Keep the previous row of square capacities.
2. Build the current row from left to right.
3. For each one, add one plus the minimum of the three neighbor capacities to the total.
4. Replace the previous row after processing the row.

## Walkthrough

Example 1:

For a 2 by 2 matrix of ones, each corner cell first contributes one.
The bottom-right cell sees capacities one above, one to the left, and one diagonally, so it contributes two.
The total is 1 plus 1 plus 1 plus 2, or 5.

## Complexity

Every matrix cell is processed once, giving O(RC) time.
The rolling rows use O(C) auxiliary space beyond the scalar answer.
The output is an integer, so no result-size storage is added.

## Edge cases

A zero cell contributes no square and resets its current capacity.
A one-row matrix counts one square for each one cell.
The matrix is guaranteed nonempty by the problem contract.

## Common mistakes

Use the minimum of all three neighbors, not their maximum.
Do not retain a stale current-row value after a zero.
Count every capacity, because a size-two square contains a size-one square ending at the same cell.

## Language notes

Python uses a leading zero sentinel in each rolling row.
Java uses primitive arrays with the same sentinel column and integer arithmetic.
