# Extra Dynamic Array Operations

Extend a dynamic array that supports `append`, `get`, `set`, `size`, and `pop_back` with four more operations, again using only fixed-size arrays.

- `pop(i)` removes and returns the element at index `i`, shifting later elements left.
- `contains(x)` returns whether `x` is in the array.
- `insert(i, x)` inserts `x` at index `i`, shifting elements at `i` and later to the right; `i` may equal the size.
- `remove(x)` removes the first occurrence of `x` and returns its former index, or returns `-1` if `x` is absent.

Indices passed to `get`, `set`, `pop`, and `insert` are always valid.
Construct one `DynamicArrayExtras()` per test and run the operations in order; methods without a result produce null.

## Examples

### Example 1

```text
Input: ops = ["append", "append", "append", "pop", "get", "size"], args = [[1], [2], [3], [1], [1], []]
Output: [null, null, null, 2, 3, 2]
```

### Example 2

```text
Input: ops = ["append", "append", "append", "remove", "get"], args = [[1], [2], [2], [2], [1]]
Output: [null, null, null, 1, 2]
```

## Constraints

- At most 5,000 operations.
- `-10^9 <= x <= 10^9`
