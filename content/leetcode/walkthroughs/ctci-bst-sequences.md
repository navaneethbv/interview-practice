## Intuition

The root must be inserted first to create the supplied BST.
After that, left-subtree insertions and right-subtree insertions may interleave freely, provided each subtree's own insertion order remains valid.
This turns the problem into recursively generating subtree sequences and weaving them together.

## Brute force

Try all n factorial permutations, build a BST from each, and retain those matching the target.
Most permutations fail, and constructing each candidate tree repeats work that the target's structure already explains.

## Approach

`allSequences` obtains every valid left and right sequence recursively.
For each pair, begin `prefix` with `root.val` and call `_weave`.
At each weaving step, choose either the next unused left value or the next unused right value.
Never rearrange values within either input sequence.
When one sequence is exhausted, append the remainder of the other and store a fresh result.
Backtracking restores the prefix before the next choice.

## Walkthrough

Example 1 is the tree `[2, 1, 3]`.
The left subtree contributes `[1]` and the right contributes `[3]`.
The fixed prefix is `[2]`.
Choosing the left value first produces `[2, 1, 3]`.
Choosing the right value first produces `[2, 3, 1]`.
Both create the same BST because 1 goes left of 2 and 3 goes right regardless of which arrives first.

## Complexity

The output can be factorial in size.
For S complete sequences of length n, writing the output alone costs O(Sn) time and space; recursive intermediate sequences also require storage.
A conservative bound for these small inputs is O(n times n factorial) time and space.

## Edge cases

An empty subtree returns `[[]]`, supplying one empty sequence for weaving.
A chain-shaped tree has only one valid insertion order.

## Common mistakes

Returning no sequences for an empty subtree would eliminate valid combinations.
Storing the mutable prefix itself would cause later backtracking to corrupt earlier results.

## Language notes

Python concatenation creates result copies.
Java explicitly copies the prefix and appends remaining sublists before saving the sequence.
