## Intuition

Adjacent sign flips let us make all magnitudes positive when the number of negative entries is even.
When it is odd, one entry must remain negative, so choose the smallest magnitude to lose the least sum.

## Brute force

Trying sequences of adjacent sign flips is exponential in the number of cells and obscures the invariant.
The operation preserves the parity of the negative count, which completely determines the optimum after magnitudes are summed.

## Approach

1. Sum every absolute value and count negative entries.
2. Track the smallest absolute value in the matrix.
3. Return the absolute sum when negative parity is even.
4. Otherwise subtract twice the smallest magnitude.

## Walkthrough

This is Example 1 from the local statement.
The matrix `[[1,-1],[-1,1]]` has absolute sum 4 and two negative entries.
The parity is even, so adjacent flips can make every entry positive and the maximum sum is 4.
In Example 2, one negative remains necessary, and choosing magnitude 1 produces `-1 + 2 + 3 + 4 = 8`.

## Complexity

The matrix is scanned once, taking O(n²) time for an n by n matrix.
Only the sum, negative count, and minimum magnitude are stored, so auxiliary space is O(1).

## Edge cases

An odd negative count with a zero entry loses no sum because the smallest magnitude is zero.
Positive and negative entries can have repeated magnitudes.
The Java total uses `long` because up to 62500 cells contribute.

## Common mistakes

Track the smallest absolute value, not the smallest signed value.
Use negative parity rather than the number of operations.
Subtract `2 * minimumMagnitude` only when parity is odd.

## Language notes

Python flattens the matrix into a list, while Java scans rows directly to keep constant auxiliary storage.
Java widens the absolute-value total and final correction to `long`.
