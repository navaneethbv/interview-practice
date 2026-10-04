## Intuition

Connectivity changes only when a new cable joins two previously separate components.
Tracking the number of components therefore reveals the first moment the entire network becomes connected.

## Brute force

Rebuilding the graph and traversing it after each added cable repeats earlier connectivity work.
A disjoint-set structure retains the partition as cables arrive.

## Approach

Initialize each vertex as its own parent and set `components = V`.
For each cable in input order, find both endpoint roots.
If they differ, link one root to the other and decrement components.
Return the current zero-based cable index immediately when components reaches one.
A cable inside one existing component changes no reachability and does not decrement the count.
If the sequence ends with multiple components, return -1.
The find helper compresses paths by redirecting nodes to their grandparents.

## Walkthrough

```text
Input: V = 4, cables = [[0, 2], [1, 3], [0, 1], [1, 2]]
Output: 2
```

Example 1 begins with four components.
Cable 0 joins 0 with 2, leaving three components.
Cable 1 joins 1 with 3, leaving two.
Cable 2 joins these two groups through 0 and 1, leaving one component.
The reference returns 2 without needing to process the final cable, which would be redundant.

## Complexity

Initialization uses O(V) time and space.
The reference uses path compression but no union-by-rank or size heuristic, so the standard combined-heuristic inverse-Ackermann bound should not be assumed.
A conservative bound is O(V + EV) time for E cables, since an individual root walk is at most O(V).

## Edge cases

No cables means -1 under V at least two.
Cycles do not reduce component count.
A disconnected final network returns -1 even if many cables were added.

## Common mistakes

Return the cable index, not the number of cables processed.
Link roots rather than arbitrary endpoint nodes.

## Language notes

Python closes over the parent array.
Java stores it in a field; both use iterative find and avoid recursion depth concerns.
