## Intuition

Root the undirected version of the tree at node zero.
For each original directed edge, store cost zero when it points away from the root and cost one when it must be reversed for the root orientation.
Rerooting across one edge changes the answer by exactly one minus twice that edge cost.

## Brute force

Running a fresh traversal from every possible root costs O(n^2) on a path.
One initial traversal plus reroot propagation reuses neighboring answers.

## Approach

1. Add each directed edge with cost 0 in its given direction and cost 1 in reverse adjacency.
2. Traverse from zero to record parents, order, and the reversals needed for root zero.
3. Set `answers[0]` to that total.
4. For each child, derive its answer as `parent_answer + 1 - 2 * edge_cost`.

## Walkthrough

For Example 1, edges are `0->1` and `2->1`.
Rooting at zero requires reversing `2->1` so node 2 can be reached from 1, giving root cost 1.
Moving the root from 0 to 1 makes `0->1` point toward the new root, so it now needs one reversal, while `2->1` also needs reversal away from 1, giving cost 2.
Moving from 1 to 2 crosses the edge represented with cost 1, so the reroot formula lowers that answer to 1 and produces `[1,2,1]`.

## Complexity

The adjacency list, initial traversal, and reroot pass each cost O(n), so total time is O(n).
Python stores O(n) lists and tuples; Java stores O(n) adjacency entries plus parent, cost, order, and answer arrays.

## Edge cases

The input is a tree, so every node receives one parent in the traversal.
An edge already oriented away from the root has cost zero.
Rerooting can lower an answer by one or raise it by one, never by an arbitrary amount.

## Common mistakes

Reverse only the edge crossed during rerooting.
Do not count both directed adjacency records as real edges.
Keep the original edge direction when assigning the two costs.

## Language notes

Python's `order` list grows while iterating over it as a queue.
Java uses a fixed integer order array and an explicit size index.
