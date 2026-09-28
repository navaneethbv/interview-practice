## Intuition
The next number always travels along the current outer boundary, then the boundary shrinks inward.
Four limits, `top`, `right`, `bottom`, and `left`, describe the unfilled rectangle.
Filling its four sides in order and moving the limits prevents revisiting cells.

## Brute force
A direction simulation could mark visited cells and turn whenever the next cell leaves the matrix or is already filled.
That works in O(n squared) time but needs an additional visited structure or sentinel checks.
Shrinking boundaries uses only a few integers.

## Approach
1. Create an n by n zero matrix and initialize the four boundaries.
2. Fill the top row from left to right, then move `top` down.
3. Fill the right column downward, then move `right` left.
4. If rows remain, fill the bottom row right to left and move `bottom` up.
5. If columns remain, fill the left column upward and move `left` right.
6. Repeat while the boundaries still overlap.

## Walkthrough
Example 1 has `n = 2`.
The top row receives 1 then 2, and the top boundary moves inward.
The remaining right-column cell at row 1 receives 3, and the right boundary moves inward.
The remaining bottom-row cell at column 0 receives 4.
The result is `[[1, 2], [4, 3]]`.

## Complexity
Each of the n squared cells is written exactly once, so time is O(n squared).
The matrix itself uses O(n squared) output space, with O(1) additional boundary state.

## Edge cases
For n equal to one, the top-row pass writes the only cell.
The guard checks prevent double-filling the center of odd-sized matrices.
After a side is filled, its boundary must move before the next side is considered.

## Common mistakes
Filling the bottom or left side without checking overlap duplicates cells.
Moving boundaries in the wrong order rotates or skips the spiral.
Stopping after only three sides leaves the next inner layer incomplete.

## Language notes
Python builds nested lists and assigns cells directly.
Java allocates an `int[][]` and uses post-increment while writing each value.
Both use integer counters because the largest value is n squared and n is at most 20.
