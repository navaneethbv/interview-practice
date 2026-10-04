## Intuition

A queen attacks along eight straight rays, stopping at the board boundary or an original queen.
Mark those rays in a separate result grid so newly marked attacked squares do not become false blockers.
The original board remains the authoritative source of queen positions.

## Approach

Copy the board into `unsafe`, preserving queen cells as ones.
Visit every original cell and launch rays only when it contains a queen.
For each combination of row and column direction from -1, 0, and 1 except the all-zero direction, start at the adjacent square.
While the square remains inside the board and is empty in the original board, mark it unsafe and advance along the same direction.
Stop at an original queen, which is already marked unsafe by the initial copy.
Once all queens have been processed, return the accumulated grid.

## Walkthrough

Example 1 has queens at `(0, 3)` and `(3, 0)`.
The first queen marks the top row, the rightmost column, and the down-left diagonal.
The second marks the bottom row, the leftmost column, and that same diagonal in the other direction.
Cells `(1, 1)` and `(2, 2)` are on neither queen's row, column, or diagonal, so they remain zero.
All other cells become one, matching the displayed result.

## Complexity

A straightforward per-queen bound is O(q times n) ray work for q queens on an n by n board.
A tighter aggregate bound is O(n squared): along any row, column, or diagonal, each empty gap is traversed at most once from either end before an original queen blocks further movement.
The board scan and output copy are also O(n squared).
Output storage is O(n squared), with constant ray-traversal state.

## Edge cases

A board with no queens returns all zeros.
A queen on a corner has only three rays extending into the board.

## Common mistakes

Do not test blockers in `unsafe`, since previously attacked empty cells are still traversable.
Skip the zero direction to avoid an infinite loop.

## Language notes

Python precomputes the eight direction pairs.
Java generates them with nested loops and copies each row independently.
