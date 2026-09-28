## Intuition

At each node, record the longest increasing and decreasing downward runs.
A valid path can join one decreasing run through the node to one increasing run, so their lengths minus one form a candidate.

## Brute force

Starting a path search at every node repeats descendants.
Postorder dynamic programming computes each child run once.

## Approach

1. Traverse nodes in postorder using an explicit stack or order list.
2. For each child, extend increasing or decreasing length when its value differs by one.
3. Store the two runs for the node.
4. Update the answer with `increasing + decreasing - 1`.

## Walkthrough

For Example 1, root 2 has left child 1 and right child 3.
The decreasing run from 2 through 1 has length 2, and the increasing run through 3 has length 2.
Joining them at 2 gives `2 + 2 - 1 = 3`, the path 1,2,3.

## Complexity

Each node and edge is processed once, giving O(n) time and O(n) state space.
The iterative traversals use O(n) order, stack, or map storage and avoid recursion depth failures.

## Edge cases

A single node returns one.
Equal values extend neither direction.
Signed extremes are compared with widened arithmetic in Java.

## Common mistakes

Join only one increasing and one decreasing run through a node.
Subtract one because the node is shared.
Compute children before their parent.

## Language notes

Python stores `(increasing,decreasing)` pairs keyed by node identity.
Java uses an `IdentityHashMap` because nodes are object identities.
