## Intuition

A player wins when one row, one column, or one diagonal contains only that player's marks.
Instead of storing the whole board, assign player 1 a contribution of 1 and player 2 a contribution of -1.
A line reaches absolute value n exactly when one player owns all of its cells.

## Brute force

A board based design would write every move into an n by n matrix and scan four kinds of lines after each move.
Checking a row and column still takes O(n), while checking both diagonals can also take O(n), so each move costs O(n).
The line counters below make each move O(1) and use O(n) state.

## Approach

1. Create counters for every row and column plus the main and anti diagonal.
2. Convert player 1 to mark 1 and player 2 to mark -1.
3. Add the mark to the moved row and column.
4. Update a diagonal counter when the move lies on that diagonal.
5. Return the player if any affected line has absolute value n, otherwise return zero.

## Walkthrough

Example 1 constructs a 3 by 3 game.

| move | affected counters | result |
| --- | --- | ---: |
| player 1 at (0,0) | row0=1, col0=1, diagonal=1 | 0 |
| player 2 at (1,0) | row1=-1, col0=0 | 0 |
| player 1 at (0,1) | row0=2, col1=1 | 0 |
| player 2 at (1,1) | row1=-2, col1=0, diagonal=0, anti_diagonal=-1 | 0 |
| player 1 at (0,2) | row0=3, col2=1, anti_diagonal=0 | 1 |

Row zero reaches absolute value 3 on the fifth move.

## Complexity

Each move updates at most four counters, so the time is O(1).
The row and column arrays use O(n) space, and the two diagonal counters use O(1) additional space.
The class does not allocate a board or scan unrelated lines.

## Edge cases

On a one-cell board, the first move wins immediately.
A move on both diagonals updates both counters, which occurs at the center of an odd-sized board.
Player 2 uses negative counts, so its completed line is detected by absolute value.
The contract supplies valid moves and does not require handling repeated cells.

## Common mistakes

- Checking only the row and column misses diagonal wins.
- Using positive counts for both players cannot distinguish ownership.
- Returning a winner before applying the current move misses the final mark.
- Scanning an old board after every move defeats the counter design.

## Language notes

Python stores integer counters in lists and individual attributes.
Java uses int arrays and fields, with the same signed contribution idea.
Java's conditional expression chooses the mark, while Python's conditional expression has the same meaning.
