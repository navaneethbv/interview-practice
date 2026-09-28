# Restaurant Ratings

`ratings[i]` is the rating of restaurant `i` along a route.
Choose restaurants to stop at, never two adjacent ones, to maximize the sum of their ratings, and return that sum.
Answers within `10^-6` are accepted.

## Examples

### Example 1

```text
Input: ratings = [8, 1, 3, 9, 5, 2, 1]
Output: 19.0
```

### Example 2

```text
Input: ratings = [8, 1, 3, 7, 5, 2, 4]
Output: 20.0
```

## Constraints

- `0 <= ratings.length <= 10^6`
- `0 <= ratings[i] <= 10`
