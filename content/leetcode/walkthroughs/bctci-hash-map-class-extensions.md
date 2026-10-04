## Intuition

A map needs one stored entry per key, with replacement preserving the number of distinct keys.
Separate chaining handles collisions by keeping a short list of entries in each bucket.

## Brute force

One unsorted entry list requires linear lookup for every operation.
A direct-address array across the full signed-integer key range wastes excessive memory.

## Approach

Buckets begin with eight chains.
A key's remainder selects its chain, which is searched using exact key equality.
Put removes an existing entry before appending its replacement and incrementing count.
When count exceeds twice the bucket count, double the table and rehash every entry.

For keys, collect and sort bucket keys.
For values, retrieve one value per key and sort them independently, retaining duplicate values.

## Walkthrough

```text
Input: {"ctor": [], "ops": ["size", "add", "contains", "size", "get", "add", "contains", "size", "get", "keys", "values", "remove", "contains", "get", "size", "remove", "contains", "get", "size", "remove", "contains", "get", "size", "remove", "contains", "get", "size"], "args": [[], [3, -2], [3], [], [3], [3, -1], [3], [], [3], [], [], [3], [3], [3], [], [3], [3], [3], [], [123456], [123456], [123456], [], [123456], [123456], [123456], []]}
Output: [0, null, true, 1, [-2], null, true, 1, [-1], [3], [-1], null, false, [], 0, null, false, [], 0, null, false, [], 0, null, false, [], 0]
```

Example 1 inserts key 3 with value -2, so size becomes one and get returns `[-2]`.
Replacing it with -1 keeps size one and changes get to `[-1]`.
Removing key 3 makes contains false and get return an empty list.
Repeated removals, including absent key 123456, leave size zero.
Before removal, keys and values return `[3]` and `[-1]` respectively.

## Complexity

Let n be the current number of distinct keys and B the allocated number of buckets after earlier growth.
With well-distributed keys, basic operations are expected amortized O(1); size is O(1).
This deterministic remainder hash can suffer O(n) collision chains on adversarial keys.
Ordered enumeration costs O(B + n log n), including scanning B allocated buckets; set combinations also process the other input.
Storage is O(B + n), with B tied to peak occupancy because the table never shrinks.

## Edge cases

Negative keys are valid.
Removing a missing key changes nothing.
A stored negative value must remain distinguishable from absence.

## Common mistakes

Resizing requires rehashing against the new bucket count.
Do not assume unequal keys cannot share a bucket.

## Language notes

Python's modulo produces nonnegative bucket indices; Java uses `Math.floorMod` for the same behavior.
Get returns a copied singleton list for present values and an empty list for absence.
