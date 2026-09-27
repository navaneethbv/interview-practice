## Intuition

The three sorted arrays can be compared from left to right without building sets.
If their current values differ, a smallest value cannot match a larger current value or anything after it in that other array.
Advance every pointer holding that smallest value, recording it first when all three values match.

## Brute force

For every value in the first array, scan the other two arrays for a match.
This costs O(a(b + c)) for lengths a, b, and c.
Hash sets reduce expected lookup time but allocate additional storage that the sorted order makes unnecessary.

## Approach

1. Initialize `first`, `second`, and `third` to zero and create an empty result.
2. While every pointer is in range, compute `smallest` from the three current values.
3. If all three values agree, append smallest.
4. Advance each pointer whose current value equals smallest.
5. Stop when any array ends, because no further common value can be found.

The append happens before movement, so a shared value is recorded once.
Strictly increasing inputs ensure that no duplicate filtering is needed.
All comparisons in an iteration use the same saved smallest value.

## Walkthrough

Example 1 uses `[1,2,4]`, `[2,3,4]`, and `[2,4,5]`.

| Pointers before step | Current values | Action | Result |
| --- | --- | --- | --- |
| (0,0,0) | (1,2,2) | advance first | [] |
| (1,0,0) | (2,2,2) | append 2, advance all | [2] |
| (2,1,1) | (4,3,4) | advance second | [2] |
| (2,2,1) | (4,4,4) | append 4, advance all | [2,4] |

The first two arrays are now exhausted.
The remaining five in the third array cannot belong to the intersection.

## Complexity

Time is O(a + b + c), because each pointer advances at most its array's length.
Auxiliary space excluding the returned list is O(1).
If q values are shared, the output occupies O(q) space.
The input arrays are not copied or modified.

## Edge cases

Disjoint value ranges return an empty list.
A shared single element is appended and immediately ends the scan.
One exhausted array terminates processing even when the others have many elements left.
The contract guarantees nonempty, strictly increasing inputs.

## Common mistakes

- Advancing the largest value can skip a future match for the smaller values.
- Appending when only two values match includes elements absent from the third array.
- Continuing after one pointer reaches its end accesses an invalid index.

## Language notes

Python's result list and Java's ArrayList grow as matches are found.
Java boxes each returned integer, which still uses O(q) output storage.
Both versions use the same three-pointer algorithm and produce ascending output directly.
