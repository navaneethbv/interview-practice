## Intuition

Duplicates in a sorted linked list appear next to one another.
When the current node equals its next node, bypassing the next node removes exactly one duplicate.
When values differ, advancing the current pointer preserves the boundary for the next comparison.

## Brute force

A value set could track seen nodes while building a new linked list.
That uses O(n) extra space and can lose the original node identity.
The adjacent comparison uses the sorted order and relinks nodes in place.

## Approach

1. Begin at the head node.
2. While a current node and its next node exist, compare their values.
3. If equal, point current.next past the duplicate.
4. Otherwise move current to its next node.
5. Return the original head.

## Walkthrough

Example 1 is [1,1,2].
The first node and its next node both contain 1, so the first node skips the second.
The current node remains at 1 and now compares with 2.
The values differ, so the scan advances and returns [1,2].

## Complexity

For n nodes, each removed node is bypassed once and each retained boundary is inspected, giving O(n) time.
The relinking algorithm uses O(1) auxiliary space.
It returns the original node chain rather than allocating output nodes.
Garbage collection or freed nodes are outside the algorithm's auxiliary count.

## Edge cases

An empty list returns None or null.
A one-node list needs no comparison.
A run of many equal nodes is collapsed while the current node stays fixed.
An already unique sorted list is returned unchanged.

## Common mistakes

- Advancing after deletion skips the new neighbor of the current node.
- Comparing nonadjacent values requires unnecessary storage.
- Returning the next node after a deletion can lose the head.
- Allocating copied nodes changes the in-place list contract.

## Language notes

Python updates the provided ListNode next reference directly.
Java uses the harness-provided ListNode type and returns the same head.
Both references depend on nondecreasing input order.
