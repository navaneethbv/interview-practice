## Intuition

If a speed finishes within h hours, every higher speed also finishes in time.
This monotonic feasibility rule lets binary search locate the smallest successful speed.
For a given speed, each pile consumes its own rounded-up number of hours because unused capacity cannot transfer to another pile.

## Brute force

Try every speed from 1 through the largest pile M, summing the required hours each time.
This takes O(nM) time for n piles, which is impractical when a pile may contain a billion bananas.
Binary search reduces the number of candidate speeds to logarithmic.

## Approach

1. Use binary search on the answer, with `left = 1` and `right = max(piles)`.
2. Choose the midpoint `speed`.
3. Compute `hours` as the sum of `(pile + speed - 1) // speed` for every pile.
4. If `hours <= h`, retain this feasible candidate by setting `right = speed`.
5. Otherwise, eliminate this speed and all slower speeds with `left = speed + 1`.
6. Return `left` when both bounds meet.

The upper bound is always feasible because that speed finishes each pile in one hour and h is at least the number of piles.
A successful midpoint remains in the search interval because it may be the minimum.

## Walkthrough

Example 1 uses `piles = [4, 8, 12]` and `h = 6`.

| Bounds before test | `speed` | Per-pile hours | Decision |
| --- | --- | --- | --- |
| 1 to 12 | 6 | 1 + 2 + 2 = 5 | Set `right = 6` |
| 1 to 6 | 3 | 2 + 3 + 4 = 9 | Set `left = 4` |
| 4 to 6 | 5 | 1 + 2 + 3 = 6 | Set `right = 5` |
| 4 to 5 | 4 | 1 + 2 + 3 = 6 | Set `right = 4` |

The bounds meet at 4, which is returned.

## Complexity

- Time: O(n log M), checking all n piles for each candidate speed.
- Space: O(1), because the feasibility sum does not allocate a collection of per-pile results.

## Edge cases

When h equals the number of piles, the largest pile determines the required speed.
A single pile still needs rounded-up division.
Large total hours must not overflow before they are compared with h.

## Common mistakes

- Dividing the total bananas by the speed allows unused capacity to cross pile boundaries.
- Flooring each pile's division underestimates its time.
- Discarding a feasible midpoint can skip the smallest answer.

## Language notes

Python integers safely hold the full sum.
Java's `hoursNeeded` uses `long` and promotes the ceiling-division numerator before addition.
The returned speed remains an `int` because it never exceeds the largest pile.
