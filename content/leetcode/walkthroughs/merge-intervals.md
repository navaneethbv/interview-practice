## Intuition

Sort intervals by their starting point so that any overlap can be handled as the intervals arrive from left to right.
Only the last interval in `result` can overlap the next interval, because all earlier merged intervals have already ended before it.
Keep extending that last interval until a gap forces a new one.

## Brute force

Repeatedly search for an overlapping pair, replace it with its union, and restart the search.
A straightforward implementation can take O(n³) time: up to O(n) merges, each preceded by an O(n²) pair search.
Sorting avoids these repeated searches and gives a predictable bound.

## Approach

1. Use sorting followed by a greedy scan, ordering `intervals` by their start.
2. Begin with an empty `result`.
3. For each interval, read its `start` and `end`.
4. If `result` is nonempty and `start` is at most its last endpoint, extend that endpoint to the maximum of the old endpoint and `end`.
5. Otherwise, append a new interval `[start, end]`.

After each iteration, `result` covers exactly the processed intervals and contains no overlapping neighbors.
The sorted order means a new disjoint interval can never reconnect to an earlier completed interval.

## Walkthrough

Example 1 starts with `[[5, 8], [1, 3], [2, 6]]`.
Sorting produces `[[1, 3], [2, 6], [5, 8]]`.

| `start`, `end` | Decision | `result` |
| --- | --- | --- |
| 1, 3 | No previous interval; append | `[[1, 3]]` |
| 2, 6 | `2 <= 3`; extend endpoint to 6 | `[[1, 6]]` |
| 5, 8 | `5 <= 6`; extend endpoint to 8 | `[[1, 8]]` |

The middle interval connects the other two, leaving one merged interval.

## Complexity

- Time: O(n log n), dominated by sorting; the merge scan is O(n).
- Space: O(n), including the result and sorting storage; Python creates a sorted list, and Java's object-array sort may use linear temporary storage.

## Edge cases

Intervals sharing an endpoint merge because the comparison uses `<=`.
An interval contained within another cannot shrink the endpoint because the update uses `max`.
A single interval is copied into the result, and disjoint intervals remain separate.
An empty array also returns an empty result, although the statement requires at least one interval.

## Common mistakes

- Scanning unsorted input can miss overlaps that appear later.
- Replacing the endpoint with `end` can shrink an interval that contains the current one.
- Using strict `<` incorrectly separates closed intervals that touch.

## Language notes

Python's `sorted(intervals)` leaves the input order unchanged; Java's `Arrays.sort` rearranges the outer array.
Both versions create fresh result intervals, so extending an output interval does not change an input interval's endpoints.
Java uses `Comparator.comparingInt` instead of subtracting start values in the comparator.
