# LFU Cache

Implement an LFU cache.
`get(key)` returns the value or -1 when absent.
`put(key,value)` inserts or updates a key.
A new key begins with usage count 1; every successful get or update increments its count.
When capacity is full, evict the least frequently used key, breaking ties by least recent use.
Target O(1) average time per operation.
Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- `0 <= capacity <= 10000`.
- Keys and values are nonnegative integers.
- At most 200000 operations occur.

## Examples

### Example 1

```text
Input: ctor = [2], ops = ["put", "put", "get", "put", "get", "get"], args = [[1, 10], [2, 20], [1], [3, 30], [2], [3]]
Output: [null, null, 10, null, -1, 30]
Explanation: Key 2 has lower usage and is evicted.
```

### Example 2

```text
Input: ctor = [0], ops = ["put", "get"], args = [[1, 1], [1]]
Output: [null, -1]
Explanation: Zero capacity stores nothing.
```
