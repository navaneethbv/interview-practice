# Hash Map Class

Implement `HashMapClass` for integer keys without using a built-in set or map.
Use arrays or lists to build your own hash table.
`add(key, value)` inserts a new entry or replaces the existing value.
`contains(key)` reports membership and `size()` counts distinct keys.
`remove(key)` removes all entries for that key; a missing key is a no-op.
`get(key)` returns a one-element list containing the value.
A missing key returns `[]`.
This list representation distinguishes a missing value from every possible integer.

## Constraints

- At most 1,000,000 stored entries and operations.
- Keys and values are signed 32-bit integers.
- Aim for expected amortized O(1) basic operations; ordered enumeration may take O(n log n).


## Examples

### Example 1

```text
Input: {"ctor": [], "ops": ["size", "add", "contains", "size", "get", "add", "contains", "size", "get", "remove", "contains", "get", "size", "remove", "contains", "get", "size", "remove", "contains", "get", "size", "remove", "contains", "get", "size"], "args": [[], [3, -2], [3], [], [3], [3, -1], [3], [], [3], [3], [3], [3], [], [3], [3], [3], [], [123456], [123456], [123456], [], [123456], [123456], [123456], []]}
Output: [0, null, true, 1, [-2], null, true, 1, [-1], null, false, [], 0, null, false, [], 0, null, false, [], 0, null, false, [], 0]
```

### Example 2

```text
Input: {"ctor": [], "ops": ["size", "add", "contains", "size", "get", "add", "contains", "size", "get", "remove", "contains", "get", "size", "remove", "contains", "get", "size", "remove", "contains", "get", "size", "remove", "contains", "get", "size"], "args": [[], [-1, -2], [-1], [], [-1], [4, -1], [4], [], [4], [-1], [-1], [-1], [], [4], [4], [4], [], [123456], [123456], [123456], [], [123456], [123456], [123456], []]}
Output: [0, null, true, 1, [-2], null, true, 2, [-1], null, false, [], 1, null, false, [], 0, null, false, [], 0, null, false, [], 0]
```
