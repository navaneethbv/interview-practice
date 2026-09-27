## Intuition

Rows increase left to right and columns increase top to bottom.
Start at the top-right corner, where moving left decreases values and moving down increases them.
Each comparison eliminates one full row or column.

## Brute force

Checking every cell takes O(RC) time for R rows and C columns.
Binary searching each row improves that to O(R log C) but still searches many rows.
The staircase walk uses both sorted directions and takes O(R plus C).

## Approach

1. Start at row zero and the last column.
2. Return true when the current value equals target.
3. Move left when the current value is too large.
4. Move down when it is too small.
5. Return false after leaving the matrix.

## Walkthrough

Example 1 searches target 6 in [[1,4,7],[2,5,8],[3,6,9]].
The top-right value 7 is too large, so the scan moves left to 4.
The value 4 is too small, so it moves down to 5 and then to 6.
The value equals target, so the method returns true.

## Complexity

Each step decreases the column or increases the row, so time is O(R plus C).
The method uses O(1) auxiliary space.
The matrix and target are read without modification.
The returned value is a boolean.

## Edge cases

A target smaller than the top-left value exits through the left boundary.
A target larger than the bottom-right value exits through the bottom boundary.
Single-row and single-column matrices follow the same walk.
The statement supplies a nonempty matrix.

## Common mistakes

- Starting at the top-left cannot eliminate a full row or column consistently.
- Moving diagonally after a mismatch can skip the target.
- Reversing the move conditions leaves the search in the wrong region.
- Sorting or flattening the matrix adds unnecessary work.

## Language notes

Python and Java use identical staircase invariants.
Both references access matrix[0] because the matrix contract is nonempty.
No auxiliary row or column arrays are created.
