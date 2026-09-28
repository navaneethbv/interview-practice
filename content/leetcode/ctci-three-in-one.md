# Three in One

Implement three stacks that share a single array of length `3 * stackSize`.
Stack numbers are 0, 1, and 2, and each stack holds at most `stackSize` values.

- `FixedMultiStack(stackSize)` creates the three empty stacks.
- `push(stackNum, value)` pushes `value` and returns `true`, or returns `false` without changing anything when that stack is full.
- `pop(stackNum)` removes and returns the top value, or returns `-1` when that stack is empty.
- `peek(stackNum)` returns the top value without removing it, or `-1` when that stack is empty.
- `isEmpty(stackNum)` reports whether that stack is empty.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation.

## Examples

### Example 1

```text
Input: ctor = [2], ops = ["push", "push", "push", "push", "peek", "pop", "peek", "isEmpty"], args = [[0, 5], [0, 6], [0, 7], [2, 1], [0], [0], [0], [1]]
Output: [true, true, false, true, 6, 6, 5, true]
Explanation: Stack 0 is full after two pushes, so pushing 7 fails.
```

### Example 2

```text
Input: ctor = [1], ops = ["pop", "push", "pop", "isEmpty"], args = [[1], [1, 9], [1], [1]]
Output: [-1, true, 9, true]
```

## Constraints

- `1 <= stackSize <= 1,000`
- `0 <= stackNum <= 2`
- `0 <= value <= 1,000,000`
- At most 3,000 operations.
