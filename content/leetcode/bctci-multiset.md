# Multiset

Implement `Multiset` for integer keys without using a built-in set or map.
Use arrays or lists to build your own hash table.
`add(key)` appends another copy.
`contains(key)` reports membership and `size()` counts all copies/pairs.
`remove(key)` removes one copy; a missing key is a no-op.

## Constraints

- At most 1,000,000 stored entries and operations.
- Keys and values are signed 32-bit integers.
- Aim for expected amortized O(1) basic operations; ordered enumeration may take O(n log n).


## Examples

### Example 1

```text
Input: {"ctor": [], "ops": ["size", "add", "contains", "size", "add", "contains", "size", "remove", "contains", "size", "remove", "contains", "size", "remove", "contains", "size", "remove", "contains", "size"], "args": [[], [3], [3], [], [3], [3], [], [3], [3], [], [3], [3], [], [123456], [123456], [], [123456], [123456], []]}
Output: [0, null, true, 1, null, true, 2, null, true, 1, null, false, 0, null, false, 0, null, false, 0]
```

### Example 2

```text
Input: {"ctor": [], "ops": ["size", "add", "contains", "size", "add", "contains", "size", "remove", "contains", "size", "remove", "contains", "size", "remove", "contains", "size", "remove", "contains", "size"], "args": [[], [-1], [-1], [], [4], [4], [], [-1], [-1], [], [4], [4], [], [123456], [123456], [], [123456], [123456], []]}
Output: [0, null, true, 1, null, true, 2, null, false, 1, null, false, 0, null, false, 0, null, false, 0]
```
