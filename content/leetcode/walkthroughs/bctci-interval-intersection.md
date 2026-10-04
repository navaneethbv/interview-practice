## Intuition

For two current intervals, their common portion begins at the later start and ends at the earlier end.
The interval ending first cannot overlap any later interval in the other list and can be discarded.

## Brute force

Comparing every interval in one list against every interval in the other takes O(nm) time.
Sorted, internally disjoint inputs allow a merge-style scan instead.

## Approach

Maintain indices i and j.
Compute `start = max(starts)` and `end = min(ends)`.
Append `[start, end]` whenever start is at most end, since endpoints are inclusive.
Advance the pointer belonging to the smaller end; on equal ends, the reference advances j.
The untouched interval may still overlap later intervals from the other array, so it remains available.
The generated intersections are already sorted and need no final sort.

## Walkthrough

```text
Input: arr1 = [[0, 1], [4, 6], [7, 8]], arr2 = [[2, 3], [5, 9], [10, 11]]
Output: [[5, 6], [7, 8]]
```

Example 1 first compares `[0, 1]` with `[2, 3]`, finding no overlap and advancing the first pointer.
After discarding the second list's `[2, 3]`, compare `[4, 6]` with `[5, 9]` and append `[5, 6]`.
Advance to `[7, 8]`, which intersects the same `[5, 9]` as `[7, 8]`.
The first list ends, leaving the stated two intervals.

## Complexity

Each iteration advances one pointer, so time is O(n + m).
Working storage excluding output is O(1), and output uses O(n + m) space in the worst case.

## Edge cases

An empty input gives no intersections.
A single shared endpoint creates a valid singleton interval.
One long interval may overlap several intervals in the other list.

## Common mistakes

Using start less than end loses point intersections.
Advancing both pointers after every overlap can skip later matches.

## Language notes

Python appends two-element lists.
Java builds a list of int arrays and converts it to the required two-dimensional array without changing input intervals.
