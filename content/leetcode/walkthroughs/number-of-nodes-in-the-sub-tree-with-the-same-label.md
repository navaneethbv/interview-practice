## Intuition

Root the undirected tree at node 0 so every neighbor below a node becomes part of its subtree.
Each subtree needs only a frequency table for the 26 lowercase labels, which can be merged into its parent after the child is complete.

## Brute force

Starting a traversal from every node and counting matching labels in its subtree can revisit the same edges many times.
In a path-shaped tree this approach can take O(n^2) time.

## Approach

1. Build an adjacency list and perform an iterative breadth-first discovery from node 0 to record `parents` and a discovery `order`.
2. Process `order` backwards, so every child has already accumulated its label counts.
3. Add the current node's label, read its matching count into `result[node]`, and add all 26 counts to its parent.
4. Return the result indexed by the original node labels.

## Walkthrough

For Example 1, `n = 4`, edges `[[0,1],[0,2],[1,3]]`, and labels `"abaa"`, discovery gives parent relationships `0` as root, children 1 and 2, and child 3 below 1.
Processing node 3 first records one `a`.
Processing node 2 records one `a`.
Processing node 1 combines its own `b` with node 3's `a`, so its matching `b` count is 1, then passes both counts to node 0.
Processing node 0 adds its own `a` to the inherited counts, giving three `a` labels in the root subtree.
The result is `[3,1,1,1]`.

## Complexity

Building and traversing the tree costs O(n) time, and each node merges a fixed 26-entry table.
The adjacency list, traversal arrays, result, and count tables use O(n) space because the alphabet size is constant.

## Edge cases

A single node receives a count of one for its own label.
A chain is safe because traversal is iterative and does not depend on the language recursion limit.
Different labels remain separate counters, so only exact lowercase label matches contribute.

## Common mistakes

Do not count all descendants globally without rooting the tree, because an undirected neighbor above the node is not in its subtree.
Do not process parents before children, or child counts will be missing.
Do not allocate a variable-size map per merge when the statement fixes the alphabet to 26 letters.

## Language notes

Both references use an explicit discovery order instead of recursive DFS to support the bound of 100,000 nodes.
Java stores the fixed counters in `int[][]`, while Python uses lists of 26 integers.
