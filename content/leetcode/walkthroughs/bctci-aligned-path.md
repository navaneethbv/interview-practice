## Intuition

A path may join an aligned chain from the left child to one from the right child through their parent.
The value returned upward must still be a single chain, because a parent cannot attach to both branches without revisiting the joining node.

## Brute force

Trying every pair of endpoints and checking the path between them can take quadratic or worse time.
Postorder traversal provides both downward chain lengths at their possible joining point.

## Approach

`chain(node, depth)` recursively obtains `left` and `right` lengths.
If the node is misaligned, return zero, breaking any path through it.
Otherwise update `best` with `left + right + 1`, the longest path turning at this node.
Return `max(left, right) + 1` so ancestors receive only one usable branch.
Both children are searched even when their parent is misaligned, preserving paths entirely inside either subtree.
The distinction between the global candidate and the returned chain is the central invariant.

## Walkthrough

```text
Input: root = [7, 1, 3, 2, 8, null, 2, 4, 3, null, null, 3, 3]
Output: 3
Explanation: 1, 2, 3 on the left and 3, 2, 3 on the right both have 3 nodes.
```

Example 1 contains the left-side aligned chain 1, 2, 3, giving length 3.
On the right, an aligned node 2 at depth 2 has aligned children 3 and 3 at depth 3.
Their returned lengths are each 1, so the path through their parent has length `1 + 1 + 1 = 3`.
The misaligned ancestors prevent joining these separate regions, and the answer remains 3.

## Complexity

Time is O(n), since each node combines two child summaries once.
Auxiliary space is O(h) for the recursion stack.

## Edge cases

An empty tree returns zero.
A singleton with value 5 is misaligned at depth zero and returns zero.
A one-sided tree can still contain a long valid path.

## Common mistakes

Returning `left + right + 1` to the parent would reuse a branching path as if it were a chain.
Do not skip descendants of a misaligned node.

## Language notes

Python's closure and Java's field both retain the global best while recursive calls return local chain lengths.
