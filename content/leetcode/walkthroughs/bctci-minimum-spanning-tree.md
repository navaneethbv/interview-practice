## Intuition

A minimum spanning tree can be built by repeatedly choosing the cheapest edge that joins two currently disconnected components.
An edge within one component would create a cycle and contributes nothing to connectivity.
A disjoint-set structure efficiently distinguishes these cases.

## Brute force

Try all subsets of V minus one edges, check whether each forms a spanning tree, and keep the cheapest cost.
The number of subsets becomes prohibitive even for moderately sized graphs.

## Approach

Sort edges by weight and initially place every vertex in its own set.
For each edge, call `join` on its endpoints.
The helper finds roots using path halving and attaches the smaller component to the larger one.
If the roots were different, the merge succeeds and the edge weight is added to `total`.
Otherwise skip the edge.
The cut property justifies each accepted edge: a cheapest available edge crossing two current components can belong to some optimal spanning tree.
The connected-input guarantee ensures the accepted edges eventually connect every vertex.

## Walkthrough

Example 1 sorts the edges into weights -1, 2, and 5.
The edge from 1 to 2 joins two singleton components and sets `total` to -1.
The edge from 0 to 1 joins vertex 0 to that component, making the total 1.
The weight-5 edge now has both endpoints in one component and is rejected.
The returned minimum cost is 1.

## Complexity

For E edges and V vertices, sorting costs O(E log E), and union-find operations add O(E alpha(V)) amortized time.
Both references use O(V) union-find storage and up to O(E) sorting storage.
Python also builds a sorted edge list; Java sorts the provided outer edge array.

## Edge cases

Negative weights remain valid and should be processed first.
Equal weights may yield different trees with the same optimal cost.

## Common mistakes

Do not sum every sorted edge, since cycles must be excluded.
The connected-input contract matters: disconnected graphs would otherwise produce a forest cost.

## Language notes

Python integers grow as needed.
Java accumulates into `long` because many signed edge weights can exceed an `int` total.
