## Intuition

Keep the first node of the selected segment in place as its eventual tail.
Repeatedly detach the node immediately after it and insert that node at the segment's front.
This reverses the segment while maintaining connections to both surrounding portions of the list.

## Brute force

Copy all nodes into an array, reverse the selected index range, and reconnect them.
That uses O(n) additional storage, whereas pointer manipulation needs only a few references.

## Approach

Create a dummy node pointing to head so reversal beginning at index zero uses the same logic as an interior segment.
Advance `before` to the node immediately preceding left, returning the original head if left lies beyond the list.
Set `first` to the segment's initial node.
Up to `right - left` times, detach `first.next` as `moved`, reconnect first to moved's successor, and insert moved immediately after before.
Stop early if first has no next node, handling right beyond the list.
Return `dummy.next`, which may differ from the original head.

## Walkthrough

Example 1 selects indices one through three in `[1, 2, 3, 4, 5]`.
Before points to node 1 and first points to node 2.
Move node 3 before node 2, producing `[1, 3, 2, 4, 5]`.
Then move node 4 before node 3, producing `[1, 4, 3, 2, 5]`.
Node 2 remains the reversed segment's tail and still connects to node 5.

## Complexity

At most n nodes are traversed or moved, so both references take O(n) time.
Huge supplied indices do not force huge loops because traversal stops at the list boundary.
Auxiliary space is O(1), including the single dummy node.

## Edge cases

An empty list or a left index beyond the final node remains unchanged.
A right index beyond the end reverses the available suffix.

## Common mistakes

Save and reconnect moved's successor before inserting moved at the front, or links may be lost or cyclic.
Return the dummy's next pointer when the head can change.

## Language notes

Both languages manipulate the harness-provided `ListNode` links directly.
Python breaks inside the loop at the end; Java includes that condition in the loop header.
