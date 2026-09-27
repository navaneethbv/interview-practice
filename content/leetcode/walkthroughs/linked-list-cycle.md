## Intuition

A fast pointer moving two links per iteration eventually catches a slow pointer moving one link if both remain inside a cycle.
Without a cycle, the fast pointer eventually reaches null.
The comparison must use node identity, because repeated values do not imply repeated nodes.

## Brute force

Store every visited node in a set and report a cycle when a node is seen twice.
This takes O(n) time and O(n) space.
Floyd's two-pointer method retains linear time while reducing extra space to a constant.

## Approach

1. Initialize `slow` and `fast` to `head`.
2. Continue only while `fast` and `fast.next` both exist.
3. Move `slow` one link and `fast` two links.
4. Return true if they now refer to the same node.
5. Return false if the fast pointer reaches the end.

Once both pointers are in a cycle of length L, their relative position advances by one modulo L per iteration.
They must therefore meet within at most L additional iterations.
Comparing only after movement avoids declaring a cycle simply because both pointers start at the head.

## Walkthrough

Example 1 creates `5 -> 7 -> 9 -> 7`, where the final link returns to the same node containing 7.

| Iteration | `slow` node value | `fast` node value | Same node? |
| --- | --- | --- | --- |
| Start | 5 | 5 | Not checked yet |
| 1 | 7 | 9 | No |
| 2 | 9 | 9 | Yes |

The pointers meet at the node containing 9 and the method returns true.
The cycle entry need not be the meeting point because the problem asks only whether a cycle exists.

## Complexity

- Time: O(n), measured over the distinct reachable nodes before traversal repeats.
- Space: O(1), retaining two node references.

## Edge cases

An empty list returns false.
A single node pointing to null returns false, while a single node pointing to itself returns true.
Equal values in different nodes do not cause a false positive.

## Common mistakes

- Comparing values instead of identities mistakes duplicates for cycles.
- Reading `fast.next.next` without checking both required links can dereference null.
- Testing the initial pointer equality returns true for every nonempty list.

## Language notes

Python uses `is` to test object identity.
Java's `==` compares the `ListNode` references directly.
The fixture's `pos` is used only by the harness to construct the links and is not a method argument.
