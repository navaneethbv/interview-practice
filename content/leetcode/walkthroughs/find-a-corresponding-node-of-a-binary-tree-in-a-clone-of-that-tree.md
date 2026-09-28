## Intuition
The original tree and its clone have identical structure.
Traversing corresponding positions together lets us identify the target in the original tree and immediately return the node at the same position in the clone.
Node identity, rather than its stored value, is the relationship that matters.

## Brute force
First search the original tree and record the left/right path to the target.
Then follow that path from the cloned root.
This still takes O(n) worst-case time and O(h) path storage for tree height h, but requires a separate path representation and second traversal.
Paired traversal carries the correspondence directly.

## Approach
1. Put the pair of original and cloned roots onto an explicit stack.
2. Pop a corresponding pair and compare its original node with the target by identity.
3. If they are the same node, return the cloned member of that pair.
4. Otherwise push corresponding left children, then corresponding right children, when present.
5. Continue until the promised target is found.

The stack invariant is that both members of every pair occupy the same structural position.
It holds for the roots and remains true when matching children are pushed.
Consequently, the cloned partner of the target is exactly the required answer.

## Walkthrough
Example 1 has tree `[7,4,3,null,null,6,19]` and targets the original node containing 3.
The first popped pair contains the two roots with value 7.
It is not the target, so the algorithm pushes the corresponding 4 pair followed by the 3 pair.
The stack next pops the 3 pair.
Its original member is the target, so the method returns the cloned node containing 3.
It returns neither the original target nor a newly allocated node.

## Complexity
At most n corresponding pairs are visited, giving O(n) worst-case time.
The depth-first stack holds O(h) pending pairs, bounded by O(n) in the worst case.
There is no recursion, so a deep tree does not consume the language call stack.

## Edge cases
If the target is the root, the first iteration returns immediately.
A single-node tree follows the same rule.
Identity comparisons remain correct even if node values are duplicated.
The contract guarantees that the target belongs to the original tree.

## Common mistakes
- Returning the original node violates the clone requirement.
- Comparing values alone depends on uniqueness unnecessarily.
- Traversing the two trees in different orders breaks positional correspondence.

## Language notes
Python compares nodes with `is` and stores tuples in a list stack.
Java compares references with `==` and stores node pairs in an `ArrayDeque`.
Both use the supplied `TreeNode` type and leave both trees unchanged.
