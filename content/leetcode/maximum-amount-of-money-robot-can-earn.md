# Maximum Amount of Money Robot Can Earn

Move from the top-left cell to the bottom-right cell using only right and down steps, collecting each visited cell's value.
Negative values represent losses; you may ignore the losses in at most two visited cells, including endpoints.
Return the maximum total collected, which may still be negative.

## Examples

### Example 1

```text
Input: coins = [[1, -5], [2, 3]]
Output: 6
Explanation: Move down and right to collect 1+2+3.
```

### Example 2

```text
Input: coins = [[-4, -3, -2]]
Output: -2
Explanation: Ignore the two larger losses and pay only 2.
```

## Constraints

- 1 <= coins.length, coins[0].length <= 500
- -1000 <= coins[i][j] <= 1000
