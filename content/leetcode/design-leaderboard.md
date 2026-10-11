# Design A Leaderboard

Maintain a game leaderboard.
`addScore(playerId, score)` adds `score` to the player's total, adding the player if needed.
`top(K)` returns the sum of the `K` highest totals.
`reset(playerId)` removes the player, as if their total were back to zero and they had left the board.

Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- `top` is called with 1 <= K <= the number of players on the board.
- `reset` is only called for players on the board.
- Scores are positive.

## Examples

### Example 1

```text
Input: ops = ["addScore", "addScore", "addScore", "addScore", "addScore", "top", "reset", "reset", "addScore", "top"], args = [[1, 73], [2, 56], [3, 39], [4, 51], [5, 4], [1], [1], [2], [2, 51], [3]]
Output: [null, null, null, null, null, 73, null, null, null, 141]
Explanation: Player 1 leads with 73; after the resets the top three are 51, 51 and 39.
```

### Example 2

```text
Input: ops = ["addScore", "addScore", "top"], args = [[7, 10], [7, 5], [1]]
Output: [null, null, 15]
Explanation: Scores accumulate per player.
```
