## Intuition

Each piece has a small set of possible directions or jumps.
The only unbounded movement is the queen's distance along a direction.
Centralizing the bounds and occupancy test makes all three movement rules follow the same definition of a free destination.

## Brute force

One could inspect every board cell and test whether the piece can reach it, scanning intervening cells for queen moves.
That approach performs unnecessary work away from the piece's permitted directions.

## Approach

For a knight, test the eight offsets in `KNIGHT` and include only free destinations.
For a king, test the eight adjacent offsets in `KING`, excluding `(0, 0)`.
For a queen, start one step away in each king direction and repeatedly append free cells, advancing by the same `(dr, dc)`.
Stop a ray as soon as it leaves the board or reaches an occupied cell.
A knight ignores intermediate cells, whereas the queen must stop before the first obstacle.

## Walkthrough

Example 1 places a king at `(3, 5)` on the six-by-six board.
All candidates in column 6 are outside the board.
Cell `(2, 4)` is occupied and cannot be included.
The remaining free adjacent cells are `(2, 5)`, `(3, 4)`, `(4, 4)`, and `(4, 5)`.
These four coordinate pairs form the answer, with no required ordering.

## Complexity

King and knight queries take O(1) time and return at most eight cells.
A queen visits O(n) cells across eight rays on an n-by-n board.
Auxiliary working space is O(1), excluding the O(n) possible queen output.

## Edge cases

A one-cell board has no legal moves.
A queen surrounded by occupied cells returns an empty list, even if empty cells exist farther away.

## Common mistakes

Do not include the starting cell.
Do not allow queen captures: this problem forbids landing on occupied cells entirely.

## Language notes

Python's `free` checks bounds before indexing.
Java's `addIfFree` both validates and appends, and its `slides` flag limits a king to one step.
