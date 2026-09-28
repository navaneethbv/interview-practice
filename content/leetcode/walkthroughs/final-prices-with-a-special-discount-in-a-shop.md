## Intuition

For each price, the first later price no greater than it is the discount.
A monotonic stack keeps unresolved indices whose discount has not appeared yet, and the current price resolves every larger or equal top price immediately.

## Brute force

Scanning rightward from every item costs `O(n^2)` time.
The stack ensures each index is pushed and popped once.

## Approach

1. Copy `prices` into `result` and keep a stack of unresolved indices.
2. Scan prices left to right.
3. While the current price is no greater than the price at the stack top, subtract it from that result and pop the index.
4. Push the current index for a future discount.

## Walkthrough

For Example 1, prices are `[8, 4, 6, 2, 3]`.
Price 4 resolves 8, making the first result 4.
Price 6 waits because it is larger than 4, then price 2 resolves both 6 and 4, producing 4 and 2.
Price 3 is larger than the unresolved price 2, so index 3 keeps its full price and the final results are `[4, 2, 4, 2, 3]`.

## Complexity

Each index enters and leaves the stack once, so time is `O(n)`.
The result copy and stack use `O(n)` space.

## Edge cases

An equal later price qualifies because the comparison is `>=` when resolving the stack.
The final unresolved indices keep their original prices.

## Common mistakes

- Searching from the right and accepting a later qualifying price can skip the earliest one.
- Using `>` instead of `>=` misses equal discounts.
- Storing values rather than indices can make it harder to update the correct output positions.

## Language notes

Python uses a list as a stack, while Java uses `ArrayDeque<Integer>`.
Both references copy the input so the caller's original prices remain unchanged.
