## Intuition

Knight moves are symmetric across both axes, so reflect the target into the nonnegative quadrant and order its coordinates as `x >= y`.
A lower bound comes from how far one move can advance the dominant coordinate and how much total coordinate distance must be covered.
The parity correction ensures the proposed path has the same checkerboard parity as the target.

## Brute force

Breadth-first search over board coordinates finds the answer, but it stores a growing frontier and visited set around the target.
Reaching a target at distance d can explore O(d²) board positions in both time and space.
The formula avoids this expanding search by combining distance and parity bounds.

## Approach

1. Replace `x` and `y` with absolute values and ensure `x >= y`.
2. Return the two small exceptional cases `(1, 0) -> 3` and `(2, 2) -> 4`.
3. Compute `minimum_moves = max((x + 1) // 2, (x + y + 2) // 3)`.
4. Add one when `minimum_moves + x + y` is odd, because a knight alternates square color each move.

## Walkthrough

Example 1 has target `(2, 1)`.

| state | value |
| --- | ---: |
| absolute coordinates | `(2, 1)` |
| ordered coordinates | `x = 2`, `y = 1` |
| exceptional checks | neither applies |
| dominant bound | `(2 + 1) // 2 = 1` |
| total-distance bound | `(2 + 1 + 2) // 3 = 1` |
| parity correction | `(1 + 2 + 1) % 2 = 0` |

The result is one move.

## Complexity

- Time: O(1), using a fixed number of arithmetic operations.
- Space: O(1), with no board or visited set.

## Edge cases

The origin has distance zero after normalization.
Negative coordinates reflect to the same answer.
The exceptional cases avoid the small-board detours that the lower bound alone underestimates.
Large coordinates remain safe in Python, while Java uses `int` under the local constraint range.

## Common mistakes

- Ignoring parity can return a move count with the wrong square color.
- Using only the dominant-coordinate bound underestimates diagonal targets.
- Forgetting `(1,0)` and `(2,2)` gives incorrect small answers.

## Language notes

Python uses tuple sorting to order the absolute coordinates.
Java uses an explicit swap after `Math.abs` because primitive arrays are unnecessary.
Both references use the same closed-form algorithm, unlike a breadth-first exploratory implementation.
