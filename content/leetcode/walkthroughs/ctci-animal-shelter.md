## Intuition

Species-specific adoption needs the oldest dog or cat, while `dequeueAny` needs the oldest animal across both species.
Two FIFO queues preserve each species order, and a monotonically increasing arrival number lets the cross-species operation compare their fronts.
No scan through the rest of either queue is necessary.

## Approach

Keep one deque for dogs, one deque for cats, and increment `arrivals` for every enqueue.
Store each animal's arrival number with its name in the species queue.
For a species dequeue, pop the front or return the empty string when that queue is empty.
For `dequeueAny`, handle an empty queue first, then compare the two front arrival numbers and release the older one.

## Walkthrough

In Example 1, Rex receives arrival zero, Tom arrival one, and Kit arrival two.
`dequeueCat` removes Tom from the cat queue, leaving Kit as the oldest cat.
`dequeueAny` compares Rex's zero with Kit's two and removes Rex, then the final call removes Kit.
In Example 2, an empty shelter returns an empty string, and a later dog enqueue does not make `dequeueCat` eligible.

## Complexity

Every enqueue and dequeue performs constant work, so each operation is `O(1)`.
The two queues together store `O(n)` animals after `n` enqueues.
The arrival counter is constant auxiliary state beyond the stored animals.

## Edge cases

All three dequeue methods return an empty string when their required population is unavailable.
If one species queue is empty, `dequeueAny` must release from the other without comparing nonexistent fronts.
Animals with the same name remain distinct because arrival order, rather than name, identifies them.

## Common mistakes

Using one queue and filtering it for a species can lose FIFO information or require linear scans.
Comparing names instead of arrival numbers violates the global ordering rule.
Incrementing the counter on dequeue changes future ordering and makes older animals appear newer.

## Language notes

Python stores `(arrival, name)` tuples in `deque` objects and routes empty species cases through the helper methods.
Java stores the same pair in a record and uses `ArrayDeque` fronts.
The Java contract uses camelCase method names, while Python follows the spec's method names exactly.
