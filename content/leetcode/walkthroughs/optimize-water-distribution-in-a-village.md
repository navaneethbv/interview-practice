## Intuition

Treat building a well as connecting a house to a virtual water source numbered zero.
A pipe is an ordinary edge between two houses, and a well is an edge from zero to its house.
Supplying everyone becomes a minimum spanning tree problem on this augmented graph.

## Brute force

Trying every subset of wells and pipes considers exponentially many combinations.
Each choice would also require checking whether every house can reach a water source.
Kruskal's algorithm instead selects cheap edges that connect previously separate components.

## Approach

1. Build `edges` containing every pipe and every virtual well edge, stored with cost first.
2. Sort edges by cost.
3. Initialize a disjoint-set structure over the n houses and virtual source zero.
4. For each edge, find its endpoints' current component roots.
5. Skip the edge when both endpoints are already connected; otherwise merge their components and add its cost to `total`.
6. Return total after considering all edges.

Path compression shortens future root searches.
Union by size attaches the smaller component below the larger one.
Every house has a well option, so the augmented graph is always connected.

## Walkthrough

Example 1 has wells `[5,2,5]` and pipes `(1,2,1)` and `(2,3,1)`.

| Edge considered | Cost | Action | total |
| --- | ---: | --- | ---: |
| house 1 to house 2 | 1 | join houses | 1 |
| house 2 to house 3 | 1 | join house 3 | 2 |
| source 0 to house 2 | 2 | supply connected houses | 4 |
| source 0 to house 1 | 5 | skip cycle | 4 |
| source 0 to house 3 | 5 | skip cycle | 4 |

The selected source edge corresponds to building the well at house two.
Both selected pipes share that supply.

## Complexity

Let E be n plus the number of pipes.
Sorting dominates at O(E log(E + 1)) time; disjoint-set operations contribute O(E alpha(n + 1)) amortized time.
Auxiliary space is O(E + n) for copied edges, sorting workspace, and component arrays.

## Edge cases

With no pipes, every house needs its own well.
Zero-cost edges are valid and processed first.
Parallel pipes are separate candidates, but redundant connections are skipped.
A single house uses its well edge.

## Common mistakes

- Choosing only the cheapest well ignores possible separate cheaper supplies.
- Forgetting source zero loses the equivalence between wells and edges.
- Charging for edges within one component introduces unnecessary cycles.

## Language notes

Both versions use iterative path compression and union by size.
Python sorts cost-first tuples; Java sorts edge arrays with an integer comparator.
The total is at most the cost of all wells, at most one billion under these bounds, so Java int is sufficient.
