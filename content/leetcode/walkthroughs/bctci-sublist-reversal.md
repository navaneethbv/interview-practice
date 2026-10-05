## Intuition

The nodes before the requested range should stay attached to the same prefix, while each later node in the range can be moved directly after that prefix.
Repeatedly removing the node after the current range head and inserting it at the front reverses the range in place.

## Brute force

Copying the values into an array, reversing a slice, and rebuilding links is straightforward.
It uses O(n) extra memory and loses the useful property that the existing nodes can be rearranged directly.

## Approach

Place a dummy node before head so that the range has a predecessor even when left is zero.
Advance before until it points to the node immediately before index left.
Keep first at the first node in the range.
For each possible move, detach first.next, insert that moved node after before, and leave first as the tail of the reversed prefix.
Stop naturally when the list ends, so a right index beyond the list reverses through the final node.

## Walkthrough

In Example 1, before first points to node 1 and first points to node 2.
The first move takes 3 out and places it after 1, producing 1, 3, 2, 4, 5.
The second move takes 4 out and places it after 1, producing 1, 4, 3, 2, 5.
The dummy's next pointer is returned, which also handles a range beginning at the head.

## Complexity

The pointer walk and each link change take O(n) time in total.
The algorithm uses O(1) extra space besides the existing list nodes.

## Edge cases

An empty list returns null.
If left is past the list, the early check returns the original head unchanged.
If right is past the list, the loop stops when first.next is null.
Reversing the whole list works because the dummy remains before the changing head.

## Common mistakes

Advancing first after moving a node skips part of the range because first is intentionally kept at the reversed prefix tail.
Forgetting to update first.next before inserting moved can create a cycle.
Returning head instead of dummy.next fails when index zero is included.

## Language notes

Python uses a ListNode dummy and a range loop guarded by moved being non-null.
Java expresses the same splice with a loop condition that checks first.next.
Both references mutate links and return the original node objects in their new order.
