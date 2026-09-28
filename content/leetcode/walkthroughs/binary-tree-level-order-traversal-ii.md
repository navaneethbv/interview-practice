## Intuition
Breadth-first traversal visits levels from the root downward.
Python appends levels and reverses the completed list, while Java prepends each completed level to a linked result list.
Both preserve left-to-right order within each level.

## Brute force
Running a separate traversal for every depth repeats work.
One queue processes each node exactly once.

## Approach
1. Return an empty list for a null root.
2. Put the root in a queue.
3. Capture the current queue size and remove exactly that many nodes into one level list.
4. Enqueue left and right children.
5. Add the level to the front of the result and continue.

## Walkthrough
For Example 1, normal breadth-first levels are `[3]`, `[9,20]`, and `[15,7]`.
Adding each new level to the front yields `[[15,7],[9,20],[3]]`.
An empty root has no queue entries and returns an empty result.

## Complexity
Each node enters and leaves the queue once, so time is O(n).
The queue and result store O(n) values in the worst case.

## Edge cases
A single node produces one level.
Child order remains left to right because children are enqueued in that order.

Prepending avoids a separate index calculation and keeps the output naturally aligned with the required deepest-first order.

## Common mistakes
Capture the level size before dequeuing.
Add completed levels to the front or reverse only after traversal, but do not reverse values inside a level.
Handle a null root before queue initialization.

## Language notes
Python appends levels and reverses the completed level list at the end.
Java uses `LinkedList.addFirst` while preserving each level's order.
