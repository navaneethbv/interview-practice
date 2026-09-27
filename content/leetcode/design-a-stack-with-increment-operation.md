# Design a Stack With Increment Operation

Implement a stack with a fixed capacity.
`push(x)` adds x unless the stack is full.
`pop()` removes and returns the top value, or -1 when empty.
`increment(k, val)` adds val to the bottom k values, or every value if fewer than k are present.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation; void methods produce null, and constructor output is omitted.

## Examples

### Example 1

```text
Input: ctor = [3], ops = ["push", "push", "increment", "pop", "pop", "pop"], args = [[1], [2], [2, 10], [], [], []]
Output: [null, null, null, 12, 11, -1]
Explanation: The increment changes the stack from [1, 2] to [11, 12]; popping returns 12, then 11, then -1.
```

### Example 2

```text
Input: ctor = [1], ops = ["push", "push", "pop"], args = [[5], [6], []]
Output: [null, null, 5]
Explanation: The capacity is one, so pushing 6 is ignored and the only value available to pop is 5.
```

## Constraints

- 1 <= maxSize, k <= 1000.
- 1 <= x <= 1000.
- 0 <= val <= 100.
- At most 1000 calls to each method occur per test.
