## Intuition

A multiset preserves multiplicity, so adding the same key twice must increase size twice.
The custom hash table stores one entry per distinct key and a list containing one marker for each copy.
The outer table locates a key; its marker list records the count.

## Approach

`Buckets` assigns each key to a chain using modulo and scans that chain for equality.
On add, retrieve the marker list, append a marker, store the list, and increment `total`.
The table doubles its capacity when the number of distinct keys exceeds twice the bucket count, rehashing all entries into the new chains.
On remove, do nothing for a missing key.
Otherwise pop one marker and decrement `total`.
If the marker list becomes empty, remove the key's table entry too.
Membership tests whether the retrieved list is nonempty, while size simply returns the total number of markers across all keys.

## Walkthrough

Example 1 begins with size zero and adds key 3 twice.
After the first addition, contains is true and size is one; after the second, size is two.
The first removal leaves one marker, so contains remains true and size becomes one.
The second removal empties the list and deletes key 3, making contains false and size zero.
Removing the absent key 123456 twice leaves size unchanged.

## Complexity

Under well-distributed hashing, add, remove, and contains take expected amortized O(1), and size is O(1).
A collision-heavy chain can require O(u) work for u distinct keys.
The references use O(p + capacity) space for p copies and allocated buckets; capacity reflects past growth because the table never shrinks.

## Edge cases

Negative keys are valid and must map to nonnegative bucket indices.
Repeated removal after the final copy is a no-op.

## Common mistakes

Deleting the entire key on every remove would implement a set-like operation and lose remaining copies.
Distinct-key count and total-copy count serve different purposes.

## Language notes

Python appends and pops list markers.
Java uses `ArrayList` markers and `Math.floorMod` for bucket selection, avoiding negative array indices.
