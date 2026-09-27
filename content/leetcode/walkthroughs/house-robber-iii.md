## Intuition

Robbing a node prevents robbing its children, but it does not prevent robbing its grandchildren.
For every node, keep two values: the best total when robbing it and when skipping it.
A postorder traversal combines child states after both subtrees are solved.

## Brute force

A recursive choice could branch into robbing or skipping every node.
Without memoization, overlapping subtree decisions cause exponential recomputation.
The two-state recurrence stores exactly the information needed by the parent.

## Approach

1. Traverse each subtree in postorder.
2. Compute robCurrent as the node value plus skipped totals from both children.
3. Compute skipCurrent as the better state from each child.
4. Store both states for the node.
5. Return the larger root state.

## Walkthrough

Example 1 is [3,2,3,null,3,null,1].
Robbing root 3 allows child skips and grandchildren 3 and 1, giving 7.
Skipping the root allows the best child choices but does not exceed 7.
The method returns 7.

## Complexity

Each node is processed once, giving O(n) time.
Both references store two states for every node, so their auxiliary state maps use O(n) space.
The iterative Python and Java traversals also use O(H) active stack records, with O(n) total stored state.
The tree is not mutated.
The scalar result is not additional output storage.

## Edge cases

A null root returns zero.
A leaf's rob state is its value and its skip state is zero.
Negative values are handled by choosing the skip state when better.
A skewed tree increases the explicit stack depth to H without risking recursive call-stack overflow.

## Common mistakes

- Adding child rob states when robbing the current node violates adjacency.
- Returning only the rob state misses cases where skipping the root is better.
- Combining states before both children finish uses incomplete data.
- Forgetting the null state makes leaf calculations awkward.

## Language notes

Python uses an explicit postorder stack to avoid recursion.
Java uses matching explicit stacks and a state map to avoid overflowing on a deep valid tree.
Both return the maximum of the two root states.
