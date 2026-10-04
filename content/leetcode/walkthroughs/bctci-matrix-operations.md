## Intuition

A square matrix rotation can be decomposed into two simpler transformations that use swaps.
Transposition exchanges the row and column roles.
A subsequent reflection chooses whether the resulting rotation is clockwise or anticlockwise.
This avoids allocating another full matrix during a transformation.

## Approach

The constructor copies the input into the stored `grid`.
For transposition, visit only positions above the main diagonal and exchange each value with its mirrored position below the diagonal.
Reflecting vertically reverses every row's column order.
Reflecting horizontally reverses the order of whole rows.
A clockwise rotation transposes first and then reflects vertically.
An anticlockwise rotation transposes first and then reflects horizontally.
Every operation mutates the same instance, so later operations observe earlier transformations.
`get_grid` returns a fresh copy, preventing a caller from modifying the stored matrix through a returned value.

## Walkthrough

Example 1 starts with rows `[1, 2]` and `[3, 4]`.
Transposition exchanges 2 and 3, creating rows `[1, 3]` and `[2, 4]`.
Vertical reflection reverses those rows into `[3, 1]` and `[4, 2]`.
The rotation operation produces `null`, and the following grid query returns that transformed matrix.

## Complexity

For an n by n grid, transpose, either rotation, and vertical reflection take O(n squared) time.
Horizontal reflection takes O(n) time because both references exchange row references.
Transformations require O(1) auxiliary space, excluding the matrix owned by the instance.
Construction and `get_grid` each require O(n squared) time and additional storage for their copies.

## Edge cases

A one-cell matrix remains unchanged under every transformation.
Four clockwise rotations restore the original matrix, while two identical reflections cancel.

## Common mistakes

Swapping both halves during transposition undoes every exchange.
Changing the order of transpose and reflection can reverse the rotation direction.

## Language notes

Python uses slice copies and list reversal.
Java clones each row separately; cloning only the outer array would still share mutable rows.
Java exposes camelCase operation names through the harness mapping.
