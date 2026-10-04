## Intuition

A node must satisfy ordering constraints from every ancestor, not just from its immediate parent.
Carry the allowed value interval down the tree so those inherited constraints remain visible.
This problem permits equality at either boundary.

## Brute force

For each node, rescanning every value in both subtrees would verify the rules but can take quadratic time.
Comparing only direct children is faster but fails to detect deeper violations of ancestor bounds.

## Approach

Start with an unbounded interval.
For a node with allowed range `[low, high]`, reject its value if it lies outside that inclusive range.
Its left child inherits `[low, node.val]`, and its right child inherits `[node.val, high]`.
Null nodes are valid and need no further processing.
If every visited node respects its accumulated range, every left-subtree value is at most its ancestors where required and every right-subtree value is at least them.
This is exactly the stated BST definition.

## Walkthrough

```text
Input: root = [5, 2, 9, null, 4, 9, 11, null, null, null, 9]
Output: true
```

Example 1 starts with root 5.
The left subtree receives an upper bound of 5, accepting values 2 and 4.
The right subtree receives a lower bound of 5 and accepts 9 and 11.
Additional 9 values remain legal because bounds are inclusive, including a 9 placed under another 9.
No node violates an inherited bound, so validation returns true.

## Complexity

Time is O(n), since each node is checked once.
The depth-first traversal uses O(h) extra space for height h, through an explicit stack in Python and recursion in Java.

## Edge cases

An empty tree is valid.
Equal parent and child values are valid here.
A grandchild can violate an ancestor's bound even when it compares correctly with its parent.

## Common mistakes

Using strict inequalities solves a different BST definition.
Replacing inherited bounds with only the parent value loses constraints from earlier ancestors.

## Language notes

Python uses infinite initial bounds.
Java uses long extrema, which safely contain every int node value without arithmetic on the boundaries.
