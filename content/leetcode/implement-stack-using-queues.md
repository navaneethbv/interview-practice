# Implement Stack Using Queues

Implement last-in-first-out stack operations using only standard queue operations.
`push(x)` inserts x, `pop()` removes and returns the newest element, `top()` reads it without removal, and `empty()` checks whether no elements remain.
Only queue insertion at the back, removal or inspection at the front, size, and emptiness checks are allowed.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation; void methods produce null, and constructor output is omitted.

## Examples

### Example 1

```text
Input: ctor = [], ops = ["push", "push", "top", "pop", "empty"], args = [[1], [2], [], [], []]
Output: [null, null, 2, 2, false]
Explanation: 2 is most recent, so top and pop both return it; 1 remains afterward.
```

### Example 2

```text
Input: ctor = [], ops = ["empty", "push", "pop", "empty"], args = [[], [3], [], []]
Output: [true, null, 3, true]
Explanation: The stack starts empty and becomes empty again after its only value is removed.
```

## Constraints

- 1 <= x <= 9.
- At most 100 operations occur per test.
- pop and top are called only when the stack is nonempty.
