## Intuition

The root of a binary search tree must be inserted first.
After that, the left and right subtree insertion sequences can be interleaved in any way that preserves the internal order of each subtree.
This is exactly a recursive sequence-weaving problem.

## Brute force

Generating every permutation of all node values and rebuilding a tree for each one costs factorial time.
It also ignores the ordering constraints already encoded by each subtree.

## Approach

For an empty root, return one sequence containing no values.
Recursively collect every valid sequence for the left and right children.
For each pair of child sequences, start a prefix with root.val.
Weave the two sequences by choosing the next value from either side while preserving each side's original order.
When one side is exhausted, append the untouched suffixes and record the completed sequence.

## Walkthrough

In Example 1, root 2 is fixed first.
The left sequence is [1] and the right sequence is [3].
Choosing 1 before 3 produces [2, 1, 3], while choosing 3 before 1 produces [2, 3, 1].
Both preserve the child sequence order and therefore can recreate the same tree.

## Complexity

The work is output-sensitive because every valid sequence must be materialized.
If R sequences are returned for a tree of n nodes, the output itself costs O(Rn) space and the weaving work is O(Rn) apart from recursive subproblems.
The recursion and active prefix use O(n) additional space.

## Edge cases

An empty tree returns one empty sequence rather than no sequences.
A one-node tree returns one sequence containing the root.
A tree with only one child has no meaningful interleaving choice.
The unordered result comparison allows any order among the returned sequences.

## Common mistakes

Omitting the root from the prefix creates sequences that cannot build the tree.
Sorting or freely permuting child sequences changes the insertion order constraints.
Appending a shared mutable prefix as a result would let later recursion corrupt earlier answers.

## Language notes

Python reuses prefix during backtracking and copies it only when a branch is complete.
Java creates a fresh ArrayList at each completed weave and appends the remaining suffixes.
Both references return the empty sequence for a null root as required by the spec.
