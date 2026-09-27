## Intuition

The `incoming` stack receives new values in insertion order, while `outgoing` exposes the oldest value at its top.
Moving all values from `incoming` to `outgoing` reverses their order exactly once for each batch.
As long as `outgoing` is nonempty, later pushes can wait in `incoming` without changing the front.

## Brute force

Moving every value back and forth for every operation would implement the queue but could take O(n) per `pop` or `peek`.
The two-stack arrangement avoids repeated reversals by transferring only when the output stack is empty.

## Approach

1. Push every new `x` onto `incoming`.
2. Before `pop` or `peek`, call `transferIfNeeded`.
3. If `outgoing` is empty, pop all values from `incoming` and push them onto `outgoing`.
4. Remove or inspect the top of `outgoing` for the requested operation.
5. Report emptiness only when both stacks are empty.

## Walkthrough

Example 1 performs `push(1)`, `push(2)`, `peek`, `pop`, and `empty`.
The table uses Python list order, with the top of each stack on the right.

| operation | `incoming` | `outgoing` | result |
| --- | --- | --- | --- |
| `push(1)` | `[1]` | `[]` | null |
| `push(2)` | `[1, 2]` | `[]` | null |
| `peek` | `[]` | `[2, 1]` | 1 |
| `pop` | `[]` | `[2]` | 1 |
| `empty` | `[]` | `[2]` | false |

The transfer reverses the stack order, placing the oldest value on top.

## Complexity

- Time: O(1) amortized per operation, because each value transfers at most once in each direction of the queue lifecycle.
- Space: O(n), for the values held by the two stacks.

## Edge cases

An empty queue has both stacks empty.
Several peeks reuse the same `outgoing` top without moving data again.
After `outgoing` is drained, the next operation transfers any newly pushed values.
The spec guarantees that `pop` and `peek` are never called on an empty queue.

## Common mistakes

- Always transferring values reverses an already correctly ordered `outgoing` stack.
- Pushing onto the output stack first makes newer values appear before older values.
- Defining `empty` from only one stack misses queued values waiting in the other.

## Language notes

Python uses lists and their `append` and `pop` operations as stacks.
Java uses `ArrayDeque<Integer>` with `push`, `pop`, and `peek`.
The class name and public methods remain `MyQueue`, matching the design spec rather than a `Solution` class.
