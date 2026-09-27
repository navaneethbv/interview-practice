## Intuition

Values range from 1 through n, so each value maps to an array index.
Negating the value at that index marks that value as seen.
Seeing a negative marker on a second occurrence identifies a duplicate.

## Brute force

A frequency map can count every value in O(n) extra space.
Sorting can also expose adjacent duplicates but changes input order and costs O(n log n).
Index marking uses the given value range and constant auxiliary space beyond output.

## Approach

1. Read each value by absolute magnitude.
2. Map it to index value minus one.
3. If that slot is already negative, append the value as a duplicate.
4. Otherwise negate the slot to mark its first occurrence.
5. Return the duplicate values.

## Walkthrough

Example 1 scans [4,3,2,7,8,2,3,1].
The first 2 marks index 1, and the first 3 marks index 2.
The later 2 finds index 1 already negative and appends 2.
The later 3 finds index 2 negative and appends 3.
The result is [2,3].

## Complexity

Each value is processed once, giving O(n) time.
The method uses O(1) auxiliary marking space and O(d) output space for d duplicates.
It mutates nums by signs and does not restore those markers.
The value-range contract makes every mapped index valid.

## Edge cases

A value appearing twice is reported once.
A value appearing more than twice would be reported on later repeats under the method.
No duplicates returns an empty list.
The input values are positive before marking.

## Common mistakes

- Using value as an index instead of value minus one shifts every marker.
- Taking abs only once and then losing the original sign misreads repeated values.
- Allocating a set ignores the intended in-place marking method.
- Forgetting that nums is mutated can surprise callers after the method.

## Language notes

Python uses abs on each scanned value.
Java uses Math.abs and appends boxed integers to the output list.
Both preserve duplicate discovery order.
