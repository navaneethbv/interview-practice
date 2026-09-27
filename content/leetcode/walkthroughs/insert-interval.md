## Intuition

The existing intervals are already sorted and disjoint, so the inserted interval can overlap only one consecutive block.
Accumulate that block into mutable endpoints `start` and `end`.
Intervals strictly before or after it can pass directly into the result.

## Brute force

Append the new interval, sort all intervals, and perform a general merge scan.
That takes O(n log n) time even though the original ordering already supplies the needed structure.
A direct scan performs the insertion in linear time.

## Approach

1. Initialize `start` and `end` from `newInterval`, an empty `result`, and `placed = false`.
2. Copy an interval immediately if it ends strictly before `start`.
3. If it starts strictly after `end`, append the accumulated interval once if necessary, then copy the later interval.
4. Otherwise merge the overlap by taking the smaller start and larger end.
5. After the scan, append the accumulated interval if it has not yet been placed.

The strict before/after comparisons make touching endpoints part of the overlap case.
Once a later interval is encountered, sorted order guarantees that no future interval can overlap the accumulated interval.

## Walkthrough

Example 1 starts with `[[1, 2], [5, 7]]` and `newInterval = [2, 6]`.

| Existing interval | Relation | Accumulated `start`, `end` |
| --- | --- | --- |
| Initially | New interval | 2, 6 |
| `[1, 2]` | Touches at 2 | 1, 6 |
| `[5, 7]` | Overlaps | 1, 7 |

Nothing has been placed during the scan, so append `[1, 7]` afterward.
Return `[[1, 7]]`.

## Complexity

- Time: O(n), visiting each existing interval once.
- Space: O(n) for the returned intervals, with O(1) auxiliary scan state.

## Edge cases

An empty input returns just the new interval.
Insertion before all intervals places it at the first later interval.
Insertion after all intervals uses the final append.
A new interval covering the entire collection produces one merged interval.

## Common mistakes

- Treating equal endpoints as disjoint violates the closed-interval contract.
- Appending the accumulated interval repeatedly duplicates it.
- Forgetting the final append loses intervals that extend through the end.

## Language notes

Python unpacks interval endpoints into local values.
Java reads each two-element array and clones untouched output intervals, matching Python's fresh output lists.
Both versions leave the input intervals and `newInterval` unchanged while updating only local endpoints.
