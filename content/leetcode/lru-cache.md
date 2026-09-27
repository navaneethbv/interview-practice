# LRU Cache

Implement a cache with a fixed positive capacity and least-recently-used eviction.
`get(key)` returns the stored value or -1 if absent; a successful lookup makes that key most recently used.
`put(key, value)` inserts or updates a key and makes it most recently used.
If insertion exceeds capacity, evict the least recently used key.
Both methods should have average O(1) running time.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation; void methods produce null, and constructor output is omitted.

## Examples

### Example 1

```text
Input: ctor = [2], ops = ["put", "put", "get", "put", "get", "get"], args = [[1, 10], [2, 20], [1], [3, 30], [2], [3]]
Output: [null, null, 10, null, -1, 30]
Explanation: Reading key 1 makes key 2 least recent, so inserting key 3 evicts key 2.
```

### Example 2

```text
Input: ctor = [1], ops = ["put", "put", "get", "get"], args = [[1, 4], [1, 9], [1], [2]]
Output: [null, null, 9, -1]
Explanation: Updating key 1 replaces its value without evicting it.
```

## Constraints

- 1 <= capacity <= 3000.
- 0 <= key <= 10000.
- 0 <= value <= 100000.
- At most 200000 operations occur per test.
