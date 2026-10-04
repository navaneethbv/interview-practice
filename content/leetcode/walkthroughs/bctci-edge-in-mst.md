## Intuition

An edge is mandatory exactly when its endpoints cannot be connected without it using edges of no greater weight.
An alternative route of such edges makes it possible to replace the target without increasing spanning-tree cost.

## Brute force

Enumerating all spanning trees is exponential.
Even comparing an MST with and without each candidate does more work than this single-edge question requires.

## Approach

Let the target endpoints be u and v and its weight be weight.
Initialize disjoint sets and join every other edge whose cost is at most weight.
Return whether u and v remain in different components.
If they are disconnected, the cut around u's component has the target as its uniquely cheapest crossing edge, so every MST must include it.
If connected, the alternative path together with the target forms a cycle on which the target is a maximum-weight edge; an MST exists that omits it.

## Walkthrough

```text
Input: [3, [[0, 1, 1], [1, 2, 1], [0, 2, 1]], 0]
Output: false
```

Example 1 selects edge `[0, 1, 1]` in an equal-weight triangle.
Ignoring that edge, the two remaining weight-1 edges connect 0 to 2 to 1.
Union-find therefore gives the target endpoints the same root.
The method returns false: an MST can use those two other edges and achieve the same total cost.

## Complexity

For V vertices and E edges, time is O(V + E alpha(V)) with path compression and union by size.
The component arrays use O(V) extra space.
No edge sorting is performed.

## Edge cases

Negative weights are handled by ordinary ordering.
An edge that is a graph bridge is mandatory.
Equal-weight replacement routes must count as alternatives.

## Common mistakes

Exclude the target itself from unions.
Using only strictly lighter edges answers a different question and mishandles equal-weight cycles.

## Language notes

Both references use the shared disjoint-set pattern with sizes and compressed root searches.
The result is about every MST, not merely membership in one particular MST.
