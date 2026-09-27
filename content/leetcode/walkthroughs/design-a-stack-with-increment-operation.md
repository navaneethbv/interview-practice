## Intuition

An increment affects the bottom portion but may be popped later after elements above it.
Store each increment as a pending addition at the top index of the affected range and pass that addition downward when popping.

## Brute force

Adding `val` directly to every bottom element costs `O(k)` per increment.
The pending array makes both increment and pop constant time.

## Approach

1. Push values and a zero pending addition while capacity allows.
2. For `increment(k, val)`, add `val` to `pending[min(k, size) - 1]`.
3. On pop, combine the top value with its pending addition.
4. Transfer that addition to the next lower pending slot before returning the result.

## Walkthrough

For Example 1, pushing 1 and 2 gives stack `[1, 2]`.
`increment(2, 10)` stores 10 at the pending slot for the top of the affected prefix and represents `[11, 12]` lazily.
The first pop returns 12 and passes 10 downward, so the next pop returns 11.
The empty pop returns `-1`.

## Complexity

Push, pop, and increment each take `O(1)` time.
The value and pending arrays use `O(maxSize)` space.

## Edge cases

Push is ignored at capacity, and increment applies to all present values when `k` exceeds the stack size.
Pop on an empty stack returns `-1` without changing pending state.

## Common mistakes

- Applying an increment to the top instead of the bottom changes the operation.
- Forgetting to propagate pending addition after pop loses increments for lower values.
- Increasing `size` before checking capacity allows an overflow write.

## Language notes

Python uses parallel lists, while Java uses fixed arrays and an explicit `size`.
The lazy pending representation avoids any recursion or dependency on helper classes.
