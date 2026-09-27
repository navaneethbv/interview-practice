## Intuition

Only the smallest value in a consecutive run should start a scan of that run.
A value is such a start exactly when its predecessor is absent.
A set removes duplicate values and makes both predecessor and successor checks efficient.

## Brute force

Starting a forward membership scan at every input value can repeatedly traverse the same long run, taking O(n²) expected time even with a set.
Sorting also works but takes O(n log n) time, exceeding the requested expected linear bound.

## Approach

1. Build the hash set `values` from `nums`.
2. For each possible `start` in the set, skip it if `start - 1` is present.
3. Otherwise advance `end` from `start` until `end` is no longer in the set.
4. Update `best` with `end - start`.
5. Return `best`, initially zero.

Each distinct value belongs to exactly one maximal consecutive run.
Only that run's smallest value launches its traversal, so the nested loop does not imply quadratic total work.
The endpoint is exclusive, making its difference from the start equal to the run length.

## Walkthrough

Example 1 uses `[8, 2, 4, 3, 2, 20]`.
The set is `{2, 3, 4, 8, 20}`.

| Candidate `start` | Predecessor present? | Run if scanned | Length |
| --- | --- | --- | --- |
| 2 | No | 2, 3, 4 | 3 |
| 3 | Yes | Skip | None |
| 4 | Yes | Skip | None |
| 8 | No | 8 | 1 |
| 20 | No | 20 | 1 |

Set iteration need not follow this displayed order, but the largest length remains 3.
The repeated input value 2 does not extend the run.

## Complexity

- Time: O(n) expected, with average constant-time hash operations and one forward visit per distinct run member.
- Space: O(n), for the set of distinct values.

## Edge cases

An empty input returns zero.
All equal values produce a run of length one.
Negative values and runs crossing zero work with the same predecessor rule.
Gaps terminate one run and permit another independent start.

## Common mistakes

- Iterating every duplicate from the original input can repeat long scans.
- Counting positions instead of distinct values overcounts duplicates.
- Requiring consecutive input positions solves a different problem.

## Language notes

Python and Java both iterate the deduplicated set.
The stated ±1,000,000,000 bounds leave room for predecessor and successor arithmetic inside Java `int`.
A version accepting arbitrary `int` extremes would need explicit overflow handling around those operations.
