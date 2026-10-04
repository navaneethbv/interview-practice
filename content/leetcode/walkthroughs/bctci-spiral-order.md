## Intuition

An outward square spiral grows its straight-leg length after every two turns.
Starting downward, the direction cycle is down, left, up, right in row-column coordinates.
Lengths 1, 1, 2, 2, 3, 3, and so on trace successive expanding boundaries around the center.

## Approach

Allocate an n by n grid of zeros and place the current position at its center.
The zero already there is the first spiral value.
Initialize the next value to one, the leg length to one, and the direction to down.
For each leg length, walk two legs, writing one increasing value at every step and rotating direction after each leg.
Then increment the leg length.
Stop immediately after placing `n * n - 1`, even if the current leg would otherwise continue outside the completed square.
The odd-size guarantee provides one unambiguous central cell and a square boundary reached by this outward traversal.

## Walkthrough

Example 1 uses n equal to three and starts zero at `(1, 1)`.
Move down to place 1, then left to place 2.
The next two-step leg moves upward, placing 3 and 4.
Moving right twice places 5 and 6 across the top row.
The next downward leg places 7 and 8 along the right column, completing the grid before another step is attempted.
The rows are `[4, 5, 6]`, `[3, 0, 7]`, and `[2, 1, 8]`.

## Complexity

Both references write every grid cell once, taking O(n squared) time.
The returned grid uses O(n squared) storage, while position, direction, and leg counters use O(1) extra space.

## Edge cases

For n equal to one, the initialized grid is already complete and the traversal never begins.
Larger odd sizes use the same direction and leg schedule without separate layers.

## Common mistakes

Starting upward or turning in the opposite direction produces a different spiral.
Check completion inside a leg so the next planned step cannot leave the grid.

## Language notes

Python checks for completion inside the step loop and returns immediately.
Java includes the completion condition in its loop headers; both use the same four direction vectors.
