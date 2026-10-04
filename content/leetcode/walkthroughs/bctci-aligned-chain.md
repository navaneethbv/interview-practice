## Intuition

A chain can continue through only one child, and only when the current node is aligned with its absolute tree depth.
A mismatch breaks a chain but must not prevent searching for a new chain farther below.

## Brute force

Starting a separate downward search from every node repeats subtree work and can take quadratic time.
A postorder traversal summarizes the useful continuation from each child once.

## Approach

`chain(node, depth)` returns the longest aligned downward chain beginning exactly at `node`.
First evaluate both children at `depth + 1` and keep their maximum as `below`.
If the current value differs from depth, return zero.
Otherwise its chain length is `below + 1`; update the shared `best` and return that length.
Children are evaluated before the mismatch check, so valid chains below a misaligned ancestor still contribute to the answer.
A null child contributes zero.

## Walkthrough

```text
Input: root = [7, 1, 3, 2, 8, null, 2, 4, 3, null, null, 3, 3]
Output: 3
Explanation: 1, 2, 3 down the left side is the longest aligned chain.
```

In Example 1, the root value 7 is not aligned at depth 0.
Its left child 1 is aligned at depth 1, its left child 2 at depth 2, and the descendant 3 at depth 3.
Postorder returns lengths 1, 2, and 3 upward along those nodes.
The root returns zero because it cannot extend their chain, but `best` retains 3.

## Complexity

Every node is visited once, giving O(n) time.
The recursion stack uses O(h) space for height h.
A balanced tree has logarithmic height, while a long chain uses linear stack space.

## Edge cases

An empty tree returns zero.
An aligned singleton root returns one.
A misaligned parent can have an aligned child because alignment uses original depth rather than chain-relative depth.

## Common mistakes

Do not reset depth when a new candidate chain starts.
Adding left and right lengths would describe a path with a turn, not a descendant chain.

## Language notes

Python updates `best` through `nonlocal`.
Java stores the answer in a field and uses the same recursive return contract.
