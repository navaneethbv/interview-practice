## Intuition

A hash table separates key lookup from enumeration order.
Colliding keys share a bucket, while resizing keeps typical buckets short.
The public map stores one value per key and sorts only when an ordered keys or values snapshot is requested.

## Brute force

A single list of key-value pairs supports all operations, but every lookup and removal can scan every entry.
Sorting that list after each insertion adds work that ordinary membership queries do not need.

## Approach

`Buckets` begins with eight bucket lists and a distinct-key `count`.
`put` removes an existing key before adding its replacement, so replacing a value does not increase map size.
When count exceeds twice the bucket count, double the bucket array and redistribute entries.
`ExtendedHashMap` stores each integer inside a singleton list, allowing an empty list to signal absence.
Enumeration collects and sorts keys or values without removing duplicate values.

## Walkthrough

In Example 1, initial `size` returns zero.
Adding `(3, -2)` makes size one and `get(3)` returns `[-2]`.
Adding `(3, -1)` replaces that value while size remains one.
`keys()` returns `[3]` and `values()` returns `[-1]`.
Removing key 3 empties the table; subsequent removals of 3 or 123456 are harmless and lookups return `[]`.

## Complexity

Basic operations are expected amortized O(1) under well-distributed keys, with O(n) worst-case bucket scans.
Ordered enumeration is typically O(n log n); `values` also performs lookups that can be quadratic under severe collisions.
Bucket storage is O(peak n), since this implementation does not shrink after removals.

## Edge cases

Negative keys and negative values are valid.
A stored zero is present because its singleton list is nonempty.
Multiple different keys may have identical values.

## Common mistakes

Do not use a sentinel integer for absence or increment size on replacement.
Rehash entries after resizing because their bucket index depends on the new capacity.

## Language notes

Python's modulo already produces a nonnegative index.
Java uses `Math.floorMod` for the same behavior and returns copies of value lists so callers do not mutate table storage.
