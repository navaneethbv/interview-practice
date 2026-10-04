## Intuition

Inorder traversal exposes BST values in sorted order, including repeated values.
Counting visited nodes therefore identifies the requested zero-based position without sorting or storing every value.

## Brute force

Collecting all values and sorting them costs O(n log n) time and O(n) storage.
Even collecting the already-sorted inorder list visits more nodes than necessary when k is small.

## Approach

Maintain an explicit stack and descend left from the current `node`.
After reaching null, pop the smallest unvisited node.
If k is zero, return its value.
Otherwise decrement k and continue with the popped node's right subtree.
The stack remembers nodes deferred while their smaller left-subtree values are visited.
Each pop consumes exactly one sorted occurrence, so duplicate values count as separate ranks.
The input guarantee that k is valid ensures the traversal finds an answer before the stack is exhausted.

## Walkthrough

```text
Input: root = [5, 2, 9, null, 4, 9, 11], k = 4
Output: 9
```

Example 1 has inorder values `[2, 4, 5, 9, 9, 11]`.
Starting with k equal to 4, visits to 2, 4, 5, and the first 9 reduce k successively to 3, 2, 1, and 0.
The next popped value is the second 9.
It occupies index 4 in the sorted sequence and is returned.

## Complexity

Time is O(h + k + 1), bounded by O(n), because the traversal explores the initial left path and enough nodes to reach the requested rank.
The stack uses O(h) extra space.

## Edge cases

For k equal to zero, return the minimum value.
For k equal to n - 1, return the maximum.
Identical values at different nodes still occupy different ranks.

## Common mistakes

This problem counts from zero, unlike many similarly named exercises.
Do not deduplicate values before counting positions.

## Language notes

Python checks k before decrementing.
Java's `k-- == 0` performs the equivalent comparison followed by decrement; the decrement is irrelevant when returning immediately.
