## Intuition

Membership in either interval can change only at one of their endpoints.
Splitting the number line at those endpoints creates small pieces whose entire interiors have a constant membership pattern.

## Brute force

Testing every integer coordinate would depend on the endpoint magnitude and would not describe all real points correctly.
Endpoint partitioning handles overlaps, containment, disjointness, and touching intervals through the same short scan.

## Approach

Sort the endpoint `points` and inspect consecutive pairs `left, right`.
Keep a piece exactly when membership in `a` differs from membership in `b`.
If it touches the last retained piece, extend that piece; otherwise append a new interval.

## Walkthrough

Example 1 has sorted endpoints 1, 3, 5, and 8.
The piece `[1, 3)` belongs only to `a`, `[3, 5)` belongs to both, and `[5, 8)` belongs only to `b`.
Keeping just the exclusive pieces gives `[[1, 3], [5, 8]]`.

## Complexity

There are always four input endpoints and at most three elementary pieces.
Sorting and scanning therefore take O(1) time and O(1) auxiliary space for this fixed two interval problem.
The result also has bounded size.

## Edge cases

Identical intervals produce no exclusive points.
A contained interval removes its interior from the outer interval, possibly leaving two pieces.
Touching intervals have no overlapping points under the half open convention and merge into one result interval.

## Common mistakes

Use the left endpoint to test membership with an inclusive lower bound and exclusive upper bound.
Do not retain zero length pieces from repeated endpoints.
Do not leave adjacent output pieces separate when their union is one continuous interval.

## Language notes

Python deduplicates endpoints with `set` before sorting.
Java sorts all four endpoints and explicitly requires `left < right`.
Both mutate only newly allocated result intervals when merging and leave the supplied interval arrays unchanged.
