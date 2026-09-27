## Intuition

Two pointers separated by n links can locate a position relative to the end without first measuring the list.
When the leading pointer reaches the tail, the trailing pointer is immediately before the node to remove.
Starting both pointers from a dummy node also covers removing the original head.

## Brute force

Count all nodes, then make a second pass to find the predecessor of the node at position length minus n.
This is O(length) time and O(1) space, but uses two passes.
The fixed-gap technique finds the predecessor during one forward traversal.

## Approach

1. Create `dummy` pointing to `head`, and initialize `fast` and `slow` there.
2. Advance `fast` exactly n links.
3. While `fast.next` exists, move both pointers one link forward.
4. Bypass the target using `slow.next = slow.next.next`.
5. Return `dummy.next`, which may differ from the original head.

The distance between the pointers remains n links throughout their joint movement.
Because the loop stops at the tail rather than at null, `slow` lands on the predecessor rather than the target itself.

## Walkthrough

Example 1 has `[2, 4, 6, 8]` and `n = 2`.

| Stage | `slow` | `fast` |
| --- | --- | --- |
| Initialize | Dummy | Dummy |
| Advance fast twice | Dummy | Node 4 |
| Move together once | Node 2 | Node 6 |
| Move together again | Node 4 | Node 8 |

The fast pointer is at the tail, so stop.
Change node 4's next link from node 6 to node 8.
The result is `[2, 4, 8]`.

## Complexity

- Time: O(length), because the leading pointer traverses the list once and the trailing pointer follows part of it.
- Space: O(1), with a dummy node and two moving references.

## Edge cases

Removing the head leaves `slow` at the dummy.
Removing the only node sets `dummy.next` to null.
For n equal to one, the trailing pointer stops immediately before the tail.
The statement guarantees that n is a valid removal position.

## Common mistakes

- Mixing a gap of n with the wrong null-stop condition removes the wrong node.
- Returning the original head fails when that head was removed.
- Deleting by value is ambiguous when values repeat.

## Language notes

Both references use the harness-provided two-argument `ListNode` constructor for the dummy.
Python uses `None` and Java uses `null` for the empty result.
The operation mutates a next-pointer; it does not allocate a replacement list or alter surviving values.
