## Intuition

For each nonzero entry in mat1, only nonzero entries in the corresponding row of mat2 can contribute.
Skipping zero products preserves the matrix product while reducing work on sparse inputs.

## Brute force

The dense triple loop performs m*k*n multiplications regardless of zeros.
The sparse loop skips an entire inner row when mat1's shared entry is zero and skips zero mat2 entries when possible.

## Approach

1. Allocate the m by n result matrix.
2. Record nonzero `(column,value)` pairs for each mat2 row in Python.
3. For each nonzero mat1 shared value, add its products into result columns.
4. Return the completed matrix.

## Walkthrough

For Example 1, mat1 `[1,0,2]` and mat2 column `[3,4,5]` share one row.
The zero middle entry contributes nothing, while the other two products are 3 and 10.
Their sum is 13.

## Complexity

For dense dimensions m,k,n, the worst case is O(mkn) time and O(mn) output space.
Python additionally stores O(kn) row pairs in its sparse representation, while Java keeps no auxiliary sparse copy.

## Edge cases

All-zero rows leave result entries zero.
Negative products add normally.
The shared dimension matches by contract.

## Common mistakes

Use mat2's row indexed by the shared coordinate.
Do not omit the output matrix's zero initialization.
Skip only true zero values.

## Language notes

Python explicitly stores nonzero mat2 entries to exploit sparsity.
Java checks mat2 values inside the inner column loop and uses only the result matrix.
The result dimensions follow the outer rows of mat1 and the columns of mat2.
