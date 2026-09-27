## Intuition

Only the segment from left through right must change direction.
A dummy node gives the segment a stable predecessor even when left is one.
Move each next node to the front of the growing reversed segment, leaving the segment tail connected to the untouched suffix.

## Brute force

A simple alternative could copy the list values into an array, reverse the selected slice, and write values back.
That takes O(n) extra space and changes data rather than demonstrating link manipulation.
The pointer method reverses links in place with constant auxiliary storage.

## Approach

1. Place a dummy node before head and walk beforeReversed to the node before left.
2. Keep firstNode at the segment's first node.
3. Repeatedly remove firstNode.next from its old position.
4. Insert that moved node immediately after beforeReversed.
5. Repeat right minus left times and return the node after the dummy.

## Walkthrough

Example 1 is [1, 2, 3, 4, 5] with left 2 and right 4.
The dummy walk stops before node 2, and firstNode is 2.
Moving node 3 to the front gives 1, 3, 2, 4, 5.
Moving node 4 to the front gives 1, 4, 3, 2, 5.
The dummy's next node is 1, so that list is returned.

## Complexity

Let n be the linked-list length.
The initial walk and each segment insertion together take O(n) time.
The method uses O(1) auxiliary pointer space and does not allocate a replacement list.
The dummy node is one constant-size helper allocation, while the returned list reuses all original nodes.

## Edge cases

When left equals right, the insertion loop does nothing.
When left is one, the dummy lets the head segment be handled identically.
When right is the final position, the reversed segment naturally ends at null.
The statement guarantees valid positions and a nonempty selected segment.

## Common mistakes

- Losing movedNode.next before reconnecting firstNode disconnects the suffix.
- Inserting after firstNode instead of before it leaves the order unchanged.
- Returning the original head fails when the first position is reversed.
- Advancing firstNode during each insertion changes the fixed tail of the reversed segment.

## Language notes

Python uses the harness-provided ListNode constructor with value and next arguments.
Java uses the same provided ListNode type and keeps the method iterative.
No node values are copied, so identity and links are preserved.
