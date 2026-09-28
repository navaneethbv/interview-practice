# Race Overtaking

`p1[i]` and `p2[i]` are the positions of two racers at second `i`; both arrays are strictly increasing and have the same length.
Player 1 starts ahead, player 2 overtakes exactly once, and player 2 stays ahead to the end.
The players are never at the same position.
Return the first index at which player 2 is ahead.

## Examples

### Example 1

```text
Input: p1 = [2, 4, 6, 8, 10], p2 = [1, 3, 5, 9, 11]
Output: 3
```

### Example 2

```text
Input: p1 = [3, 4, 5], p2 = [2, 5, 6]
Output: 1
```

## Constraints

- `2 <= n <= 10^6`
- `0 <= p1[i], p2[i] <= 10^9`
