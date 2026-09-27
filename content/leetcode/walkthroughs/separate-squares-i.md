## Intuition

For a horizontal line, each square contributes a continuous amount of area below the line.
The total below-area is monotonic as the line rises, so binary search finds the smallest height reaching half of the counted total area.

## Brute force

Testing many candidate heights on a fixed grid can miss the required floating-point precision.
Computing the exact union of overlapping squares would also solve a different problem, because the statement counts overlap separately for every square.

## Approach

1. Sum `side * side` for every square and set the target to half.
2. Bound the answer between the lowest bottom and highest top edge.
3. At each midpoint, compute each square's below-height as `clamp(mid - y, 0, side)` and sum its rectangle area.
4. Move the upper bound down when below-area reaches the target, otherwise move the lower bound up.
5. Return the upper bound after 90 iterations.

## Walkthrough

This is Example 1 from the local statement.
The squares `[0,0,2]` and `[3,2,2]` each have area 4, so the target below-area is 4.
At height 2, the first square contributes all 4 and the second contributes 0, exactly reaching the target.
Binary search narrows around that boundary and returns 2.0 within the accepted tolerance.

## Complexity

With S squares and a fixed 90 iterations, the time complexity is O(90S), effectively O(S).
The calculation uses O(1) auxiliary space beyond the input.

## Edge cases

A line below a square contributes zero from that square, and a line above its top contributes its full area.
Overlapping squares are summed independently as required.
The returned boundary is the smallest height approximated by the binary search.

## Common mistakes

Do not subtract overlap between squares.
Clamp each square's below-height to its side length.
Move the upper bound on equality so the search converges to the smallest valid height.

## Language notes

Python and Java both perform floating-point binary search for 90 iterations.
Java widens side products to `double` before accumulation, and Python's arithmetic naturally retains the required precision.
