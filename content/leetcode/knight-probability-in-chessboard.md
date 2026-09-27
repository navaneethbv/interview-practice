# Knight Probability in Chessboard

A knight starts at `(row, column)` on an n-by-n board.
At each of k moves, it chooses uniformly among all eight knight offsets, even those leaving the board.
Once outside, it never returns.
Return the probability that it remains on the board after all moves.

## Constraints

- `1 <= n <= 25`; `0 <= k <= 100`.
- Starting coordinates range from 0 to n-1.

## Examples

### Example 1

```text
Input: n = 3, k = 1, row = 0, column = 0
Output: 0.25
Explanation: Two of the eight moves remain on the board.
```

### Example 2

```text
Input: n = 1, k = 0, row = 0, column = 0
Output: 1.0
Explanation: With no moves, the starting square is retained.
```
