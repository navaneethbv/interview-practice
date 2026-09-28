## Intuition

Place one queen per row and represent occupied columns and diagonals as bit masks.
The available positions in a row are the board mask with all attacked bits removed.

## Brute force

Trying every board arrangement is n^(n) scale and checks conflicts repeatedly.
Bit masks reject attacked columns and diagonals before recursion.

## Approach

1. Compute the n-bit board mask.
2. Derive available bits from columns and both shifted diagonal masks.
3. Remove the lowest available bit, recurse to the next row, and accumulate counts.
4. Return one when all columns are occupied, meaning every row has a queen.

## Walkthrough

For Example 1, n=4 and the first row has four choices.
The mask updates after each choice remove its column and diagonal attacks.
Only two complete branches survive all four rows, so the result is 2.

## Complexity

The backtracking worst case is O(n!) placements with O(n) recursion depth.
The three integer masks use O(1) auxiliary space besides the call stack.
Python integers and Java ints hold the local n<=9 masks.

## Edge cases

n=1 has one placement.
For n=2 and n=3, every branch eventually conflicts and the result is zero.
Rotations and reflections remain separate branches as required.

## Common mistakes

Shift diagonal masks after placing a bit.
Mask shifted values back to n board columns.
Count complete rows only after all n queens are placed.

## Language notes

Both implementations extract the lowest set bit with `choices & -choices`.
No board matrix is allocated.
The bit representing the current row is removed from future column choices as soon as it is placed.
