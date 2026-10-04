## Intuition

A multimap needs two different counts: the hash table tracks distinct keys, while `total` tracks all stored key-value pairs.
Each key owns an ordered list of values, so duplicates and insertion order remain visible.
Separate chaining supplies the required custom hash table without built-in maps.

## Approach

`Buckets` stores lists of entries, choosing a chain from the integer key modulo the bucket count.
Lookup scans only that chain and returns the stored value list, or a fresh empty list for a missing key.
`add` appends a value, stores the updated list, and increments `total`.
The table replaces an existing entry rather than creating duplicate entries for one key.
When distinct-key load exceeds two per bucket, double the bucket array and redistribute entries.
`remove` subtracts that key's entire list length from `total` and removes its table entry.
`get` returns a copy so callers cannot mutate internal storage.

## Walkthrough

Example 1 begins empty, then adds key 3 with value -2.
Membership becomes true, size becomes one, and get returns `[-2]`.
Adding -1 under the same key preserves insertion order, producing `[-2, -1]` and total size two.
Removing key 3 deletes both pairs, so membership becomes false and size becomes zero.
Repeated removals of 3 and the absent key 123456 leave the state unchanged.

## Complexity

With well-distributed keys, add and contains are expected amortized O(1), while size is O(1).
Returning k values costs O(k), and removing a key may require releasing its k values.
Adversarial collisions can make a chain scan O(u) for u distinct keys.
Storage is O(p + capacity) for p pairs and the allocated bucket array, which does not shrink after removals.

## Edge cases

Repeated equal values are separate pairs.
A missing key returns an empty list, distinct from a stored negative or zero value.

## Common mistakes

Do not decrease total by only one when removing a multi-valued key.
Never expose the mutable internal list directly.

## Language notes

Python's modulo handles negative keys naturally.
Java uses `Math.floorMod` and copies results with `new ArrayList`.
