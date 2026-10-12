# Maximum Coins From K Consecutive Bags

Bags are placed at positive integer coordinates. Each row `[left, right, value]` of `coins` says every bag in that inclusive interval contains `value` coins. Intervals do not overlap. All other bags contain zero coins.

Choose exactly `k` consecutive coordinates and return the largest total number of coins you can collect. Input intervals need not be sorted. Use a 64-bit result; expanding the coordinate range is too expensive.

## Constraints

- `1 <= coins.length <= 100,000`.
- `1 <= left <= right <= 10^9`, `1 <= value <= 1,000`, `1 <= k <= 10^9`.
- Intervals are pairwise disjoint.

## Examples

### Example 1

`coins = [[1,3,2],[6,8,4]], k = 3` returns `12`. Choose coordinates 6 through 8.

### Example 2

`coins = [[1,2,3],[4,5,4]], k = 4` returns `11`. Coordinates 2 through 5 contain 3 + 0 + 4 + 4 coins.

## Source and scope

Original practice contract based on the public topic reported at [Hello Interview](https://www.hellointerview.com/community/questions/maximum-coins-from-k-consecutive-bags/112756e1-20fc-4f02-9959-6fe4b3b55dcf), observed October 12, 2026. API choices and test cases are authored for this site; this is not a reproduction of the source question or a claim that every follow-up is covered.
