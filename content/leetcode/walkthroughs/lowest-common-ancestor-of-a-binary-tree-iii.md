## Intuition

Parent links turn the tree problem into intersecting two upward paths.
If the paths have different lengths, switching each pointer to the other starting node after reaching null equalizes the total distance traveled.
The pointers then meet at the lowest common ancestor without needing the root or a visited set.

## Brute force

A path-set approach can walk p to the root, store every ancestor, and then walk q until a stored node appears.
That takes O(h) time and O(h) extra space for height h.
The pointer-switching method keeps the same linear time with constant auxiliary space.

## Approach

1. Start first at p and second at q.
2. Move each pointer to its parent.
3. When a pointer reaches null, restart it at the other original node.
4. Continue until both references are identical.
5. Return the meeting node.

## Walkthrough

Example 1 uses p = 5 and q = 1 in the provided tree.

| step | first pointer | second pointer |
| ---: | --- | --- |
| 0 | 5 | 1 |
| 1 | 3 | 3 |

Both nodes are direct children of 3, so the pointers meet at 3, which is the returned original node.

## Complexity

Let h be the tree height.
Each pointer traverses at most both upward paths, so time is O(h).
Only two node references are stored, giving O(1) auxiliary space.
No new tree nodes are allocated.

## Edge cases

If p equals q, the loop returns that node immediately.
If one node is an ancestor of the other, the pointers meet at the ancestor.
The root is found when both paths eventually pass through its reference.
The contract guarantees that both nodes belong to the same tree.

## Common mistakes

- Comparing node values instead of references can fail when values are not unique in another contract.
- Starting both pointers at the same node ignores q.
- Returning the first common value without parent identity can violate the judge contract.
- Walking only the shorter path misses an ancestor after unequal depths.

## Language notes

Python checks object identity with is, which matches the original node requirement.
Java compares Node references with == rather than comparing val fields.
Both use null switching to the other start node and do not require a root argument.
