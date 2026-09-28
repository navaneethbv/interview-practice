# Implement Dynamic Array

Implement a growable array using only fixed-size arrays; do not use a built-in list's append or equivalent.

- `DynamicArray()` creates an empty array.
- `append(x)` adds `x` at the end.
- `get(i)` returns the element at index `i`.
- `set(i, x)` replaces the existing element at index `i` with `x`.
- `size()` returns the number of elements.
- `pop_back()` removes the last element (`popBack` in Java).

Every `get`, `set`, and `pop_back` call refers to an element that exists.
Construct one instance per test and run the operations in order; methods without a result produce null.

## Examples

### Example 1

```text
Input: ops = ["append", "append", "get", "get", "size"], args = [[1], [2], [0], [1], []]
Output: [null, null, 1, 2, 2]
```

### Example 2

```text
Input: ops = ["append", "append", "pop_back", "size", "get"], args = [[1], [2], [], [], [0]]
Output: [null, null, null, 1, 1]
```

## Constraints

- At most 100,000 operations.
- `-10^9 <= x <= 10^9`
