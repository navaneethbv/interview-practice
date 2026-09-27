# Min Stack

Implement a stack that supports `push(val)`, `pop()`, and `top()`, as well as `getMin()` to read its smallest value.
All four operations must run in O(1) time.
`pop`, `top`, and `getMin` are only called on a nonempty stack.

Construct one instance per test, then execute the listed operations in order.
The output contains one entry per operation; void methods produce null, and constructor output is omitted.

## Examples

### Example 1

```text
Input: ctor = [], ops = ["push", "push", "getMin", "top", "pop", "getMin"], args = [[3], [-1], [], [], [], []]
Output: [null, null, -1, -1, null, 3]
Explanation: After pushing 3 and -1, both top and minimum are -1; popping restores the minimum to 3.
```

### Example 2

```text
Input: ctor = [], ops = ["push", "push", "pop", "top"], args = [[5], [5], [], []]
Output: [null, null, null, 5]
Explanation: Removing one of the equal values leaves the other 5 on top.
```

## Constraints

- Values are signed 32-bit integers.
- At most 30000 method calls occur per test.
