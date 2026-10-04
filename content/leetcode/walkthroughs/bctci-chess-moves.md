## Intuition

Each piece has a fixed set of movement directions, but only the queen continues along a direction.
Checking board bounds and occupancy at each landing cell captures the local movement rules.

## Brute force

Testing every board cell against the piece's geometry wastes work for kings and knights.
For queens, testing every candidate while rescanning intervening squares also repeats obstruction checks.

## Approach

Define the eight neighboring direction vectors and the eight knight offsets.
For a knight, test only each offset's destination; intermediate cells are irrelevant.
For a king, test each neighboring destination once.
For a queen, repeatedly step along each neighboring direction until a boundary or occupied cell blocks it.
Append only empty reachable cells, excluding the starting position.
Different queen rays do not overlap away from their origin, so no deduplication set is needed.

## Walkthrough

```text
Input: board = [[0, 0, 0, 1, 0, 0], [0, 1, 1, 1, 0, 0], [0, 1, 0, 1, 1, 0], [1, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0], [0, 1, 0, 0, 0, 0]], piece = "king", r = 3, c = 5
Output: [[2, 5], [3, 4], [4, 4], [4, 5]]
```

Example 1 places a king at `[3, 5]`, on the right boundary.
Three neighboring positions with column 6 are out of bounds.
The position `[2, 4]` is occupied.
The four remaining empty neighbors are `[2, 5]`, `[3, 4]`, `[4, 4]`, and `[4, 5]`.
These are exactly the output cells, regardless of enumeration order.

## Complexity

Kings and knights examine eight candidates, taking O(1) time and output space.
A queen visits at most O(n) cells along eight rays and returns O(n) cells.
Working storage apart from output is O(1).

## Edge cases

A one-cell board offers no move.
An obstacle blocks every farther queen cell on its ray.
A knight can jump over occupied cells but cannot land on one.

## Common mistakes

Do not allow captures: occupied destinations are excluded by this contract.
Do not include direction `[0, 0]`.

## Language notes

Python uses separate comprehensions for jumping pieces.
Java combines king and queen scanning with a `slides` flag and a helper that appends only valid cells.
