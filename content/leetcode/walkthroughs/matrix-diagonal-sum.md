## Intuition

A square matrix has a main diagonal and an opposite diagonal.
The center of an odd-sized matrix belongs to both, so it must be added once.

## Brute force

Scanning all n² cells and testing whether each belongs to a diagonal does unnecessary work.
One row index identifies both diagonal columns.

## Approach

1. For each index, add `mat[index][index]`.
2. Compute the opposite column `n - index - 1`.
3. Add that cell only when it differs from the main-diagonal column.

## Walkthrough

For Example 1, the main diagonal of `[[1,2,3],[4,5,6],[7,8,9]]` contributes 1, 5, and 9.
The opposite diagonal contributes 3 and 7, while the center 5 is skipped the second time.
The total is `1 + 5 + 9 + 3 + 7 = 25`.

## Complexity

The loop visits n rows, so time is O(n) and auxiliary space is O(1).
The Python and Java methods read cells directly and do not construct diagonal lists.

## Edge cases

For a one-cell matrix, the center is added once.
Even-sized matrices have no shared center.
Negative entries are summed without special handling.
The opposite diagonal is visited in reverse row order, but addition is commutative, so no reordering of the matrix is needed.
The algorithm also works when diagonal entries are equal because the duplicate check uses coordinates rather than values.

## Common mistakes

Do not count the odd center twice.
Use `n - index - 1` for the opposite column.
Do not assume the matrix is rectangular when the contract says square.

## Language notes

Python uses a local `opposite` variable for the second column.
Java performs the same duplicate-center guard before adding.
