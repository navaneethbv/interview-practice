## Intuition

Instead of directly choosing the best basket combination, ask whether a proposed minimum gap is achievable.
If a gap works, every smaller gap works too.
This monotonic condition supports binary search on the answer, with a greedy left-to-right feasibility check.

## Brute force

Enumerate every choice of m baskets, sort each choice if necessary, and measure its smallest adjacent gap.
There can be binomial(n,m) choices, which is impractical for large arrays.
A feasibility scan considers a proposed gap in O(n) time without enumerating subsets.

## Approach

1. Sort a copy of position into `positions`.
2. In possible, place the first ball at the leftmost basket.
3. Scan forward, placing another ball whenever its distance from last is at least gap.
4. The gap is feasible if at least m balls fit.
5. Binary search from one to the distance between extreme baskets, using an upper midpoint.
6. Keep the midpoint when feasible; otherwise lower the upper boundary to one less than it.

Choosing the earliest possible basket leaves at least as much room as any later choice.
Thus the greedy scan cannot use fewer balls than some alternative placement satisfying the same gap.

## Walkthrough

Example 1 has positions `[1,3,6,10]` and m equal to three.

| left | right | middle | Greedy placements | Decision |
| ---: | ---: | ---: | --- | --- |
| 1 | 9 | 5 | 1,6 | too few; right = 4 |
| 1 | 4 | 3 | 1,6,10 | feasible; left = 3 |
| 3 | 4 | 4 | 1,6,10 | feasible; left = 4 |

The boundaries meet at four.
The selected gaps are five and four, whose minimum is four.

## Complexity

Let n be the number of baskets and D their coordinate range.
Sorting takes O(n log n), and binary search performs O(log(D + 1)) scans of O(n) each.
Auxiliary space is O(n) because both versions keep a sorted copy, including any sorting workspace within that bound.

## Edge cases

With two balls, the extreme baskets maximize the gap.
With one ball per basket, the smallest adjacent sorted difference is the answer.
Unsorted input is handled by the initial sort.
Distinct integer positions guarantee that gap one is feasible.

## Common mistakes

- Using a lower midpoint with `left = middle` can prevent progress.
- Advancing last when no ball is placed changes the greedy invariant.
- Maximizing a large pairwise gap ignores the smallest separation among all selected balls.

## Language notes

Python's feasibility loop uses indexes rather than slicing the array on each check.
Java clones the input before sorting and computes its midpoint from the current range.
Coordinates and their differences fit int under the stated one-billion bound.
