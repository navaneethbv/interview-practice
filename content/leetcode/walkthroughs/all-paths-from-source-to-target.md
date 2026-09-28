## Intuition

The graph is directed and acyclic, so every route from node zero eventually reaches the last node.
Depth-first search maintains one mutable current path and copies it only when the destination is reached.

## Brute force

Enumerating every possible vertex sequence without using the graph structure explores invalid continuations.
DFS branches exactly along outgoing edges and is output-sensitive.

## Approach

1. Start the path with node 0.
2. If its last node is the target, copy the path into the result.
3. Otherwise append each child, recurse, and pop it to restore the parent path.
4. Return all copied paths.

## Walkthrough

For Example 1, node 0 has children 1 and 2.
Following 1 then 3 records `[0,1,3]` and backtracks to 0.
Following 2 then 3 records `[0,2,3]`.
The result contains those two paths, and the temporary path returns to `[0]` after each branch.

## Complexity

If P paths are returned and V is the longest path length, copying output costs O(PV), with additional traversal work proportional to explored edges and prefixes.
The recursion stack and current path use O(V) space, while the returned paths require O(PV) space.
Python copies `path[:]`; Java copies the `ArrayList` at each destination.

## Edge cases

A graph with only nodes zero and one returns the direct path.
An empty outgoing list before the target contributes no path.
The local contract's DAG guarantee prevents cycles from causing infinite recursion.

## Common mistakes

Copy a path before backtracking instead of storing the mutable list itself.
Pop exactly the child just explored.
Include both source and target in every returned path.

## Language notes

Python's `_visit` keeps the helper method explicit and reuses one list.
Java passes the same `List<Integer>` through recursive calls and copies at leaves.
