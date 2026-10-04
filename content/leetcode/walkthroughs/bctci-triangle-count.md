## Intuition

Fix the triangle's top node a.
At each equal distance below it, there is at most one endpoint reached using only left children and one reached using only right children.
Both endpoints existing is exactly one triangle at that distance.

## Brute force

Trying every triple of nodes and checking ancestry and depth is unnecessarily expensive.
The restricted left-only and right-only routes identify the only possible endpoints directly.

## Approach

For each root, initialize pointers to its left and right children.
While both pointers exist, increment pairs and advance the left pointer through left children and the right pointer through right children.
Add the recursively computed triangle counts from both subtrees.
Every triangle is counted at its unique top node and unique endpoint distance.
Starting with children ensures all three nodes are distinct; the top node itself is never treated as an endpoint.

## Walkthrough

```text
Input: root = [0, 1, 2, null, 3, 4, 5, 6, 7, 8, null, null, 9]
Output: 4
```

Example 1 has one triangle topped at node 0 using endpoints 1 and 2.
Node 3 contributes one using children 6 and 7.
Node 2 contributes one using children 4 and 5, then another one level farther down using 8 and 9.
Other nodes lack at least one required branch.
The total is 1 + 1 + 2 = 4.

## Complexity

For n nodes and height h, a conservative bound is O(nh) time because each top node may scan two extreme chains of length h.
Recursive subtree traversal uses O(h) stack space.
The algorithm does not store ancestor tables or all candidate triangles.

## Edge cases

An empty tree returns zero.
A one-sided chain contains no triangles.
Unequal branch lengths contribute only as far as the shorter required chain remains present.

## Common mistakes

Ordinary descendants are insufficient: the left endpoint must follow only left edges, and the right endpoint only right edges.
Do not pair endpoints at different depths.

## Language notes

Python and Java use the same paired-pointer scan and recursive decomposition.
Node values do not influence counting; only tree structure determines the result.
