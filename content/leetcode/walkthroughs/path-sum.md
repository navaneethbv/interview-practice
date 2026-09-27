## Intuition

A valid path must begin at the root and end at a leaf.
Subtracting each visited node value from the target leaves the amount needed by the remaining suffix.
An explicit stack explores every root-to-leaf route without recursive depth risk.

## Brute force

A method could enumerate every root-to-leaf path and sum each list of values afterward.
That stores path prefixes and can use O(nH) total copying in a skewed tree.
Carrying the remaining sum with each stack entry checks a path as it is traversed.

## Approach

1. Return false when the root is absent.
2. Push the root with the original target.
3. Subtract the current node value from its remaining sum.
4. Return true only when a leaf leaves exactly zero.
5. Push existing children with the updated remaining sum and return false if the stack empties.

## Walkthrough

Example 1 has root 1, children 2 and 3, and target 3.
The stack reaches leaf 2 with remaining sum zero after subtracting the root and that leaf, so the method returns true.
The branch through leaf 3 would leave remaining sum negative, but it is not needed after the valid path is found.
The result is true.

## Complexity

For n nodes, each reachable node is pushed and removed once, giving O(n) time.
The explicit depth-first stack uses O(H) auxiliary space for height H.
No path list or copied tree is allocated.
The boolean result uses O(1) output space.

## Edge cases

An empty tree has no root-to-leaf path and returns false.
A root alone is a leaf and matches when its value equals targetSum.
Negative values are subtracted like any other node value.
A path ending at an internal node does not count.

## Common mistakes

- Returning true when any prefix reaches zero accepts nonleaf paths.
- Starting from every node changes the root-to-leaf requirement.
- Forgetting to push one child misses valid paths.
- Recursive Java traversal can exceed stack depth on a skewed tree.

## Language notes

Python stores node and remaining sum pairs in a list.
Java uses parallel deques and long remaining sums for safe intermediate subtraction.
Both methods observe the provided TreeNode contract.
