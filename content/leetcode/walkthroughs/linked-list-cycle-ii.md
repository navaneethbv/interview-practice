## Intuition

A slow pointer moves one node while a fast pointer moves two.
If they meet, the cycle exists.
Resetting one pointer to the head and moving both one step makes their next meeting the cycle entry.

## Brute force

A set of visited node identities can detect the first node encountered twice.
That takes O(n) extra space.
Floyd's two-pointer method uses the cycle's relative motion to achieve constant auxiliary space.

## Approach

1. Start slow and fast at the head.
2. Move slow one step and fast two steps while both moves are valid.
3. On a meeting, reset slow to the head.
4. Move both one step until they meet again.
5. Return that meeting node, or null when fast reaches the end.

## Walkthrough

Example 1 has values [3,2,0,-4] with the tail linking back to the node at index 1.
The pointers eventually meet inside the cycle.
After resetting slow to the head, equal one-step movement makes them meet at the node containing 2.
The returned node is the cycle entry at index 1.

## Complexity

Let n be the number of nodes.
The two phases together take O(n) time.
Only two node references are stored, so auxiliary space is O(1).
The list is not modified and the returned node is an existing object.

## Edge cases

A null head has no cycle.
A one-node self-loop returns that node.
A cycle beginning at the head is handled by the reset phase.
A tail ending in null returns null after the first phase.

## Common mistakes

- Returning the first meeting point is not always returning the cycle entry.
- Moving fast one step destroys the relative-speed proof.
- Using node values instead of object identity conflates equal values.
- Forgetting fast.next in the loop guard can dereference null.

## Language notes

Python uses identity comparison with is.
Java uses reference comparison with ==.
Both references return the original ListNode object.
