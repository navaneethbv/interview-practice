## Intuition

Membership in either interval changes only at one of the four endpoints.
Between consecutive distinct endpoints, membership is constant, so testing the left boundary determines whether that whole segment belongs to exactly one input.

## Brute force

Checking individual coordinates cannot handle continuous intervals and would depend on endpoint magnitude.
A fixed endpoint sweep handles every overlap arrangement uniformly.

## Approach

Sort the endpoints.
For each consecutive nonempty segment `[left, right)`, test `a[0] <= left < a[1]` and the corresponding condition for b.
Keep the segment exactly when those booleans differ.
If it begins where the last retained segment ends, extend that segment; otherwise append a new interval.
The membership test excludes the shared portion and retains portions belonging to just one interval.
Merging adjacent retained pieces ensures the requested canonical output.

## Walkthrough

```text
Input: [[1, 5], [3, 8]]
Output: [[1, 3], [5, 8]]
```

Example 1 has sorted endpoints 1, 3, 5, and 8.
Segment `[1, 3)` belongs only to a, so retain it.
Segment `[3, 5)` belongs to both, so exclude it.
Segment `[5, 8)` belongs only to b, so retain it separately.
The result is `[[1, 3], [5, 8]]`.

## Complexity

There are exactly four endpoints, so time and extra space are O(1).
The output also contains only a constant number of intervals.
Endpoint distances do not affect running time.

## Edge cases

Identical intervals have empty symmetric difference.
Disjoint intervals both survive.
Touching intervals merge because half-open endpoints avoid overlap while leaving no gap in their union.

## Common mistakes

Do not use inclusive-right membership from the interval-intersection exercise.
Skip zero-length segments caused by repeated endpoints.

## Language notes

Python removes duplicate endpoints using a set before sorting.
Java sorts all four endpoints and explicitly skips equal consecutive endpoints; both produce the same nonempty segments.
