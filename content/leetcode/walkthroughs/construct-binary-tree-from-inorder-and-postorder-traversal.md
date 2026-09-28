## Intuition
The last postorder value is the current subtree root.
In reverse inorder, values to the right of that root belong to its right subtree before the left subtree begins.
A stack tracks ancestors whose left child has not yet been attached.

## Brute force
Recursively locating each root in the inorder array can scan a range at every level and reach O(N squared).
An index map can improve that method, while the reverse traversal and stack avoid recursion and auxiliary search maps entirely.

## Approach
1. Create the root from the final postorder value and push it.
2. Process remaining postorder values from right to left.
3. If the stack top is not the current inorder value, attach the new node as its right child.
4. Otherwise pop completed ancestors while they match inorder, then attach the new node as the last popped node's left child.
5. Push each new node and return the root.

## Walkthrough
Example 1 has inorder `[2, 1, 3]` and postorder `[2, 3, 1]`.
The final postorder value 1 becomes the root.
Processing 3 sees that the stack top 1 is not the current inorder value 3, so 3 becomes the right child.
Processing 2 then pops 3 and 1 while matching the reverse inorder boundary, and attaches 2 as the left child of 1.
The resulting tree serializes as `[1, 2, 3]`.

## Complexity
Each traversal value is pushed and popped at most once, so time is O(N).
The stack uses O(N) auxiliary space, and the constructed tree is the required output.

## Edge cases
A one-node traversal creates a single root.
A completely skewed tree is handled iteratively without recursion depth failure.
Distinct values guarantee that each inorder match identifies one node.

## Common mistakes
Processing postorder left to right loses the root-first property.
Attaching every new node to the right ignores completed right subtrees.
Using a non-strict traversal comparison breaks the distinct-value contract.

## Language notes
Python uses a list as the stack and the provided `TreeNode` constructor.
Java uses `ArrayDeque<TreeNode>` and the provided `TreeNode` helper.
Both references avoid recursive calls for the 3000-node bound.
