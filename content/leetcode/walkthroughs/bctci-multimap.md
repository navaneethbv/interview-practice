## Intuition

A multimap stores an ordered list of values for each distinct key.
Its public size counts all key-value pairs, including repeated copies, while the internal hash table counts distinct keys only for bucket management.

## Brute force

Store every pair in one flat list and scan it for each key query.
That preserves insertion order but makes membership and retrieval search unrelated pairs repeatedly, costing linear time per lookup.

## Approach

`Buckets` provides a custom chained hash table, starting with eight buckets and doubling when its distinct-key count exceeds twice capacity.
`add` obtains the key's value list, appends the new copy, writes that list back, and increments `total`.
`remove` subtracts the entire list length before deleting the key.
`contains` checks whether the stored list is nonempty.
`get` returns a copy, preserving insertion order while protecting internal storage from caller mutation.

## Walkthrough

Example 1 starts at size zero.
Adding `(3, -2)` makes size one and retrieval returns `[-2]`.
Adding `(3, -1)` appends rather than replaces, making size two and retrieval `[-2, -1]`.
Removing key 3 deletes both pairs, so size returns to zero.
Repeated removals of that key or missing key 123456 leave the map empty.

## Complexity

Add and membership are expected amortized O(1) under well-distributed keys, with linear worst-case bucket scans.
Returning k values costs O(k).
Removal may release k stored values.
Space is O(p + peak d), where p is current pairs and peak d reflects nonshrinking bucket capacity for distinct keys.

## Edge cases

Duplicate values remain distinct stored copies.
Negative keys are valid.
Removing a missing key changes neither size nor other entries.

## Common mistakes

Do not replace a key's old values or report the number of keys as public size.
Returning the internal list allows accidental mutation without updating total.

## Language notes

Python uses nonnegative modulo indexing and copies with `list`.
Java uses `Math.floorMod` for negative keys and an `ArrayList` copy for retrieval.
