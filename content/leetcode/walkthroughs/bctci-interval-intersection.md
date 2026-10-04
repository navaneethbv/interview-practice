## Intuition

The overlap of two closed intervals starts at the later start and ends at the earlier end.
Sorted, disjoint input lists let two pointers consider only pairs that could still overlap.
The interval ending first cannot contribute to any later interval on the opposite side.

## Brute force

Compare every interval from `arr1` with every interval from `arr2` and retain nonempty overlaps.
That takes O(mn) time before any necessary output ordering.

## Approach

Start `i = j = 0`.
Compute `start = max(arr1[i][0], arr2[j][0])` and `end = min(arr1[i][1], arr2[j][1])`.
When `start <= end`, append that closed intersection to `result`.
Advance i if the first interval ends earlier; otherwise advance j.
If endpoints are equal, advancing either is sufficient because the next interval in that list begins strictly later.
Each step discards an interval that cannot overlap any unexamined interval on the other side.

## Walkthrough

Example 1 first compares `[0, 1]` with `[2, 3]`, finds no overlap, and advances i.
Comparing `[4, 6]` with `[2, 3]` advances j.
The pair `[4, 6]` and `[5, 9]` contributes `[5, 6]`.
Then `[7, 8]` with `[5, 9]` contributes `[7, 8]`.
The first list is exhausted, so the answer is `[[5, 6], [7, 8]]`.

## Complexity

Every iteration advances a pointer, giving O(m + n) time.
Auxiliary working space is O(1), excluding the returned intersection list, whose size is O(m + n).

## Edge cases

An empty input list produces an empty result.
Touching endpoints create a valid singleton interval such as `[4, 4]`.

## Common mistakes

Use `<=` when testing overlap because endpoints are included.
Do not advance the interval with the later ending boundary, which could miss another overlap.

## Language notes

Python returns nested lists directly.
Java accumulates `int[]` pairs in an `ArrayList` and converts the final collection to `int[][]`.
