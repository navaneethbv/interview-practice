# Design Circular Queue

Implement a fixed-capacity circular queue.
`enQueue(value)` inserts at the rear and returns false when full.
`deQueue()` removes the front and returns false when empty.
`Front()` and `Rear()` read endpoints, returning -1 when empty.
`isEmpty()` and `isFull()` report the current state.
Void operations display `null`.
Each test uses a fresh instance.

## Constraints

- `1 <= k <= 1000`.
- Values range from 0 to 1000.
- At most 3000 operations occur.

## Examples

### Example 1

```text
Input: ctor = [2], ops = ["enQueue", "enQueue", "enQueue", "Front", "Rear", "deQueue", "enQueue", "Rear"], args = [[1], [2], [3], [], [], [], [3], []]
Output: [true, true, false, 1, 2, true, true, 3]
Explanation: After removing 1, the queue can wrap and accept 3.
```

### Example 2

```text
Input: ctor = [1], ops = ["Front", "Rear", "deQueue", "isEmpty"], args = [[], [], [], []]
Output: [-1, -1, false, true]
Explanation: An empty queue has no endpoints.
```
