# Linked-List-Based Queue

Implement `LinkedQueue` on top of a singly linked list you build yourself.

- `push(v)` adds `v` at the back.
- `pop()` removes and returns the front value, or returns `-1` when the queue is empty.
- `peek()` returns the front value without removing it, or `-1` when the queue is empty.
- `size()` returns the number of values, and `empty()` returns whether there are none.

Every operation must take O(1) time.
Construct one instance per test and run the operations in order; `push` produces null.

## Examples

### Example 1

```text
Input: ops = ["push", "push", "push", "peek", "size", "empty", "pop", "pop"], args = [[1], [2], [3], [], [], [], [], []]
Output: [null, null, null, 1, 3, false, 1, 2]
```

### Example 2

```text
Input: ops = ["pop", "peek", "size", "empty"], args = [[], [], [], []]
Output: [-1, -1, 0, true]
```

## Constraints

- At most `10^5` values, each between 0 and `10^9`.
