## Intuition
Each node reports whether it is uncovered, covered without a camera, or contains a camera.
A postorder traversal lets the parent install a camera whenever a child is uncovered.

## Brute force
Trying all camera subsets is exponential.
Three states summarize every subtree's only relevant coverage information.

## Approach
1. Process nodes after both children using an explicit postorder stack.
2. Treat missing children as already covered.
3. Install a camera when either child is uncovered.
4. Report covered when either child has a camera, otherwise report uncovered.
5. Add a camera if the root finishes uncovered.

## Walkthrough
For Example 1, the left child has two leaves, so it receives one camera and reports camera state.
That camera covers its children, itself, and the root.
The result is 1.
A one-node tree remains uncovered after processing and receives one camera at the root.

## Complexity
Each node is pushed and processed a constant number of times, so time is O(n).
The explicit stack and state map use O(n) space.

## Edge cases
Missing children are covered states.
A root leaf needs a camera even though it has no uncovered child.

The state map records each processed node once, so even a chain of 1000 nodes avoids Python recursion-limit failures.

## Common mistakes
Process children before parents.
Do not treat null children as uncovered.
Remember the root post-check.

## Language notes
Python uses an iterative postorder traversal to avoid recursion depth failures on skewed trees.
Java uses the equivalent three-state recursive helper under its tree bounds.
