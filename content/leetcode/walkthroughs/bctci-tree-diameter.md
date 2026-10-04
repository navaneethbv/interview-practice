## Intuition

For every node, the longest path that passes through it uses the deepest path below its left child and the deepest path below its right child.
Those two heights also let the parent compute its own height.
Processing nodes from leaves toward the root makes both values available without recursion.

## Approach

Build a breadth-first `order` beginning with node zero by following the child indices in `children`.
Process that order in reverse so children are handled before parents.
For each node, read the stored heights of its left and right children, treating a missing child as height zero.
Update `best` with their sum, then store one plus the larger child height as this node's height.

## Walkthrough

For Example 1, the order is root `a`, then `b` and `c`.
Processing `b` and `c` first gives both leaves height one and a path through either leaf of length zero.
At `a`, the two child heights are one and one, so the path through the root has two edges and becomes `best`.
The method returns two, which counts edges rather than nodes on the path.

## Complexity

Each node and child link is visited a constant number of times, so the running time is `O(n)`.
The breadth-first order and height array use `O(n)` auxiliary space.
The algorithm keeps labels only to follow the input size, because label values do not affect distance.

## Edge cases

An empty `labels` array returns zero before indexing node zero.
A single node has two missing children, height one, and diameter zero.
A one-sided chain accumulates its edge count through successive parent heights even though one child is absent at every step.

## Common mistakes

Returning `a + b + 1` counts nodes when the contract asks for edges.
Processing the input order without proving it is postorder can read a child height before it is computed.
Using label values as indices is unsafe because labels are arbitrary unique strings.

## Language notes

Python extends a list while iterating over it to produce the breadth-first order.
Java uses an explicit index over an `ArrayList` for the same traversal.
Both references treat `-1` as missing and use the parallel `children` arrays rather than constructing another tree object.
