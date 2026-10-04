## Intuition

Connected excavation reaching a lower row must pass through every intermediate row on its way from the ground.
Therefore rows containing any excavated cell form a prefix, even though the columns occupied within those rows may vary arbitrarily.

## Brute force

Inspecting every cell takes O(n squared) time and misses the required improvement.
Flood-filling the entire excavation can also visit that many cells when nearly everything is excavated.

## Approach

Keep low at a known occupied row, initially zero, and high at the exclusive upper boundary n.
Inspect the middle row by checking whether it contains any one.
If occupied, move low to middle; otherwise move high to middle.
Stop when the boundaries are adjacent and return low.
The connected-component guarantee makes the row-occupancy predicate monotone, so an empty middle row rules out every deeper row.
The excavated top corners guarantee the initial low row is valid.

## Walkthrough

```text
Input: [[[1, 1, 1], [0, 1, 0], [0, 0, 0]]]
Output: 1
```

Example 1 starts with low zero and high three.
Middle row one contains the central excavated cell, so low becomes one.
The next middle row is two, which contains only zeros, so high becomes two.
The boundaries are now adjacent and the deepest occupied row is index 1.

## Complexity

Each binary-search step scans at most n cells and halves the row interval.
Worst-case time is O(n log(n + 1)), with O(1) extra space.
The bound concerns examined cells after the matrix is supplied, not the cost of reading an external matrix representation.

## Edge cases

For a one-row matrix, return zero without another search step.
A completely excavated matrix returns n - 1.
Rows need only contain one excavated cell to count as occupied.

## Common mistakes

Do not binary-search individual columns, whose occupancy need not be monotone.
Without the connectivity guarantee, an empty row would not rule out a disconnected deeper tunnel.

## Language notes

Python's any can stop at the first one.
Java's row loop examines every entry, preserving the same worst-case time bound.
