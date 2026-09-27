## Intuition

One pass through the instructions reveals whether repeated passes can drift forever.
If the robot returns to the origin, repeating that closed route is bounded.
If it ends facing a different direction, later passes rotate the same displacement until the displacements cancel.

## Brute force

Simulating indefinitely cannot establish that a path remains bounded.
Four complete passes are sufficient, but the final position and direction after just one pass already determine the answer.
This removes the need to choose an arbitrary simulation cutoff or track visited positions.

## Approach

1. Use direct simulation with coordinates `x`, `y`, and a direction index initially zero.
2. Store north, east, south, and west in that order in `directions`.
3. Update the index modulo four for each turn, or add the selected movement vector for `G`.
4. Return true when both coordinates are zero or the final direction differs from north.

For a quarter turn, four rotated copies of any displacement sum to zero.
For a half turn, two copies cancel.
With no net turn, a nonzero displacement repeats unchanged and grows without bound.

## Walkthrough

Example 1 uses `instructions = "GL"`.

| Instruction | x | y | direction |
| --- | ---: | ---: | --- |
| start | 0 | 0 | north, 0 |
| G | 0 | 1 | north, 0 |
| L | 0 | 1 | west, 3 |

The robot has not returned home, but its direction changed, so the result is true.
Repeating the whole block moves through `(0,1)`, `(-1,1)`, `(-1,0)`, and `(0,0)` at the ends of successive passes.

## Complexity

For n instructions, time is O(n), since each instruction performs constant work.
Auxiliary space is O(1), using two coordinates, an index, and four fixed vectors.

## Edge cases

Turns without movement remain at the origin.
Only forward moves drift north.
A route that returns home is bounded even if its final direction is north.
A nonzero displacement with a changed direction is also bounded.

## Common mistakes

- Requiring the first pass to return home rejects rotating bounded routes.
- Checking only direction misses closed routes that finish facing north.
- Treating each instruction independently loses the block's net displacement.

## Language notes

Python's modulo maps a negative turn index into the nonnegative range.
Java adds three before taking modulo four for a left turn, avoiding Java's negative remainder behavior.
The maximum single-pass coordinate magnitude is at most 100, so Java integers are sufficient.
