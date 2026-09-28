# Max Queue

Build `MaxQueue`, a FIFO queue with an additional maximum query.
`push(value)` appends an integer; `pop()` removes and returns the oldest value.
`peek()` returns the oldest value without removing it, `max()` returns the largest current value, and `size()` returns the number of entries.
Queries that require an element are called only when the queue is nonempty.

## Constraints

- At most 100,000 operations; values are signed 32-bit integers.
- Each operation must run in amortized O(1) time.


## Examples

### Example 1

```text
Input: {"ctor": [], "ops": ["size", "push", "peek", "max", "size", "push", "peek", "max", "size", "push", "peek", "max", "size", "pop", "max", "pop", "max", "pop", "push", "pop", "size"], "args": [[], [2], [], [], [], [5], [], [], [], [5], [], [], [], [], [], [], [], [], [8], [], []]}
Output: [0, null, 2, 2, 1, null, 2, 5, 2, null, 2, 5, 3, 2, 5, 5, 5, 5, null, 8, 0]
```

### Example 2

```text
Input: {"ctor": [], "ops": ["size", "push", "peek", "max", "size", "push", "peek", "max", "size", "pop", "max", "pop", "push", "pop", "size"], "args": [[], [0], [], [], [], [-2], [], [], [], [], [], [], [8], [], []]}
Output: [0, null, 0, 0, 1, null, 0, 0, 2, 0, -2, -2, null, 8, 0]
```
