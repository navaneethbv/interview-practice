## Intuition

Discovering a vertex through an edge supplies a predecessor that can later explain how it was reached.
A breadth-first search with one parent per vertex builds a tree of simple paths from `node1`.
Following those parents backward reconstructs a valid answer.

## Brute force

Enumerating all simple paths can explore exponentially many alternatives.
The task only needs one path, so revisiting a vertex through different routes adds no useful reachability information.

## Approach

Mark `node1` as visited by giving it a special parent and enqueue it.
For every dequeued node, inspect its neighbors.
For each undiscovered neighbor, save the current node as its parent and enqueue it.
Stop once the destination has been reached, or when the queue empties.
If `node2` has no parent entry, return an empty list.
Otherwise follow parents from `node2` to the source sentinel and reverse the collected nodes.
Parents always point to earlier discoveries, so the reconstructed path cannot contain a cycle.

## Walkthrough

Example 1 begins at node 0, whose only neighbor is 1.
Set `parent[1] = 0`.
Processing node 1 discovers nodes 2, 5, and 4, including `parent[4] = 1`.
Reconstruction from node 4 visits 4, then 1, then 0.
Reversing produces `[0, 1, 4]`.
The isolated node 3 has no effect on this path.

## Complexity

Worst-case time is O(V + E), and parent storage plus the queue require O(V) auxiliary space.
The reconstructed path contains at most V vertices.

## Edge cases

Disconnected destinations return an empty list.
Cycles and multiple possible routes are handled by recording each vertex only on first discovery.

## Common mistakes

Mark vertices when enqueueing, not when dequeuing.
Reverse the backward parent chain before returning it.

## Language notes

Python uses a dictionary with `None` as the source's parent.
Java uses -2 for undiscovered and -1 for the source terminator.
The validator accepts any valid simple path, even though these references find shortest paths.
