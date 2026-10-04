## Intuition

An inorder traversal of this binary search tree produces values in nondecreasing order, including repeated values.
The task uses zero-based rank, so the first visited node is rank zero and duplicate nodes each consume a position.

## Brute force

Traverse all nodes, collect their values, and sort the list before indexing it.
That takes O(n log n) time and O(n) memory, even though the tree already provides sorted traversal order.

## Approach

Keep an explicit `stack` and a moving `node` pointer.
Push nodes while following left children to reach the next smallest unvisited node.
Pop that node; if `k` is zero, return its value.
Otherwise decrement `k`, move to its right child, and repeat.
The stack preserves ancestors whose own visit is waiting for their left subtree to finish.
Stopping as soon as the requested node is popped avoids processing larger values unnecessarily.

## Walkthrough

Example 1 has inorder values `[2, 4, 5, 9, 9, 11]` and `k = 4`.
Popping 2 changes the remaining rank from four to three.
After 4 and 5 it becomes one.
The first 9 consumes that position, leaving zero.
The next 9 is returned, so the answer is 9 even though its value duplicates the previous visit.

## Complexity

Time is O(h + k) for initial height h and requested rank k, bounded by O(n).
The explicit stack uses O(h) auxiliary space.
A skewed tree can make h equal n.

## Edge cases

A singleton tree with rank zero returns its root.
The largest valid rank requires visiting every node.
Equal values may occur on either side under this problem's inclusive BST definition.

## Common mistakes

Do not use the one-based rank convention from other versions of kth-smallest problems.
Do not deduplicate values during traversal.

## Language notes

Python uses a list as a stack.
Java uses `ArrayDeque` and tests `k-- == 0`, equivalent to checking first and decrementing only after an unsuccessful rank comparison.
