## Intuition

An inorder traversal of a binary search tree is sorted.
Putting the middle list value at the root and recursing on both halves creates a balanced tree with that inorder sequence.

## Brute force

Finding a list midpoint by walking from the head for every recursive interval can take O(n log n) time.
Copying values once gives direct random access to each interval midpoint.

## Approach

1. Copy linked-list values into an array.
2. Choose the midpoint of each half-open array interval.
3. Build the midpoint node and recursively build left and right intervals.

## Walkthrough

Example 1:

For [-2,0,3], the midpoint value 0 becomes the root.
The left interval creates -2 and the right interval creates 3.
The level-order result is [0,-2,3].

## Complexity

Copying values and creating nodes takes O(n) time.
The values array uses O(n) space, and recursion uses O(log n) stack for the balanced tree.
The output tree itself contains n nodes.

## Edge cases

An empty list returns null.
A one-value list becomes a leaf.
Half-open intervals make empty child ranges stop immediately.

## Common mistakes

Do not choose a midpoint from the linked-list node count incorrectly.
Keep values in sorted order so the BST invariant holds.
Build both recursive halves around the midpoint.

## Language notes

Python stores values in a list and uses a nested helper.
Java stores values in ArrayList and builds the supplied TreeNode type.
The recursive midpoint choice keeps the two subtree sizes as even as possible.
Inorder traversal of the result reproduces the original sorted list.
