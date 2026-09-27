# Design HashMap

Implement an integer key-value map without using a built-in hash map.
`put(key,value)` inserts or replaces a value, `get(key)` returns the value or -1 if absent, and `remove(key)` deletes a key when present.

## Examples

### Example 1

```text
Input: constructor = [], operations = ["put", "get", "put", "get", "remove", "get"], arguments = [[1, 4], [1], [1, 8], [1], [1], [1]]
Output: [null, 4, null, 8, null, -1]
Explanation: Updating replaces the old value; removal makes the key absent.
```

### Example 2

```text
Input: constructor = [], operations = ["get", "remove", "get"], arguments = [[0], [0], [0]]
Output: [-1, null, -1]
Explanation: Missing keys can be read or removed.
```

## Constraints

- 0 <= key, value <= 10^6
- At most 10,000 method calls occur per instance.
