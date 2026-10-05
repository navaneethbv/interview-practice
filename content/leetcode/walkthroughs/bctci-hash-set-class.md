## Intuition

Separate chaining assigns each key to a bucket and searches only that bucket for collisions.
Growing the bucket array keeps ordinary bucket lengths small as the set grows.
The set can reuse a small map-like helper by storing `[1]` as a presence marker.

## Brute force

Store all distinct keys in one list and scan it for every membership, insertion, or removal operation.
This needs O(n) time per basic operation even with well-distributed keys.

## Approach

`Buckets` begins with eight empty buckets and a distinct-key `count`.
`get` searches the bucket selected by the key's nonnegative remainder.
`put` first removes an existing key, then appends its replacement and increments the count, so duplicate additions leave size unchanged.
When count exceeds twice the bucket count, allocate twice as many buckets and rehash all entries.
`remove` deletes the matching entry if present and adjusts count once.
`HashSetClass` delegates membership and mutation to this helper and returns `table.count` for size.

## Walkthrough

Example 1 begins with size zero.
Adding key 3 stores its presence marker; `contains(3)` is true and size is one.
Adding 3 again replaces that entry without creating a duplicate, so size stays one.
Removing 3 makes membership false and size zero.
Repeated removals of 3 and the never-present key 123456 do nothing.
Each add or remove reports null in the operation-result list.

## Complexity

With well-distributed keys, basic operations are expected amortized O(1), while size is always O(1).
Adversarial collisions can make a bucket scan O(n).
Space is proportional to the maximum table size reached; the implementation grows but does not shrink.

## Edge cases

Negative keys and both signed integer extremes are valid.
Removing an absent key must not decrement count.

## Common mistakes

Rehash entries after changing bucket count.
A key's old bucket index is generally incorrect for the new capacity.

## Language notes

Python `%` produces a nonnegative remainder for positive capacity.
Java uses `Math.floorMod` for the same behavior instead of raw `%` on negative keys.
