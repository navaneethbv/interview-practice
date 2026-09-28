## Intuition
The first unique value must respect insertion order, while duplicate status changes over time.
A frequency map tracks status and a queue preserves order.
Repeated values at the queue front can be discarded lazily when a query arrives.

## Brute force
Scanning every stored value and recounting its occurrences for each query can be quadratic.
The map makes duplicate checks constant expected time, and stale queue entries are removed once.

## Approach

1. Initialize counts from the constructor values and enqueue them in their original order.
2. `add` increments a value's count and appends it to the queue.
3. Before `showFirstUnique`, pop from the front while the front value's count is not one.
4. The remaining front is the earliest value that has appeared exactly once, or -1 if no such value remains.

## Walkthrough
For Example 1, the initial stream `[2,3]` has 2 as its first unique value.
Adding 2 makes the front 2 repeated, so it is discarded and 3 becomes the answer.
Adding 3 then makes both values repeated, so the next query returns -1.
For initial `[7,7]`, the queue has no unique front, and adding 8 makes 8 the first unique value.

## Complexity
Each queued entry is appended once and removed at most once.
Across all operations, time is O(n + q) expected, where n is initial size and q is calls.
The map and queue use O(n+q) space.

## Edge cases
A repeated value may appear multiple times in the queue, but all stale copies are safely removed together.
An empty unique set returns -1.
Adding a value does not remove it immediately; lazy cleanup waits for the next query.

## Common mistakes
Do not remove a unique value merely because it was returned once; only a second occurrence changes its status.
Do not rebuild the queue on every query.

## Language notes
Python uses `Counter` and `deque`.
Java uses `HashMap` and `ArrayDeque` with equivalent lazy removal.
