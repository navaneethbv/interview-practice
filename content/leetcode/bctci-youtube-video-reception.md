# YouTube Video Reception

A day is positive when it has more likes than dislikes.
For each inclusive period `[l, r]`, return how many positive days it contains.

## Examples

### Example 1

```text
Input: likes = [6, 3, 4, 8, 7, 2, 6, 5, 0, 1], dislikes = [6, 0, 8, 0, 0, 0, 1, 8, 0, 2], periods = [[0, 1], [0, 5], [5, 8], [3, 3]]
Output: [1, 4, 2, 1]
```

### Example 2

```text
Input: likes = [1], dislikes = [1], periods = [[0, 0]]
Output: [0]
```

## Constraints

- `1 <= n <= 10^5` and `1 <= periods.length <= 10^5`
