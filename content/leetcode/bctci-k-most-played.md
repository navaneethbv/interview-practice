# K Most Played

Song `titles[i]` has been played `plays[i]` times, and titles are distinct.
Return the `k` highest-ranked titles in any order, or every title if there are fewer than `k`.
Songs with more plays rank higher, and songs with equal plays rank by title in alphabetical order.

## Examples

### Example 1

```text
Input: titles = ["All the Single Brackets", "Oops! I Broke Prod Again", "Coding In The Deep", "Boolean Rhapsody", "Here Comes The Bug", "All About That Base Case"], plays = [132, 274, 146, 193, 291, 291], k = 3
Output: ["All About That Base Case", "Here Comes The Bug", "Oops! I Broke Prod Again"]
```

### Example 2

```text
Input: titles = ["a"], plays = [5], k = 4
Output: ["a"]
```

## Constraints

- `0 <= titles.length <= 10^5` and `1 <= k <= 10^5`
