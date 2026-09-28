## Intuition

The BST ordering is optional for this task because a set can detect whether the complement of the current value was already visited.
Each node is processed once, and checking before insertion prevents using one node twice.

## Brute force

Comparing every pair of nodes takes `O(n^2)` time.
The traversal plus set reduces the search to linear expected time.

## Approach

1. Push the root onto `stack` and keep an empty `seen` set.
2. Pop each node and compute `k - node.val`.
3. Return true if that complement is in `seen`; otherwise add the current value.
4. Push existing children and return false if traversal finishes.

## Walkthrough

For Example 1, the stack visits 5, then its right child 6, then 7, then 3, with target 9.
When it reaches 3, the complement is 6, which is already in `seen`.
The method therefore returns `true` before it needs to inspect the remaining nodes.

## Complexity

Every node is pushed and popped once, so time is `O(n)` expected and the set plus stack use `O(n)` space.

## Edge cases

A single node cannot pair with itself because the complement check occurs before insertion.
Duplicate values in separate nodes can form a pair when their two occurrences are visited.

## Common mistakes

- Adding the current value before checking its complement allows self-pairing.
- Assuming the first found pair must be adjacent in sorted order is unnecessary.
- Forgetting one child loses valid pairs in the other subtree.

## Language notes

Python uses a list stack, while Java uses `ArrayDeque<TreeNode>` and the harness-provided `TreeNode` fields.
An iterative traversal avoids recursion depth issues for a skewed valid BST.
