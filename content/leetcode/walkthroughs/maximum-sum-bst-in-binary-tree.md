## Intuition
Whether a subtree is a BST depends on both children's validity and their boundary values.
A postorder calculation can return validity, minimum, maximum, and sum for each subtree.
The largest valid sum is updated as those summaries are computed.

## Brute force
Checking every node as a subtree root and rescanning all descendants can take O(N squared).
Postorder summaries share each child calculation and reduce the structural work to linear time.

## Approach
1. Visit nodes in postorder using an explicit stack or breadth-first order reversed.
2. Read the stored summary for each child, using an empty BST summary for null.
3. Mark the current subtree valid when both children are valid and `leftMax < value < rightMin`.
4. Store its boundary values and sum, then update the best sum when valid.

## Walkthrough
Example 1 is root 2 with children 1 and 3.
Leaf 1 has sum 1 and boundaries both equal to 1, and leaf 3 has sum 3.
At node 2, both child summaries are valid and `1 < 2 < 3`.
The whole subtree is therefore a BST with sum `1 + 2 + 3 = 6`, which becomes the answer.

## Complexity
Each node is summarized once, so time is O(N).
The traversal order, summary map, and output state use O(N) space.
The Java summary stores sums and boundaries as `long` before the specified integer result conversion.

## Edge cases
The empty subtree has sum zero and beats all-negative valid subtrees.
Equal values fail the strict BST inequalities.
A valid child can still belong to an invalid parent if its boundary conflicts with the parent value.

## Common mistakes
Checking only immediate child values misses deeper boundary violations.
Using non-strict comparisons accepts duplicate values incorrectly.
Processing preorder prevents child summaries from being ready when the parent is evaluated.

## Language notes
Python uses an explicit postorder stack and a dictionary keyed by tree nodes, avoiding recursion depth issues.
Java builds a breadth-first node order and processes it backward with an `IdentityHashMap`.
The supplied `TreeNode` helper is reused without redefinition.
