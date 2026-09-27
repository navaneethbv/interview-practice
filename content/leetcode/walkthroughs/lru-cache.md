## Intuition

A cache needs two pieces of information: the value for each key and the keys' recency order.
A hash map provides fast lookup, while a linked ordering lets an accessed entry move to the most recent end without shifting other entries.
The references use ordered-map library types that combine these structures.

## Brute force

Keep entries in a list from least recent to most recent.
Searching for a key and removing it from the middle can each take O(capacity) time, violating the required average O(1) operations.
The ordered-map approach locates an entry directly and updates its linked position.

## Approach

1. Store `capacity` and an initially empty `cache`, ordered from least recently used to most recently used.
2. For `get(key)`, return -1 if absent; otherwise move the entry to the most recent end and return its value.
3. For `put(key, value)`, insert or replace the value and mark that key most recent.
4. If the cache now exceeds `capacity`, remove its oldest entry.

After each operation, the order records successful reads and all writes.
Only an insertion of a new key can increase the size, so removing at most one entry is enough to restore the capacity limit.

## Walkthrough

Example 1 creates a cache with `capacity = 2`.
The order below runs from least recent to most recent.

| Operation | `cache` order and values | Returned value |
| --- | --- | --- |
| `put(1, 10)` | `1:10` | `null` |
| `put(2, 20)` | `1:10, 2:20` | `null` |
| `get(1)` | `2:20, 1:10` | 10 |
| `put(3, 30)` | `1:10, 3:30`, after evicting 2 | `null` |
| `get(2)` | `1:10, 3:30` | -1 |
| `get(3)` | `1:10, 3:30` | 30 |

Reading key 1 changes which key the next insertion evicts.
The resulting outputs are `[null, null, 10, null, -1, 30]`, with no constructor entry under this judge's contract.

## Complexity

- Time: O(1) average per `get` or `put`, using hash lookup and constant-time linked-order updates; hash-table resizing is amortized.
- Space: O(capacity), because the cache holds at most that many entries after an operation.

## Edge cases

Updating an existing key replaces its value and refreshes recency without consuming another slot.
A failed `get` leaves the ordering unchanged.
Capacity one evicts the sole existing key when a different key is inserted.
Capacity is positive, so the algorithm does not need an invalid-capacity policy.

## Common mistakes

- Preserving insertion order instead of access order implements a different eviction rule.
- Forgetting to refresh recency on successful reads evicts recently used keys.
- Evicting before checking the final size can remove an entry during a simple update.

## Language notes

Python's `OrderedDict` requires explicit `move_to_end(key)` calls and removes the oldest item with `popitem(last=False)`.
Java's `LinkedHashMap` is constructed with access ordering enabled, so `getOrDefault` and `put` refresh recency automatically for present keys.
The Java iterator supplies the oldest key before `cache.remove(oldest)`; the iterator is not used again after removal.
In an interview requiring a manual implementation, the same operations can be implemented with a hash map and a doubly linked list.
