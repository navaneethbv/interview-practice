## Intuition

Represent A's marks as positive one and B's marks as negative one.
On a three-cell line, a total of three or negative three means that one player owns every cell.
Rows, columns, and the two diagonals can therefore be checked without storing the full board.

## Brute force

Fill a three-by-three board and scan its eight possible winning lines after every move.
The board size is fixed, so this is already constant work per move.
Signed counters provide a compact alternative that updates only lines touched by the current move.

## Approach

1. Initialize three row counters, three column counters, and two diagonal totals.
2. Read moves in order, assigning mark one to even indexes and negative one to odd indexes.
3. Add mark to the selected row and column.
4. Update the main diagonal when row equals column and the other diagonal when their sum is two.
5. If any relevant total has absolute value three, return the current player.
6. Otherwise return Draw after nine moves or Pending when empty cells remain.

The valid-input contract stops play immediately after a win.
Thus a completed winning line always belongs to the player who just moved.

## Walkthrough

Example 1 alternates moves `(0,0)`, `(1,0)`, `(0,1)`, `(1,1)`, `(0,2)`.

| Move | Player | Row 0 total | Row 1 total |
| --- | --- | ---: | ---: |
| (0,0) | A | 1 | 0 |
| (1,0) | B | 1 | -1 |
| (0,1) | A | 2 | -1 |
| (1,1) | B | 2 | -2 |
| (0,2) | A | 3 | -2 |

The last move raises row zero to three, so the method returns A immediately.
It does not wait for the remaining board cells to fill.

## Complexity

For t supplied moves, the scan costs O(t) time and O(1) auxiliary space.
Since t is at most nine, the problem also has a fixed constant worst-case cost.
Each move updates and checks only a constant number of counters.

## Edge cases

A single move is Pending.
Nine moves without a winning line produce Draw.
The center contributes to both diagonals.
A win on the ninth move takes precedence over Draw.

## Common mistakes

- Counting both players positively makes mixed lines look complete.
- Updating only one diagonal for the center misses valid wins.
- Checking Draw before the winning condition misclassifies a final-move win.

## Language notes

Python checks a fixed tuple of relevant totals.
Java uses the hasWinner helper to keep the move loop readable.
All counters remain between negative three and three, so integer overflow is irrelevant here.
