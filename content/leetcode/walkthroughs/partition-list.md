## Intuition
The required order has two stable groups: nodes below `x`, followed by nodes at least `x`.
Two tail pointers can build these groups in one pass while preserving each group's original order.
Joining the tails finishes the partition without creating replacement nodes.

## Brute force
Collecting values, sorting them, and rebuilding a list violates stability and can lose node identity.
Repeatedly scanning for the next qualifying node also adds avoidable quadratic work.

## Approach

1. Create dummy heads for the smaller and remaining chains.
2. Visit each original node once and append it to the chain selected by `node.val < x`.
3. Detach each node before appending it.
4. Terminate the remaining tail and connect the smaller tail to it.
5. Return the nonempty chain head.

## Walkthrough

For Example 1, `[1,4,3,2,5,2]` and `x = 3`, values 1, 2, and 2 are appended to the smaller chain in that order.
Values 4, 3, and 5 are appended to the other chain in their original order.
Joining the chains produces `[1,2,2,4,3,5]`.
For `[2,1]` and `x = 2`, node 2 goes to the second chain and node 1 to the first, yielding `[1,2]`.

## Complexity
The list is scanned once, so time is O(n).
Only a constant number of pointers and two dummy nodes are added, so auxiliary space is O(1).
The returned nodes are the original nodes, merely relinked.

## Edge cases
An empty list returns null.
If every node is smaller than `x`, the second chain is empty.
If no node is smaller, return the second chain directly.
Values equal to `x` belong in the second group.

## Common mistakes
Do not sort either group.
Detach each node before appending it, or an old link can introduce a cycle or duplicate suffix.
Remember to terminate the second tail before joining.

## Language notes
Python and Java both use dummy nodes to make empty-group handling uniform.
The Java version updates `next` pointers in place and returns a `ListNode` head.
