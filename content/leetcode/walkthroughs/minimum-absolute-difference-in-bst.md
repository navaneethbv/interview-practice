## Intuition
An inorder traversal of a binary search tree visits values in sorted order.
The smallest difference between any two sorted values must occur between adjacent visits, so there is no need to compare every pair.

## Brute force
Collecting all values and checking every pair costs O(n^2) time.
Sorting the values first is correct, but an inorder traversal already provides the sorted order.

## Approach

1. Perform iterative inorder traversal with an explicit stack.
2. Compare each visited value with the previous inorder value.
3. Keep the smallest adjacent difference.
4. Continue through each node's right subtree.
5. Return the minimum recorded difference.

## Walkthrough

For Example 1, `root = [4,2,6,1,3]`, inorder traversal yields `1,2,3,4,6`.
The adjacent differences are 1, 1, 1, and 2.
The minimum is therefore 1.
For `[10,4,20]`, the sorted order is `4,10,20`, giving differences 6 and 10, so the answer is 6.

## Complexity
Each node is pushed and popped once, so time is O(n).
The explicit stack uses O(h) space, where h is tree height.
No value array is required.

## Edge cases
The contract supplies at least two nodes, so a pair always exists.
A skewed tree uses O(n) stack space.
A balanced tree uses O(log n) stack space.

## Common mistakes
Comparing only parent and child values misses closer values in different subtrees.
Do not reset the previous value when returning from a subtree.
Use the first visited node only to initialize the previous value.

## Language notes
Python stores the previous integer as `None` initially.
Java uses `Integer` to represent the uninitialized previous value and `ArrayDeque` for the stack.
