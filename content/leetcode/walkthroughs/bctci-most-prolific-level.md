## Intuition

Every child of a node on one level appears on the next level exactly once.
Therefore a level's average child count equals the next level's size divided by its own size.
Individual node values and the distribution of children within a level do not affect that ratio.

## Approach

Traverse the tree breadth first and record each level size in `sizes`.
Append a final zero for the nonexistent level below the leaves.
Start with level zero as `best`, then compare every later level's ratio with the current best ratio.
Use cross multiplication instead of division: a candidate wins when its next-level size times the best level's size is strictly larger than the reverse product.
All real level sizes are positive, so multiplication preserves the ordering of the ratios.
Strict comparison retains the earliest level on a tie.
Return -1 immediately for an empty tree.

## Walkthrough

Example 1 has level sizes 1, 1, 2, and 3 under the local level-order tree representation.
Appending zero yields `[1, 1, 2, 3, 0]`.
The averages are 1, 2, 1.5, and 0.
Level 1 has the greatest average, because its sole node has two children.
The returned index is therefore 1, even though level 3 contains the most nodes.

## Complexity

Both references visit n nodes once, giving O(n) time.
They store O(h) level sizes plus O(w) nodes for breadth-first traversal, where h is the number of levels and w is maximum width.
The worst-case space bound is O(n).

## Edge cases

A one-node tree returns level zero with average zero.
A chain ties on all nonleaf levels, so the root level wins.

## Common mistakes

The largest level is not necessarily the most prolific level.
Integer division would discard fractional differences and can choose the wrong winner.

## Language notes

Python integers safely hold cross products.
Java casts to `long` before multiplying level sizes, preventing intermediate `int` overflow.
