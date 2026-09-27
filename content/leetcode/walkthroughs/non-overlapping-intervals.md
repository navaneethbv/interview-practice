## Intuition

Minimizing removals is equivalent to keeping as many compatible intervals as possible.
Among intervals available for the next choice, keeping the one that ends earliest leaves the most room for future choices.
This exchange argument leads to greedy interval scheduling.

## Brute force

Enumerate subsets and test each for overlaps, which requires exponential time.
Sorting by finish time makes it possible to construct a maximum compatible subset directly.
Choosing by earliest start or shortest duration lacks the same safe exchange argument.

## Approach

1. Sort intervals by their finishing endpoint.
2. Initialize `kept = 0` and `end` below every possible starting endpoint.
3. For each interval, keep it when its start is at least `end`.
4. On a kept interval, update `end` to its finish and increment `kept`.
5. Return the input length minus `kept`.

Replacing any first chosen compatible interval with an earlier-finishing candidate cannot reduce the choices available afterward.
Repeating that reasoning justifies every greedy selection.
Intervals that only touch remain compatible under this problem's definition.

## Walkthrough

Example 1 uses `[[1, 3], [2, 4], [3, 5]]`, already ordered by finish.

| Interval | Compatibility check | Decision | `kept`, `end` |
| --- | --- | --- | --- |
| `[1, 3]` | First interval | Keep | 1, 3 |
| `[2, 4]` | `2 < 3` | Remove | 1, 3 |
| `[3, 5]` | `3 >= 3` | Keep | 2, 5 |

Three intervals minus two kept gives one removal.
The remaining intervals meet at time 3 without overlapping interiors.

## Complexity

- Time: O(n log n), dominated by sorting, followed by a linear scan.
- Space: O(n) as a sorting-storage upper bound for these Python list and Java object-array sorts.

## Edge cases

One interval requires no removal.
Identical intervals permit only one to remain because each has positive length.
Negative endpoints work with the same ordering comparisons.
Intervals sharing only an endpoint can all be kept when otherwise compatible.

## Common mistakes

- Sorting by start and always keeping the first interval can retain a long blocking interval.
- Using strict `>` rejects compatible touching intervals.
- Returning `kept` answers the complementary question.

## Language notes

Python's `sorted` creates a new ordered list and uses negative infinity as the initial boundary.
Java sorts the outer array in place and uses `Integer.MIN_VALUE`, safely below the stated endpoint range.
The Java comparator compares endpoints directly rather than subtracting them.
