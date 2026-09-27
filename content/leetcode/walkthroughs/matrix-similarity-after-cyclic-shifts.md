## Intuition
A row is unchanged by its cyclic shift exactly when each entry equals the entry at its shifted destination.
The parity of a row does not matter for equality because shifting left or right by k compares the same cyclic offset after normalization.

## Brute force
Constructing every shifted row allocates O(RC) temporary values and then compares them.
Direct modular indexing checks the condition in place.

## Approach
1. Reduce `k` modulo the column count.
2. For each row and column, compare `row[column]` with `row[(column + shift) % columns]`.
3. Return false on the first mismatch.
4. Return true after every comparison succeeds.

## Walkthrough
For Example 1, each row of `[[1,2,1,2],[3,4,3,4]]` repeats every two positions.
With shift 2, each value compares equal to the value two positions later, so the matrix is similar.
For a one-row matrix `[1,2,3]` and shift 1, position 0 compares 1 with 2 and fails immediately.

## Complexity
Every cell is checked once, so time is O(RC).
Only the normalized shift and loop state are stored, using O(1) auxiliary space.

## Edge cases
A shift equal to the width becomes zero.
Rows with repeated patterns can remain unchanged for nonzero shifts.
The parity-specific directions produce the same equality test after wrapping for this contract.

## Common mistakes
Use modulo to wrap the destination column.
Do not compare against a shifted matrix that was already modified.
Normalize large k values before indexing.

## Language notes
Python and Java both read the original rows without mutation.
Java delegates the per-row check to a helper.
