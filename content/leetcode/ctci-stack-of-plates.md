# Stack of Plates

Implement `SetOfStacks`, which behaves like one stack but is made of several sub-stacks that each hold at most `capacity` values.
When the last sub-stack is full, a push starts a new sub-stack.
A sub-stack that becomes empty is removed, so later sub-stacks shift down one index.

- `SetOfStacks(capacity)` creates an empty structure.
- `push(value)` pushes onto the last sub-stack.
- `pop()` removes and returns the top of the last sub-stack, or returns `-1` when everything is empty.
- `popAt(index)` removes and returns the top of sub-stack `index`, or returns `-1` when that sub-stack does not exist.
  Sub-stacks are not rebalanced after `popAt`, so an earlier sub-stack may hold fewer than `capacity` values.
- `stackCount()` returns the current number of sub-stacks.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation; `push` produces null.

## Examples

### Example 1

```text
Input: ctor = [2], ops = ["push", "push", "push", "stackCount", "popAt", "pop", "pop", "stackCount"], args = [[1], [2], [3], [], [0], [], [], []]
Output: [null, null, null, 2, 2, 3, 1, 0]
```

### Example 2

```text
Input: ctor = [1], ops = ["pop", "popAt", "push", "popAt"], args = [[], [0], [4], [3]]
Output: [-1, -1, null, -1]
```

## Constraints

- `1 <= capacity <= 1,000`
- `0 <= value <= 1,000,000`
- `0 <= index <= 10,000`
- At most 3,000 operations.
