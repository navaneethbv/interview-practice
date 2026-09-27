## Intuition

Shared type 3 edges can help both travelers, so they should be considered before exclusive edges.
Two disjoint union-find structures track Alice's and Bob's connected components and let us keep an edge only when it joins new components.

## Brute force

Trying subsets of edges and checking both resulting graphs would require exponential time.
Even repeatedly testing connectivity after removing individual edges performs unnecessary graph work.

## Approach

1. Sort edges by descending type so shared edges are processed first.
2. Union every type 3 edge in both structures, counting it once if either traveler benefits.
3. Union type 1 edges only for Alice and type 2 edges only for Bob.
4. If both travelers used exactly `n - 1` joining edges, return total edges minus kept edges; otherwise return `-1`.

## Walkthrough

For Example 1, the shared edges `[3,1,2]` and `[3,2,3]` connect both travelers to three nodes.
Alice then keeps `[1,2,4]` to reach node 4, while `[1,1,3]` and `[1,1,2]` are redundant for her.
Bob keeps `[2,3,4]` to reach node 4, and the unused type 1 edges cannot help him.
Both structures have three successful unions, which is `n - 1` for `n = 4`.
Four edges are kept from six, so the answer is 2.

## Complexity

Sorting edges costs O(e log e), and union-find operations cost O(e alpha(n)) with path compression and union by size.
The disjoint sets use O(n) space; Python's sorted copy and Java's object-array sorting workspace add O(e) space.

## Edge cases

For `n = 1`, no edge is needed and zero removals is valid.
Parallel endpoints with different types may all be useful to different travelers, while duplicate unions for one traveler are discarded.
If either traveler lacks a spanning connection, the method returns `-1` even when the other graph is connected.

## Common mistakes

Processing exclusive edges before shared edges can consume connections that a shared edge could serve for both travelers.
Do not count a type 3 edge twice in the number of kept input edges.
The final connectivity test must require both union counts to equal `n - 1`.

## Language notes

Python's `bool` values add naturally to the successful-union counts.
Java instead tracks the number of components, reaching one component after n minus one successful unions.
Python sorts a copied edge list, whereas Java sorts the input edge array in place.
Both implementations use iterative path compression, so no recursive union-find stack is needed.
