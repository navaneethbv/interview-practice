## Intuition

Only upward moves consume resources, and ladders are most valuable on the largest climbs.
A min-heap keeps every climb currently assigned to a ladder, allowing the smallest climb to be exchanged for bricks whenever the ladder limit is exceeded.

## Brute force

Trying every assignment of ladders to upward moves has exponential possibilities.
A greedy choice that always uses bricks immediately can waste bricks on a climb that a ladder should cover.

## Approach

1. Scan adjacent buildings and ignore non-increasing moves.
2. Push each positive rise into `climbs`.
3. If more than `ladders` rises are stored, remove the smallest one and pay that amount with bricks.
4. Stop before a move when bricks become negative, or return the final building if every move succeeds.

## Walkthrough

For Example 1, `heights = [4,2,7,6,9,14,12]`, `bricks = 5`, and `ladders = 1`, the move from 4 to 2 costs nothing.
The rise from 2 to 7 enters the heap as 5 and is covered by the ladder.
The move from 7 to 6 is free.
The rise from 6 to 9 adds 3, so the heap holds 3 and 5, and the smallest rise 3 is paid with bricks, leaving 2.
The rise from 9 to 14 adds 5, so the smallest current rise 5 is paid with the remaining 2 bricks, which fails.
The traversal stops at index 4, the building of height 9.

## Complexity

There are at most n positive rises, each heap operation costs O(log n), so time is O(n log n).
The heap stores at most n rises, giving O(n) auxiliary space.

## Edge cases

All descending or equal heights require no resources and reach the last index.
With zero ladders, every positive rise is paid from bricks.
The code returns the index before the first unaffordable upward move, not the index of the failed destination.

## Common mistakes

Do not assign ladders permanently to the first rises, because later exchanges may improve the allocation.
Do not subtract bricks before removing the smallest climb when the heap exceeds the ladder count.
Equal-height moves should not enter the heap.

## Language notes

Python's `heapq` and Java's `PriorityQueue<Integer>` are both min-heaps.
Java `bricks` remains an `int` because the problem's resource bounds fit the method contract.
