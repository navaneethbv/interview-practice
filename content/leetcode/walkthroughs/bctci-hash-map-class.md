## Intuition

A hash table narrows a key lookup to one bucket, while explicit key comparisons resolve collisions.
Each key stores a singleton value list so every integer remains distinguishable from the empty list representing absence.

## Brute force

An unsorted list of all key and value pairs needs a full scan for each lookup.
The reference instead distributes entries among buckets and doubles their number when the overall load grows too large.

## Approach

`Buckets.get` scans the bucket chosen by key modulo capacity.
`put` removes an old entry, inserts the replacement, and updates `count`.
When count exceeds twice the bucket count, rehash all entries.
The public class delegates membership, removal, size, and lookup.

## Walkthrough

Example 1 starts with size zero.
Adding key 3 with -2 makes size one and lookup `[-2]`.
Replacing it with -1 leaves size one and changes lookup to `[-1]`.
Removing 3 makes membership false and lookup empty; further missing removals remain harmless.

## Complexity

With well distributed keys, basic operations are expected amortized O(1), and resizing costs O(n) occasionally.
The deterministic modulo hash can place many keys together, so a single operation can cost O(n) under heavy collisions.
Storage follows peak entry count because buckets never shrink.

## Edge cases

Zero, negative values, and -1 are valid stored values.
Repeated addition replaces rather than duplicates a key.
Removing an absent key must not decrease size.
Different keys sharing one bucket remain separate entries.

## Common mistakes

Do not treat the stored integer's truthiness as membership.
The list itself must be nonempty even for value zero.
Resizing requires recomputing bucket positions, and replacing a key must not increase the distinct key count.

## Language notes

Python's modulo gives a nonnegative bucket index for a positive capacity.
Java uses `Math.floorMod` to obtain that behavior for negative keys.
Both public `get` methods copy the stored singleton list before returning it.
