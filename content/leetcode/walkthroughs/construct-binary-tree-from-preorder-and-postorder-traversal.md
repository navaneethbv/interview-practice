## Intuition
Preorder reveals the next node to attach, while postorder tells when the current subtree is complete.
A stack of open ancestors lets the iterative algorithm attach each new node without recursion.

## Brute force
A recursive range solution tries a split for every subtree and may scan postorder ranges repeatedly.
That costs O(n^2) time in an unoptimized implementation and O(h) recursion depth.
The stack consumes each traversal entry once.

## Approach
1. Create the preorder root and push it.
2. Before attaching the next preorder value, pop completed nodes whose values match postorder.
3. Attach the new node as the open parent's left child when empty, otherwise its right child.
4. Push the new node and return the root.

## Walkthrough
Example 1 has preorder `[1,2,3]` and postorder `[2,3,1]`.
The root 1 is pushed and postorder index is 0.
Value 2 is attached as root 1's left child and pushed.
Before processing value 3, the stack top 2 matches postorder value 2, so 2 is popped.
The stack top is 1, whose left child is occupied, so 3 is attached as its right child.
The resulting tree has root 1 with children 2 and 3, accepted by the validator.

## Complexity
Each node is pushed and popped at most once, so time is O(n).
The stack uses O(h) space, where h is the constructed tree height.
The returned tree stores O(n) nodes, and the Python reference indexes preorder without making a slice copy.

## Edge cases
A one-node input returns that root.
A chain may place every new node on one side because several shapes are valid.
Distinct values and consistent traversals are guaranteed locally.

## Common mistakes
Popping before checking the postorder index can close the wrong ancestor.
Always attaching left or always attaching right fails trees with both children.
Assuming a unique tree ignores the validator's allowance for multiple shapes.

## Language notes
Python uses a list as an explicit stack.
Java uses `ArrayDeque<TreeNode>` and the provided `TreeNode` helper without recursion.
