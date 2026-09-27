## Intuition

A downward path can start at any ancestor, so checking only root-to-leaf paths misses valid answers.
If two prefix sums differ by targetSum, the nodes between those prefixes form a matching downward path.
A prefix-count map records only sums on the current root-to-node route.

## Brute force

A straightforward method starts a fresh downward traversal from every node.
For a tree with n nodes, those traversals can revisit each subtree and take O(n squared) time in a skewed tree.
The prefix-count method shares the work of all starts and visits each node once.

## Approach

1. Seed the prefix map with sum zero once before visiting the root.
2. Enter a node by adding its value to the current prefix sum.
3. Add the count of prefixSum minus targetSum to the answer.
4. Record the new prefix sum before visiting children.
5. Leave the node by removing that sum so sibling paths cannot reuse it.
6. Use explicit enter and leave frames instead of recursion, keeping the valid-tree traversal safe for deep trees.

## Walkthrough

Example 1 has root 10 and target 8.
At 10 the prefix is 10, so the needed sum 2 is absent.
At 5 the prefix is 15, and the needed prefix 7 is absent.
At 3 the prefix is 18, and prefix 10 exists, giving the path 5, 3.
At 2 then 1, the prefix difference identifies the path 5, 2, 1, which also sums to 8.
The right child -3 followed by 11 forms the third path, so the result is 3.

## Complexity

Let n be the number of tree nodes.
Each node is entered and left once, giving O(n) time and O(n) hash-map and explicit-stack space.
The answer counts paths but does not store those paths, so output storage is O(1).
Java stores long prefix keys to avoid overflow when several node values accumulate.

## Edge cases

A null root returns zero because no path exists.
Paths may start and end at any nodes as long as they move downward.
Negative node values and a zero target are handled by the same prefix equation.
Removing a prefix on leave is essential when two sibling subtrees share an ancestor.

## Common mistakes

- Counting only leaves excludes valid paths that end in the middle of a tree.
- Resetting the map for every node recreates the quadratic approach.
- Forgetting the initial zero prefix misses paths beginning at the root.
- Keeping a child prefix while visiting its sibling creates a path that is not downward.

## Language notes

Python stores enter and leave tuples on a list stack.
Java uses a small PathFrame class and Deque, avoiding recursion depth failures.
Both implementations visit left before right while preserving the same prefix-count invariant.
