## Intuition

The FIFO queue preserves every value, while a second deque stores only values that could still become the maximum.
A newer larger value makes older smaller candidates unnecessary because it will leave later.

## Brute force

Scanning the whole queue on every maximum query takes O(n) per query.
Maintaining a decreasing candidate deque spreads the work of removing obsolete maxima across the push operations that make them obsolete.

## Approach

`push` appends to `queue`, removes strictly smaller values from the back of `maximums`, and appends the new value there.
`pop` removes the FIFO front and removes the maximum front only if they match.
Peek, max, and size read maintained state.

## Walkthrough

Example 1 pushes 2, 5, and 5.
The FIFO sequence is `[2, 5, 5]`, while maximum candidates are `[5, 5]`.
Popping 2 leaves max 5.
Popping the first 5 removes one maximum candidate, so the other 5 still supplies the next max query.

## Complexity

Each value enters and leaves each deque at most once, making operations amortized O(1).
An individual push can remove many candidates and take O(n).
Peek, max, size, and pop are constant time; storage is O(n).

## Edge cases

Equal maxima must remain as separate candidates so successive pops preserve the correct maximum.
Negative values require no special case.
Queries requiring an element are guaranteed nonempty, and a completely drained queue can be reused.

## Common mistakes

Use a strict less than comparison when discarding tail candidates.
Discarding equal values would lose multiplicity because this version stores values without occurrence indices.
Do not remove from `maximums` merely because any ordinary queue element was popped.

## Language notes

Python uses two `collections.deque` instances.
Java uses two `ArrayDeque<Integer>` instances and unboxes values for comparison.
Void pushes are represented by null outputs in the operation transcript, while pop returns the removed integer.
