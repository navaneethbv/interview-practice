## Intuition

A dummy predecessor lets the same link update remove matching nodes at the head or in the middle.
Advance the predecessor only when its next node should remain.

## Brute force

Building a separate list copies every retained node.
One pointer pass can reuse the original nodes and unlink only matches.

## Approach

1. Put a dummy node before head.
2. Inspect previous.next.
3. Bypass it when its value equals val, otherwise advance previous.
4. Return dummy.next.

## Walkthrough

Example 1:

For [2,1,2,3] and val 2, the dummy bypasses the first 2.
The node 1 remains, the next 2 is bypassed, and 3 remains.
The result is [1,3].

## Complexity

Each node is examined once, so time is O(n).
The dummy and pointer use O(1) auxiliary space.
Both references reuse retained list nodes without output copies.

## Edge cases

An empty list returns null.
If every node matches, dummy.next becomes null.
Consecutive matching nodes are removed without advancing past them.

## Common mistakes

Do not advance the predecessor after deletion.
Use the next pointer of the node being removed.
Return the node after the dummy rather than the dummy itself.

## Language notes

Python and Java use the supplied ListNode class.
The Java implementation keeps pointer mutations explicit for harness compatibility.
No traversal is needed after the final link bypass.
The retained nodes keep their original relative order.
The input head itself may be bypassed through the dummy node.
This preserves the list contract while removing matching values in place.
The method does not need a second pass to reconnect retained nodes.
