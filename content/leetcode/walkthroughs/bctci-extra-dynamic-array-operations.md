## Intuition

A dynamic array separates allocated capacity from logical length.
Indexed insertions and removals preserve a compact used prefix by shifting only the affected suffix.

## Brute force

Allocating exactly one additional slot per insertion repeatedly copies the entire array and makes consecutive appends quadratic.
Geometric growth amortizes that resizing cost, although middle insertions still require shifts.

## Approach

Store values in a fixed-size buffer and maintain `length`.
When full, allocate twice the capacity and copy live values.
Insert shifts the suffix right before writing the new value; pop saves the removed value and shifts the following suffix left.
Append calls insert at length.
Contains scans only live positions, and remove finds the first matching value before calling pop and returning its old index.
Get, set, size, and pop_back operate directly on indices or length.

## Walkthrough

```text
Input: ops = ["append", "append", "append", "pop", "get", "size"], args = [[1], [2], [3], [1], [1], []]
Output: [null, null, null, 2, 3, 2]
```

Example 1 appends 1, 2, and 3, growing capacity as needed.
Pop at index 1 saves 2 and shifts 3 into that position, leaving logical contents `[1, 3]`.
Get at index 1 returns 3, and size returns 2.
Unused buffer slots are irrelevant even if they still contain stale values.

## Complexity

Get, set, size, and pop_back take O(1) time.
Append is amortized O(1); insert, pop, contains, and remove take O(n) worst-case time.
Capacity is O(M), where M is the maximum historical length, because the reference never shrinks its buffer.

## Edge cases

Insertion at length is valid and shifts nothing.
Removing an absent value returns -1.
Duplicate removal affects only the first occurrence.

## Common mistakes

Right shifts must proceed backward to avoid overwriting values not yet moved.
Search only through length, not through capacity.

## Language notes

Python copies and shifts with loops.
Java uses `Arrays.copyOf` and overlap-safe `System.arraycopy`; its popBack method corresponds to Python's pop_back and returns no value.
