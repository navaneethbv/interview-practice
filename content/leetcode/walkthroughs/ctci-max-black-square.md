## Intuition

A square qualifies when its border is black; its interior can contain white cells.
Precompute how many consecutive black cells extend right and down from every location.
Four run-length checks can then verify an entire candidate border in constant time.

## Brute force

Enumerate every square and inspect every cell on its four edges.
There are O(n cubed) candidate squares in an n by n matrix, with up to O(n) edge work each, giving O(n to the fourth) time.

## Approach

Build `right` and `down` from bottom-right toward top-left.
For a black cell, extend the corresponding neighbor's run by one; white cells retain zero.
Try square sizes in descending order.
For each top-left position, check the top and left runs there, the downward run at the top-right corner, and the rightward run at the bottom-left corner.
If all reach the candidate size, return that size immediately.
Descending sizes ensure the first accepted square is globally largest.

## Walkthrough

Example 1 is a three-by-three matrix with a white center and black outer border.
The top-left right and down runs both have length three.
The top-right downward run and bottom-left rightward run also have length three.
Thus the size-three candidate passes all four checks despite the white center.
Return 3 without inspecting smaller candidates.

## Complexity

Preprocessing takes O(n squared) time and space.
Candidate enumeration takes O(n cubed) time in the worst case, because every border check is O(1).
The returned result is only the side length.

## Edge cases

An isolated black cell forms a size-one square.
An all-white matrix returns zero.
The interior does not need to be black.

## Common mistakes

Checking only top and left borders misses holes on the opposite sides.
Returning the square's area instead of its side length violates the result contract.

## Language notes

Both references allocate padded run arrays to simplify boundary reads.
Python separates candidate testing into `_has_square`; Java performs the same four checks inside its descending-size loops.
