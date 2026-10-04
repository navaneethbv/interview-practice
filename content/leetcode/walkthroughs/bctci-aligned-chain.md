## Intuition

A chain must follow one downward branch, so its length at an aligned node is one plus the better child chain.
A misaligned node breaks that chain without invalidating answers entirely inside its descendants.

## Brute force

Starting a separate downward search from every node repeats work and can take quadratic time.
A postorder traversal computes each child's usable chain once, while a separate `best` records chains that start anywhere.

## Approach

The helper `chain(node, depth)` first recursively evaluates both children at `depth + 1`.
Set `below` to the larger child result.
Return zero for a mismatched value; otherwise update `best` with `below + 1` and return that length.

## Walkthrough

Example 1 has root value 7 at depth zero, so the root cannot extend a chain.
In its left subtree, value 1 at depth 1 connects to value 2 at depth 2 and value 3 at depth 3.
Those calls build lengths 1, 2, and 3 upward, producing answer 3.

## Complexity

For n nodes and height h, each node receives one call and performs constant work, giving O(n) time.
The recursion stack occupies O(h) auxiliary space.
No extra tree or collection of candidate chains is built.

## Edge cases

An empty tree returns zero.
A lone root with value zero yields one; any other root value yields zero.
A valid longest chain may start below several misaligned ancestors, so traversal must still explore every subtree.

## Common mistakes

Do not return immediately on a value mismatch before visiting the children.
Do not add both child lengths, because that would create a branching path rather than a descendant chain.
Depth always refers to the original root.

## Language notes

Python uses `nonlocal best` inside the nested helper.
Java keeps `best` in an instance field and passes depth explicitly.
The harness supplies `TreeNode.val`, `left`, and `right`; array positions in the serialized fixture are not node depths.
