# Hash Set Class Extensions

Implement `ExtendedHashSet` for integer keys without using a built-in set or map.
Use arrays or lists to build your own hash table.
`add(key)` inserts a new entry or leaves an existing key unchanged.
`contains(key)` reports membership and `size()` counts distinct keys.
`remove(key)` removes all entries for that key; a missing key is a no-op.
`elements()` returns the keys in ascending order.
`union(other)` and `intersection(other)` take an array representing another set and return sorted unique keys without changing either input.

## Constraints

- At most 1,000,000 stored entries and operations.
- Keys and values are signed 32-bit integers.
- Aim for expected amortized O(1) basic operations; ordered enumeration may take O(n log n).


## Examples

### Example 1

```text
Input: {"ctor": [], "ops": ["size", "add", "contains", "size", "add", "contains", "size", "elements", "union", "intersection", "elements", "remove", "contains", "size", "remove", "contains", "size", "remove", "contains", "size", "remove", "contains", "size"], "args": [[], [3], [3], [], [3], [3], [], [], [[7, -3, 7]], [[7, -3, 7]], [], [3], [3], [], [3], [3], [], [123456], [123456], [], [123456], [123456], []]}
Output: [0, null, true, 1, null, true, 1, [3], [-3, 3, 7], [], [3], null, false, 0, null, false, 0, null, false, 0, null, false, 0]
```

### Example 2

```text
Input: {"ctor": [], "ops": ["size", "add", "contains", "size", "add", "contains", "size", "elements", "union", "intersection", "elements", "remove", "contains", "size", "remove", "contains", "size", "remove", "contains", "size", "remove", "contains", "size"], "args": [[], [-1], [-1], [], [4], [4], [], [], [[7, -3, 7]], [[7, -3, 7]], [], [-1], [-1], [], [4], [4], [], [123456], [123456], [], [123456], [123456], []]}
Output: [0, null, true, 1, null, true, 2, [-1, 4], [-3, -1, 4, 7], [], [-1, 4], null, false, 1, null, false, 0, null, false, 0, null, false, 0]
```
