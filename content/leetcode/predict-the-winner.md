# Predict the Winner

Two optimal players alternate taking either end of nums and adding that value to their score.
Return whether the first player can finish with at least as many points as the second; a tie counts as a first-player win.

## Constraints

- There are 1 to 20 nonnegative values, each at most 10000000.

## Examples

### Example 1

```text
Input: nums = [1, 5, 2]
Output: false
Explanation: The second player can take 5 regardless of the first choice.
```

### Example 2

```text
Input: nums = [1, 1]
Output: true
Explanation: Both players score 1, which counts as a win.
```
