# YouTube Video Unusual Days

A day's reception score is its likes minus its dislikes.
A day's total deviation is the sum of the absolute differences between its score and every other day's score.
Return the largest total deviation of any day, or 0 for no days.

## Examples

### Example 1

```text
Input: likes = [3, 6, 1], dislikes = [0, 1, 9]
Output: 24
```

### Example 2

```text
Input: likes = [4], dislikes = [2]
Output: 0
```

## Constraints

- `0 <= n <= 10^5`
- `0 <= likes[i], dislikes[i] < 10^4`
