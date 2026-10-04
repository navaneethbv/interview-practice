## Intuition

A set represents membership once per distinct key, even when add is called repeatedly.
Separate chaining stores colliding keys in a list attached to their shared bucket.

## Brute force

One unsorted entry list requires linear lookup for every operation.
A direct-address array across the full signed-integer key range wastes excessive memory.

## Approach

Buckets begin with eight chains.
A key's remainder selects its chain, which is searched using exact key equality.
Put removes an existing entry before appending its replacement and incrementing count.
When count exceeds twice the bucket count, double the table and rehash every entry.


## Walkthrough

```text
Input: {"ctor": [], "ops": ["size", "add", "contains", "size", "add", "contains", "size", "remove", "contains", "size", "remove", "contains", "size", "remove", "contains", "size", "remove", "contains", "size"], "args": [[], [3], [3], [], [3], [3], [], [3], [3], [], [3], [3], [], [123456], [123456], [], [123456], [123456], []]}
Output: [0, null, true, 1, null, true, 1, null, false, 0, null, false, 0, null, false, 0, null, false, 0]
```

Example 1 starts empty, then adds key 3 twice.
Membership is true but size remains one because replacement does not duplicate the key.
Removing 3 returns the set to size zero.
Repeated removals of 3 and absent key 123456 leave it empty.

## Complexity

Let n be the current number of distinct keys and B the allocated number of buckets after earlier growth.
With well-distributed keys, basic operations are expected amortized O(1); size is O(1).
This deterministic remainder hash can suffer O(n) collision chains on adversarial keys.
Storage is O(B + n), with B tied to peak occupancy because the table never shrinks.

## Edge cases

Negative keys are valid.
Removing a missing key changes nothing.
Repeated insertion must not increase size.

## Common mistakes

Resizing requires rehashing against the new bucket count.
Do not assume unequal keys cannot share a bucket.

## Language notes

Python's modulo produces nonnegative bucket indices; Java uses `Math.floorMod` for the same behavior.
The stored singleton marker `[1]` distinguishes membership from an empty lookup result.
