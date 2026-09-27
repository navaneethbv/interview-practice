## Intuition

A remainder divides the key space into smaller groups called buckets.
Keys with the same remainder may collide, so each bucket stores complete key-value pairs rather than only values.
Searching one bucket preserves the map contract while avoiding a search through unrelated buckets.

## Brute force

A single unsorted list of pairs can implement all operations, but reading, updating, or removing a key may inspect every stored entry.
That costs O(n) per operation for n entries.
Separate chaining narrows each search to the entries sharing the key's bucket, although deliberately colliding keys still cause linear searches.

## Approach

1. Allocate `BUCKET_COUNT = 1009` empty buckets in the constructor.
2. Compute `key % BUCKET_COUNT` for every operation.
3. In `put`, replace the existing pair's value if its key matches; otherwise append a new pair.
4. In `get`, return the matching value, or -1 after the bucket has been exhausted.
5. In `remove`, delete the matching pair and return immediately.

## Walkthrough

Example 1 repeatedly operates on key 1, so every operation uses bucket 1.

| Operation | Bucket 1 afterward | Returned value |
| --- | --- | --- |
| `put(1, 4)` | `[[1, 4]]` | null |
| `get(1)` | `[[1, 4]]` | 4 |
| `put(1, 8)` | `[[1, 8]]` | null |
| `get(1)` | `[[1, 8]]` | 8 |
| `remove(1)` | `[]` | null |
| `get(1)` | `[]` | -1 |

The update changes one value without inserting a duplicate key.

## Complexity

- Time: O(B) construction for B buckets; each operation is O(b + 1) for b entries in its bucket, including shifting after removal.
- Space: O(B + n) for buckets and stored pairs.

With evenly distributed keys, expected bucket size is about n/B; this fixed-size implementation does not resize or guarantee constant-time operations.

## Edge cases

Key zero and value zero are valid.
Removing an absent key leaves the map unchanged.
Colliding keys remain distinct because searches compare the full key.
The absent marker -1 is unambiguous because stored values are nonnegative.

## Common mistakes

- Treating a bucket index as the complete key loses colliding entries.
- Appending on every update allows stale duplicate keys to survive.
- Continuing an indexed scan after deletion risks skipping shifted entries.

## Language notes

Python stores mutable two-item lists; Java stores `int[]` pairs inside `ArrayList` buckets.
Both update the existing pair in place and use the language's list deletion to shift later entries.
Neither implementation uses a built-in hash map.
