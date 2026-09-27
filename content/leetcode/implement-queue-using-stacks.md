# Implement Queue using Stacks

Implement a first-in, first-out queue using only stack operations.
`push(x)` appends a value, `pop()` removes and returns the front, `peek()` returns the front without removing it, and `empty()` reports whether the queue contains no values.

## Examples

### Example 1

```text
Input: constructor = [], operations = ["push", "push", "peek", "pop", "empty"], arguments = [[1], [2], [], [], []]
Output: [null, null, 1, 1, false]
Explanation: Values leave in insertion order.
```

### Example 2

```text
Input: constructor = [], operations = ["empty", "push", "pop", "empty"], arguments = [[], [5], [], []]
Output: [true, null, 5, true]
Explanation: The queue is empty before insertion and after removal.
```

## Constraints

- 1 <= x <= 9
- At most 100 method calls are made.
- pop and peek are called only when the queue is nonempty.
