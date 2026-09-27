# Snakes and Ladders

Board squares are numbered from 1 at the bottom left in alternating left-to-right and right-to-left rows.
From a square, choose a die result from 1 to 6 without passing n squared.
If the landing cell is not -1, move once to its indicated square; do not follow another jump during that turn.
Return the fewest turns to the final square, or -1 if unreachable.

## Constraints

- The board is n-by-n with `2 <= n <= 20`.
- A cell is -1 or a valid destination number.
- The first and last squares have no jump.

## Examples

### Example 1

```text
Input: board = [[-1, -1], [-1, -1]]
Output: 1
Explanation: A die roll of three reaches square 4.
```

### Example 2

```text
Input: board = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]]
Output: 2
Explanation: Square 9 requires at least two turns from square 1.
```
