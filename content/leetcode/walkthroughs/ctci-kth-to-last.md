## Intuition

Keep two pointers a fixed k nodes apart.
When the leading pointer reaches the end, the trailing pointer is exactly k nodes from the end.
This avoids counting the list length first or storing nodes.

## Brute force

Counting the nodes and then walking length minus k steps works in two passes.
Storing the list values would also work, but both approaches use more traversal or memory than necessary.

## Approach

Advance lead by k links before moving trail.
Then move lead and trail together until lead is null.
The initial gap ensures that trail reaches the target when lead reaches one position beyond the final node.
Return trail.val.

## Walkthrough

In Example 1, advancing lead by two nodes places it at node 3 while trail remains at node 1.
Each simultaneous step moves the pair one position.
When lead passes node 5 and becomes null, trail points to node 4, whose value is 4.
For the one-node example, lead becomes null during the initial advance and trail remains at the only node.

## Complexity

The two pointers traverse the list at most once after the initial gap.
The algorithm takes O(n) time and O(1) extra space.

## Edge cases

When k equals the list length, the answer is the head value.
When k is one, the answer is the final node.
The constraints guarantee a non-empty list and a valid k, so no invalid pointer check is needed.

## Common mistakes

Advancing lead only k minus one times returns the node before the requested position.
Moving trail before establishing the gap shifts the answer by one.
Returning the node instead of its value violates the int return contract.

## Language notes

Python and Java both use a lead pointer for the initial k-step advance.
The Java loop checks lead only after the guaranteed-valid advance supplied by the constraints.
Neither reference allocates a collection or mutates the linked list.
