## Intuition

A breadth-first traversal naturally groups nodes by level.
Keeping the first level that reaches the greatest sum automatically implements the required smallest-level tie break.

## Brute force

Running a separate traversal for each depth revisits ancestors and can take O(n²) time on a skewed tree.
A single queue processes each node once.

## Approach

1. Put the root in a queue and start `depth` at zero.
2. Remove exactly the current queue size of nodes and sum their values.
3. Enqueue their non-null children for the next level.
4. Update the answer only when the current sum is strictly greater than the best.

## Walkthrough

This is Example 1 from the local statement.
The root `[1]` gives level 1 sum 1.
The queue then contains 7 and 0, whose level 2 sum is 7, so the answer becomes 2.
Their children 7 and -8 form level 3 with sum -1, which does not improve the best.
The method returns level 2.

## Complexity

Every node enters and leaves the queue once, so time is O(n).
The queue holds at most one tree level, using O(w) space where w is maximum width.

## Edge cases

The tree has at least one node, so level 1 is always initialized.
Negative sums are valid, making `Long.MIN_VALUE` or negative infinity necessary as the initial best.
Equal maximum sums keep the earlier level because updates are strict.

## Common mistakes

Capture the queue size before processing a level.
Do not update on equality when the earliest level is required.
Use a wide sum when many node values are added.

## Language notes

Python builds the next level as a list, while Java uses an `ArrayDeque<TreeNode>`.
Both references track depth starting at 1 for the root.
