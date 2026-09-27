## Intuition

A matching subtree must begin at some node of the larger tree.
At each candidate root, compare the complete descendant structure with `subRoot`, including missing children.
Matching only a sequence of values or a partial branch cannot establish subtree equality.

## Brute force

The supplied reference directly checks candidate roots with structural comparison, taking O(nm) in the worst case for tree sizes n and m.
A serialization-and-linear-pattern-matching method can improve that asymptotic bound, but requires careful null tokens and value boundaries.
Here the explicit comparison keeps the structural contract straightforward under the stated size limits.

## Approach

1. Use an explicit DFS `stack` to visit candidate roots in the larger tree.
2. For each candidate, call `same` (`_same` in Python) against `subRoot`.
3. The helper traverses pairs of corresponding nodes, rejecting unequal values or one-sided nulls.
4. If every pair matches, return true immediately.
5. Otherwise add the candidate's nonnull children for later consideration.
6. Return false if every candidate fails.

A candidate comparison includes all descendants on both sides.
Thus an extra child in the larger tree correctly disqualifies a candidate even when every node in `subRoot` found a matching value.

## Walkthrough

Example 1 uses `root = [7, 3, 9, 1, 5]` and `subRoot = [3, 1, 5]`.

| Candidate root | Comparison result |
| --- | --- |
| 7 | Root values 7 and 3 differ |
| 9 | Root values 9 and 3 differ |
| 3 | Root values match; children 1 and 5 and all null descendants match |

The right child is considered before the left because of stack insertion order.
The complete match at node 3 returns true.

## Complexity

- Time: O(nm) worst case, because each of n candidates can require an m-node comparison.
- Space: O(h₁ + h₂) pending traversal state, bounded by O(n + m), for the candidate and comparison stacks.

## Edge cases

The whole larger tree can be the matching subtree.
Repeated root values may require several candidate comparisons.
Extra descendants cause a mismatch even if the visible prefix agrees.
Both trees are nonempty under the statement's contract.

## Common mistakes

- Stopping comparison when only the smaller side is null accepts extra descendants.
- Matching values without matching left/right positions accepts the wrong shape.
- Returning false after the first failed candidate skips possible matches lower down.

## Language notes

Both references use iterative pair comparisons to avoid recursion-depth limits on long chains.
Python stores pairs as tuples; Java wraps them in arrays so the deque can carry null components safely.
Neither implementation mutates either input tree.
