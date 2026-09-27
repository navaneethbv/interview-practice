## Intuition
Preorder visits a node before its descendants, and a BST sends smaller values left and larger values right.
A stack of ancestors identifies the deepest node that can accept the next value as a right child.

## Brute force
Inserting each preorder value into a normal BST is correct but can take O(N^2) time on a sorted preorder.
The stack also has O(N) worst-case time and avoids searching from the root for every insertion.

## Approach
1. Create the first value as the root and push it onto the ancestor stack.
2. For each next value smaller than the stack top, attach it as that node's left child.
3. For a larger value, pop ancestors while their values are smaller and attach the new node to the last popped ancestor's right.
4. Push the new node because later values may become its descendants.

## Walkthrough
Example 1 is `[6,2,1,4,9,8,10]`.
6 becomes the root, 2 becomes its left child, and 1 becomes the left child of 2.
For 4, pop both 1 and 2, stopping below ancestor 6; the last popped node is 2, so 4 becomes its right child.
For 9, pop 4 and 6, making 9 the root's right child; 8 and 10 then become its left and right children.
The resulting level order is `[6,2,9,1,4,8,10]`.

## Complexity
Each node is pushed once and popped at most once, so time is O(N).
The ancestor stack uses O(H) space and the output tree uses O(N) space.
Python also copies the remaining preorder values with `preorder[1:]`, using O(N) temporary space; Java indexes the original array.

## Edge cases
A two-value preorder `[4,2]` attaches the second value to the left.
Increasing preorder values repeatedly pop the stack and create a right chain.
Decreasing preorder values never pop and create a left chain.

## Common mistakes
Attaching every larger value directly to the root ignores the nearest valid ancestor.
Failing to push a new node loses it as a future parent.
Popping values that are larger than the new value would violate the BST boundary.

## Language notes
Python stores `TreeNode` objects in a list and mutates child fields.
Java uses an `ArrayDeque<TreeNode>` and the provided `TreeNode` helper type.
