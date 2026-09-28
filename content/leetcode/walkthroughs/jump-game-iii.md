## Intuition

Each index is a graph node with up to two destinations, `i-arr[i]` and `i+arr[i]`.
A visited set prevents cycles while DFS or BFS explores every reachable index.

## Brute force

Recursive search without visited tracking can revisit a cycle indefinitely.
A graph traversal records each index once.

## Approach

1. Start a stack or queue with `start`.
2. Return true when a removed index contains zero.
3. Generate both legal jumps and enqueue unseen in-bounds destinations.
4. Return false after all reachable indices are exhausted.

## Walkthrough

For Example 1, start 5 has value 1 and can jump to 4 or 6.
From 4, value 3 reaches 1 or 7, and from 1, value 2 reaches 3.
Index 3 contains zero, so the traversal returns true.

## Complexity

Each index is visited at most once and generates two destinations, giving O(n) time and O(n) seen and pending space.
Python uses a set and list; Java uses a boolean array and `ArrayDeque`.

## Edge cases

Starting on zero returns true.
Out-of-bounds destinations are ignored.
Cycles are harmless once an index is marked seen.
The pending collection can contain indices in either traversal order because only reachability matters.

## Common mistakes

Try both plus and minus jumps.
Mark before enqueueing.
Do not confuse the value at the destination with the jump size.

## Language notes

The Python stack gives depth-first order, while Java's queue gives breadth-first order.
Reachability is independent of that order.
The seen set also prevents the two jump choices from enqueueing the same destination repeatedly.
