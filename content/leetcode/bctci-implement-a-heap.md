# Implement a Heap

Implement a binary heap from scratch without a built-in priority queue.
`Heap(kind, values)` builds a heap from `values` in linear time, where `kind` is `"min"` or `"max"` and decides which element has the highest priority.

- `push(x)` adds `x`.
- `pop()` removes and returns the highest-priority element, or returns `-1` if the heap is empty.
- `top()` returns the highest-priority element without removing it, or `-1` if the heap is empty.
- `size()` returns the number of elements.

Construct one instance per test and run the operations in order; `push` produces null.

## Examples

### Example 1

```text
Input: ctor = ["min", []], ops = ["push", "push", "push", "pop", "top", "size"], args = [[4], [8], [2], [], [], []]
Output: [null, null, null, 2, 4, 2]
```

### Example 2

```text
Input: ctor = ["max", [1, 8, 2, 6, 4]], ops = ["top", "pop", "pop", "pop"], args = [[], [], [], []]
Output: [8, 8, 6, 4]
```

## Constraints

- At most `10^5` elements, each between 0 and `10^9`.
