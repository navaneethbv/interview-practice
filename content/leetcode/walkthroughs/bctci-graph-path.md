## Intuition

A search tree records one valid route from the source to every discovered vertex.
Saving each vertex's first parent allows a simple source-to-target path to be reconstructed without storing whole paths in the queue.

## Brute force

Enumerating candidate walks can revisit cycles indefinitely or create exponentially many alternatives.
A visited structure prevents repeated discovery and makes one graph traversal sufficient.

## Approach

Use `parent` both as a visited marker and as a predecessor record.
Mark node1 with a special no-parent value and enqueue it.
During BFS, assign each unseen neighbor's parent before enqueueing it.
If node2 is never discovered, return an empty list.
Otherwise follow parent links from node2 back to node1 and reverse the sequence.
Each parent was discovered earlier, so the chain cannot cycle or repeat a node.
BFS happens to produce a shortest path, although the contract accepts any simple path.

## Walkthrough

```text
Input: graph = [[1], [0, 2, 5, 4], [1, 4, 5], [], [5, 2, 1], [1, 2, 4]], node1 = 0, node2 = 4
Output: [0, 1, 4]
Explanation: [0, 1, 2, 5, 4] is also accepted.
```

Example 1 discovers node 1 from node 0.
When exploring node 1, it discovers node 4 directly and records parent[4] = 1.
Following parents gives 4, 1, 0.
Reversal returns `[0, 1, 4]`.
The other edges and cycles do not alter already-recorded parents.

## Complexity

Worst-case time is O(V + E), plus O(V) reconstruction time.
Parent state, queue, and returned path use O(V) extra space.

## Edge cases

A target in another connected component returns an empty list.
A direct source-target edge yields a two-node path.
Cycles are harmless because discovery is recorded immediately.

## Common mistakes

Do not overwrite parents for already discovered vertices.
Returning the backward predecessor sequence reverses the required source-to-target order.

## Language notes

Python uses dictionary membership and None for the source's parent.
Java uses -2 for undiscovered and -1 for the source; those sentinel meanings must remain distinct during reconstruction.
