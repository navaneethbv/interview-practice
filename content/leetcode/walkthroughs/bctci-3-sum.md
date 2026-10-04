## Intuition

Once one member of a triple is fixed, finding the other two becomes a sorted two-pointer search.
Positions, rather than distinct values, define which elements may be used.

## Brute force

Three nested loops try O(n cubed) triples.
Sorting makes it possible to eliminate many pairs at once instead of enumerating every third index independently.

## Approach

The reference sorts `arr` in place.
For each `first` with at least two later elements, initialize `left = first + 1` and `right` at the end.
Compare the three-value `total` with `w`.
An undersized sum requires moving `left` rightward; an oversized sum requires moving `right` leftward.
Return true as soon as equality is found.
All three positions remain distinct because `first < left < right` throughout the inner loop.
No duplicate-skipping logic is necessary for a boolean answer.

## Walkthrough

```text
Input: [[2, 2, -1, 8], 3]
Output: true
```

Sorting Example 1 produces `[-1, 2, 2, 8]`.
Fix -1 at index 0 and initially compare -1 + 2 + 8 = 9 with the target 3.
Move `right` leftward to the second 2.
The next sum is -1 + 2 + 2 = 3, so the result is true.
Both 2 values are allowed because they occupy different positions.

## Complexity

The nested scans take O(n squared) time, dominating sorting.
Pointer storage is O(1), but Python sorting can use O(n) temporary space.
Java primitive-array sorting has its own sorting workspace, so the complete method should not be described as universally constant-space.

## Edge cases

Fewer than three elements cannot produce a triple.
Three equal values are valid when their total matches `w`.
Negative targets require no special branch.

## Common mistakes

Starting `left` at `first` would reuse an index.
The reference mutates input order, which matters to callers retaining that array.

## Language notes

Python uses `list.sort`; Java uses `Arrays.sort`.
The stated value bounds keep Java's three-term integer sum in range.
